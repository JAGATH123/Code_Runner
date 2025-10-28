import { exec } from 'child_process';
import { promisify } from 'util';
import { parsePythonError, formatErrorForDisplay } from './python-error-parser';

const execAsync = promisify(exec);

interface PoolContainer {
  id: string;
  busy: boolean;
  lastUsed: number;
  type: 'cpu' | 'gpu';
}

interface ExecutionResult {
  stdout: string;
  stderr: string;
  status: 'Success' | 'Error' | 'Timeout';
  executionTime: number;
  plots?: string[];
  usedGPU?: boolean;
}

export class GPUContainerPool {
  private static cpuContainers: Map<string, PoolContainer> = new Map();
  private static gpuContainers: Map<string, PoolContainer> = new Map();

  private static readonly CPU_POOL_SIZE = 10;
  private static readonly GPU_POOL_SIZE = 3; // Limit GPU containers to prevent VRAM exhaustion
  private static readonly IDLE_TIMEOUT = 300000; // 5 minutes
  private static readonly EXECUTION_TIMEOUT = 30000; // 30 seconds (longer for GPU)
  private static readonly CPU_IMAGE_NAME = 'python-code-runner';
  private static readonly GPU_IMAGE_NAME = 'python-code-runner-gpu';

  private static initialized = false;
  private static initializing = false;
  private static gpuAvailable = false;

  static async initialize(): Promise<void> {
    if (this.initialized) return;
    if (this.initializing) {
      while (this.initializing && !this.initialized) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      return;
    }

    this.initializing = true;
    console.log('Initializing GPU-aware container pool...');

    // Check GPU availability
    this.gpuAvailable = await this.checkGPUAvailability();
    console.log(`GPU available: ${this.gpuAvailable}`);

    // Build CPU image
    await this.ensureImageExists(this.CPU_IMAGE_NAME, 'Dockerfile');

    // Build GPU image if GPU is available
    if (this.gpuAvailable) {
      await this.ensureImageExists(this.GPU_IMAGE_NAME, 'Dockerfile.gpu');
    }

    // Create CPU container pool
    for (let i = 0; i < this.CPU_POOL_SIZE; i++) {
      try {
        await this.createPoolContainer('cpu');
      } catch (error) {
        console.warn(`Failed to create CPU container ${i}:`, error);
      }
    }

    // Create GPU container pool (smaller, on-demand)
    if (this.gpuAvailable) {
      for (let i = 0; i < this.GPU_POOL_SIZE; i++) {
        try {
          await this.createPoolContainer('gpu');
        } catch (error) {
          console.warn(`Failed to create GPU container ${i}:`, error);
        }
      }
    }

    // Start cleanup task
    setInterval(() => this.cleanupIdleContainers(), 60000);

    this.initialized = true;
    this.initializing = false;
    console.log(`Pool initialized - CPU: ${this.cpuContainers.size}, GPU: ${this.gpuContainers.size}`);
  }

  static async executeCode(code: string, input: string = ''): Promise<ExecutionResult> {
    const startTime = Date.now();

    try {
      if (!this.initialized) {
        await this.initialize();
      }

      // Detect if code requires GPU
      const requiresGPU = this.detectGPUUsage(code);
      const useGPU = requiresGPU && this.gpuAvailable;

      console.log(`Execution request - GPU required: ${requiresGPU}, GPU available: ${this.gpuAvailable}, Using GPU: ${useGPU}`);

      // Get appropriate container
      const container = await this.getAvailableContainer(useGPU ? 'gpu' : 'cpu');

      try {
        // Execute code in container
        const result = await this.runCodeInContainer(container.id, code, input, useGPU);

        const executionTime = Date.now() - startTime;
        return {
          ...result,
          executionTime,
          usedGPU: useGPU
        };
      } finally {
        // Return container to pool
        this.returnContainer(container.id, container.type);
      }
    } catch (error) {
      console.error('Container execution error:', error);
      const executionTime = Date.now() - startTime;

      return {
        stdout: '',
        stderr: `Container execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        status: 'Error',
        executionTime,
        usedGPU: false
      };
    }
  }

  private static async checkGPUAvailability(): Promise<boolean> {
    try {
      const { stdout } = await execAsync('nvidia-smi --query-gpu=name --format=csv,noheader');
      console.log('GPU detected:', stdout.trim());
      return true;
    } catch {
      console.log('No GPU detected or NVIDIA drivers not installed');
      return false;
    }
  }

  private static detectGPUUsage(code: string): boolean {
    // Detect GPU-related libraries and operations
    const gpuPatterns = [
      /import\s+torch/i,
      /from\s+torch/i,
      /torch\.(cuda|device|tensor)/i,
      /\.to\(['"]cuda['"]\)/i,
      /\.cuda\(\)/i,
      /import\s+tensorflow/i,
      /from\s+tensorflow/i,
      /tf\.device\(['"]GPU/i,
      /import\s+cupy/i,
      /from\s+cupy/i,
      /cp\./i,
      /@cuda\.jit/i,
      /from\s+numba\s+import\s+cuda/i,
    ];

    return gpuPatterns.some(pattern => pattern.test(code));
  }

  private static async getAvailableContainer(type: 'cpu' | 'gpu'): Promise<PoolContainer> {
    const pool = type === 'gpu' ? this.gpuContainers : this.cpuContainers;

    // Find free container
    for (const [id, container] of pool) {
      if (!container.busy) {
        container.busy = true;
        container.lastUsed = Date.now();
        return container;
      }
    }

    // No free containers - create temporary one
    console.log(`${type.toUpperCase()} pool exhausted, creating temporary container`);
    const newContainer = await this.createPoolContainer(type, true);
    return newContainer;
  }

  private static async createPoolContainer(type: 'cpu' | 'gpu', temporary = false): Promise<PoolContainer> {
    try {
      const containerName = `pool-${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const imageName = type === 'gpu' ? this.GPU_IMAGE_NAME : this.CPU_IMAGE_NAME;

      let dockerCmd = `docker run -d --name ${containerName} --network none `;

      if (type === 'gpu') {
        // GPU container with more resources
        dockerCmd += `--gpus all --memory 4g --cpus="2.0" `;
        dockerCmd += `--read-only --tmpfs /tmp:size=100m `;
        dockerCmd += `--user 1000:1000 `;
        dockerCmd += `-e NVIDIA_VISIBLE_DEVICES=all `;
        dockerCmd += `-e NVIDIA_DRIVER_CAPABILITIES=compute,utility `;
      } else {
        // CPU container with limited resources
        dockerCmd += `--memory 128m --cpus="0.5" `;
        dockerCmd += `--read-only --tmpfs /tmp:size=50m `;
        dockerCmd += `--user 1000:1000 `;
      }

      dockerCmd += imageName;

      const { stdout } = await execAsync(dockerCmd);
      const containerId = stdout.trim();

      const container: PoolContainer = {
        id: containerId,
        busy: temporary,
        lastUsed: Date.now(),
        type
      };

      if (!temporary) {
        if (type === 'gpu') {
          this.gpuContainers.set(containerId, container);
        } else {
          this.cpuContainers.set(containerId, container);
        }
      }

      console.log(`Created ${type.toUpperCase()} container: ${containerId.substring(0, 12)}`);
      return container;
    } catch (error) {
      console.error(`Failed to create ${type} container:`, error);
      throw new Error(`Container creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private static async runCodeInContainer(
    containerId: string,
    code: string,
    input: string,
    isGPU: boolean
  ): Promise<Omit<ExecutionResult, 'executionTime' | 'usedGPU'>> {
    const sessionId = `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    try {
      // Detect matplotlib usage and inject plot saving code if needed
      const hasMatplotlib = this.detectMatplotlibUsage(code);
      let processedCode = hasMatplotlib ? this.injectPlotSavingCode(code) : code;

      // Detect pygame usage and inject headless wrapper
      const hasPygame = this.detectPygameUsage(code);
      if (hasPygame) {
        processedCode = this.injectPygameWrapper(processedCode);
      }

      // Inject GPU verification code if using GPU
      if (isGPU) {
        processedCode = this.injectGPUVerificationCode(processedCode);
      }

      // Create code file in container using base64 encoding
      const codeBase64 = Buffer.from(processedCode, 'utf8').toString('base64');
      const codeCommand = `echo '${codeBase64}' | base64 -d > /tmp/${sessionId}.py`;
      await execAsync(`docker exec ${containerId} sh -c "${codeCommand}"`);

      // Create input file if needed
      if (input) {
        const inputBase64 = Buffer.from(input, 'utf8').toString('base64');
        const inputCommand = `echo '${inputBase64}' | base64 -d > /tmp/${sessionId}.txt`;
        await execAsync(`docker exec ${containerId} sh -c "${inputCommand}"`);
      }

      // Execute Python code with timeout
      const timeout = isGPU ? this.EXECUTION_TIMEOUT : 10000; // Longer timeout for GPU
      const execCommand = input
        ? `docker exec ${containerId} sh -c "cd /tmp && cat ${sessionId}.txt | timeout ${timeout / 1000}s python ${sessionId}.py"`
        : `docker exec ${containerId} sh -c "cd /tmp && timeout ${timeout / 1000}s python ${sessionId}.py"`;

      let stdout = '';
      let stderr = '';

      try {
        const result = await Promise.race([
          execAsync(execCommand),
          new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error('Execution timeout')), timeout);
          })
        ]);

        stdout = result.stdout || '';
        stderr = result.stderr || '';
      } catch (error: any) {
        stdout = error.stdout || '';
        stderr = error.stderr || '';

        // Only treat as timeout if we explicitly threw the timeout error (not just stderr from Python)
        // Check if error is from our Promise.race timeout, not from the command containing word "timeout"
        if (error.message === 'Execution timeout' && !stderr) {
          stderr = `Code execution timed out (${timeout / 1000} seconds limit)`;
        }
      }

      // Extract plots if matplotlib was used
      let plots: string[] | undefined;
      if (hasMatplotlib && stdout) {
        plots = this.extractPlotsFromOutput(stdout);
        stdout = stdout.replace(/\[PLOT_B64:[^\]]+\]/g, '').replace(/\[PLOT_DATA_START\][\s\S]*?\[PLOT_DATA_END\]/g, '');
      }

      // Extract pygame frames if pygame was used
      if (hasPygame && stdout) {
        const pygameFrames = this.extractPygameFrames(stdout);
        if (pygameFrames.length > 0) {
          plots = plots ? [...plots, ...pygameFrames] : pygameFrames;
        }
        // Clean up pygame frame markers from stdout
        stdout = stdout.replace(/\[PYGAME_FRAME:\d+\]data:image\/png;base64,[^\[]+\[\/PYGAME_FRAME\]/g, '');
      }

      // Cleanup files
      await execAsync(`docker exec ${containerId} rm -f /tmp/${sessionId}.*`).catch(() => {});

      // Parse and format Python errors for better user experience
      let formattedStderr = stderr.trim();
      if (formattedStderr) {
        const parsedError = parsePythonError(formattedStderr);
        if (parsedError) {
          formattedStderr = formatErrorForDisplay(parsedError);
        }
      }

      return {
        stdout: stdout.trim(),
        stderr: formattedStderr,
        status: formattedStderr ? 'Error' : 'Success',
        plots
      };

    } catch (error) {
      console.error('Code execution error:', error);
      await execAsync(`docker exec ${containerId} rm -f /tmp/${sessionId}.*`).catch(() => {});

      const errorMessage = `Execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
      const parsedError = parsePythonError(errorMessage);

      return {
        stdout: '',
        stderr: parsedError ? formatErrorForDisplay(parsedError) : errorMessage,
        status: 'Error'
      };
    }
  }

  private static detectMatplotlibUsage(code: string): boolean {
    return /import\s+matplotlib|from\s+matplotlib|plt\.|pyplot\./i.test(code);
  }

  private static detectPygameUsage(code: string): boolean {
    return /import\s+pygame|from\s+pygame/i.test(code);
  }

  private static injectPygameWrapper(code: string): string {
    const pygameWrapper = `
# Pygame headless wrapper for Code Runner
import pygame
import sys
import os
import time

_HEADLESS_MODE = os.environ.get('SDL_VIDEODRIVER') == 'dummy'
_MAX_FRAMES = 120  # Maximum frames to render in headless mode
_FRAME_COUNT = 0
_START_TIME = time.time()
_MAX_TIME = 8  # Maximum execution time in seconds

# Ensure plots directory exists with proper permissions
_PLOTS_DIR = "/tmp/plots"
if not os.path.exists(_PLOTS_DIR):
    try:
        os.makedirs(_PLOTS_DIR, mode=0o777, exist_ok=True)
        print(f"[Pygame Headless Mode] Created directory: {_PLOTS_DIR}")
    except Exception as e:
        print(f"[Pygame Headless Mode] Warning: Could not create plots directory: {e}")

if _HEADLESS_MODE:
    print("[Pygame Headless Mode] Running pygame code in headless environment")
    print("[Pygame Headless Mode] Will auto-exit after {} frames or {} seconds".format(_MAX_FRAMES, _MAX_TIME))

# Monkey-patch pygame.display.flip and update to track frames
_original_flip = pygame.display.flip
_original_update = pygame.display.update

def _headless_flip():
    global _FRAME_COUNT
    result = _original_flip()

    if _HEADLESS_MODE:
        _FRAME_COUNT += 1

        # Save screenshot at specific intervals
        if _FRAME_COUNT in [1, 30, 60, 90, 120]:
            try:
                screen = pygame.display.get_surface()
                if screen:
                    # Ensure directory exists
                    os.makedirs(_PLOTS_DIR, mode=0o777, exist_ok=True)
                    filename = f"{_PLOTS_DIR}/pygame_frame_{_FRAME_COUNT:04d}.png"
                    pygame.image.save(screen, filename)
                    # Output image path for extraction (similar to matplotlib)
                    import base64
                    with open(filename, 'rb') as f:
                        img_data = base64.b64encode(f.read()).decode('utf-8')
                        print(f"[PYGAME_FRAME:{_FRAME_COUNT}]data:image/png;base64,{img_data}[/PYGAME_FRAME]")
                    print(f"[Pygame Headless Mode] Saved frame {_FRAME_COUNT}")
            except Exception as e:
                print(f"[Pygame Headless Mode] Error saving frame: {e}")

        # Auto-exit conditions
        elapsed_time = time.time() - _START_TIME
        if _FRAME_COUNT >= _MAX_FRAMES or elapsed_time >= _MAX_TIME:
            print(f"[Pygame Headless Mode] Rendered {_FRAME_COUNT} frames in {elapsed_time:.2f}s")
            print("[Pygame Headless Mode] Auto-exiting to prevent timeout")
            pygame.quit()
            sys.exit(0)

    return result

def _headless_update(*args, **kwargs):
    _headless_flip()
    return _original_update(*args, **kwargs)

# Apply monkey patches
pygame.display.flip = _headless_flip
pygame.display.update = _headless_update

# User code starts here
`;
    return pygameWrapper + '\n' + code;
  }

  private static injectPlotSavingCode(code: string): string {
    const plotCapture = `
import os
import base64
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')

_original_show = plt.show
_plot_counter = 0

def _save_plot(*args, **kwargs):
    global _plot_counter
    plot_path = f"/tmp/plot_{_plot_counter}.png"
    plt.savefig(plot_path, dpi=100, bbox_inches='tight')

    try:
        with open(plot_path, 'rb') as f:
            plot_data = f.read()
            b64_data = base64.b64encode(plot_data).decode('utf-8')
            print(f"[PLOT_B64:{b64_data}]")
    except Exception as e:
        print(f"[PLOT_ERROR:{e}]")

    _plot_counter += 1
    plt.close()

plt.show = _save_plot
`;
    return plotCapture + '\n' + code;
  }

  private static injectGPUVerificationCode(code: string): string {
    const gpuVerification = `
# GPU Verification Code
import sys
try:
    if 'torch' in sys.modules or 'import torch' in '''${code.replace(/'/g, "\\'")}''':
        import torch
        if torch.cuda.is_available():
            print(f"[GPU_INFO: Using {torch.cuda.get_device_name(0)}]")
            print(f"[GPU_MEMORY: {torch.cuda.get_device_properties(0).total_memory / 1024**3:.2f} GB]")
        else:
            print("[GPU_WARNING: CUDA not available, using CPU]")

    if 'tensorflow' in sys.modules or 'import tensorflow' in '''${code.replace(/'/g, "\\'")}''':
        import tensorflow as tf
        gpus = tf.config.list_physical_devices('GPU')
        if gpus:
            print(f"[GPU_INFO: TensorFlow using {len(gpus)} GPU(s)]")
        else:
            print("[GPU_WARNING: TensorFlow using CPU]")
except Exception as e:
    pass  # Silent fail for GPU verification
`;
    return gpuVerification + '\n' + code;
  }

  private static extractPlotsFromOutput(stdout: string): string[] {
    const plots: string[] = [];
    const plotMatches = stdout.match(/\[PLOT_B64:([^\]]+)\]/g);

    if (plotMatches) {
      for (const match of plotMatches) {
        const base64Data = match.match(/\[PLOT_B64:([^\]]+)\]/)?.[1];
        if (base64Data) {
          plots.push(`data:image/png;base64,${base64Data}`);
        }
      }
    }

    return plots;
  }

  private static extractPygameFrames(stdout: string): string[] {
    const frames: string[] = [];
    // Match pygame frame markers: [PYGAME_FRAME:1]data:image/png;base64,...[/PYGAME_FRAME]
    const frameMatches = stdout.match(/\[PYGAME_FRAME:\d+\](data:image\/png;base64,[^\[]+)\[\/PYGAME_FRAME\]/g);

    if (frameMatches) {
      for (const match of frameMatches) {
        const frameData = match.match(/\[PYGAME_FRAME:\d+\](data:image\/png;base64,[^\[]+)\[\/PYGAME_FRAME\]/)?.[1];
        if (frameData) {
          frames.push(frameData);
        }
      }
    }

    return frames;
  }

  private static returnContainer(containerId: string, type: 'cpu' | 'gpu'): void {
    const pool = type === 'gpu' ? this.gpuContainers : this.cpuContainers;
    const container = pool.get(containerId);
    if (container) {
      container.busy = false;
      container.lastUsed = Date.now();
    }
  }

  private static async cleanupIdleContainers(): Promise<void> {
    const now = Date.now();

    await this.cleanupPool(this.cpuContainers, 'CPU', this.CPU_POOL_SIZE);
    await this.cleanupPool(this.gpuContainers, 'GPU', this.GPU_POOL_SIZE);
  }

  private static async cleanupPool(
    pool: Map<string, PoolContainer>,
    poolName: string,
    minSize: number
  ): Promise<void> {
    const now = Date.now();
    const containersToRemove: string[] = [];

    for (const [id, container] of pool) {
      if (!container.busy && (now - container.lastUsed) > this.IDLE_TIMEOUT) {
        containersToRemove.push(id);
      }
    }

    for (const id of containersToRemove) {
      try {
        await execAsync(`docker stop ${id}`);
        await execAsync(`docker rm ${id}`);
        pool.delete(id);
        console.log(`Cleaned up idle ${poolName} container: ${id.substring(0, 12)}`);
      } catch (error) {
        console.error(`Failed to cleanup ${poolName} container ${id}:`, error);
        pool.delete(id);
      }
    }

    // Ensure minimum pool size
    const currentSize = pool.size;
    const neededContainers = Math.max(0, minSize - currentSize);
    const type = poolName === 'GPU' ? 'gpu' : 'cpu';

    for (let i = 0; i < neededContainers; i++) {
      try {
        await this.createPoolContainer(type);
      } catch (error) {
        console.warn(`Failed to create replacement ${poolName} container:`, error);
      }
    }
  }

  private static async ensureImageExists(imageName: string, dockerfile: string): Promise<void> {
    try {
      await execAsync(`docker inspect ${imageName}`);
      console.log(`Docker image ${imageName} exists`);
    } catch {
      console.log(`Building Docker image ${imageName}...`);
      await execAsync(`docker build -t ${imageName} -f ${dockerfile} .`);
      console.log(`Docker image ${imageName} built successfully`);
    }
  }

  static getPoolStats(): {
    cpu: { total: number; busy: number; idle: number };
    gpu: { total: number; busy: number; idle: number };
    gpuAvailable: boolean;
  } {
    const getCounts = (pool: Map<string, PoolContainer>) => {
      let busy = 0, idle = 0;
      for (const container of pool.values()) {
        if (container.busy) busy++;
        else idle++;
      }
      return { total: pool.size, busy, idle };
    };

    return {
      cpu: getCounts(this.cpuContainers),
      gpu: getCounts(this.gpuContainers),
      gpuAvailable: this.gpuAvailable
    };
  }
}
