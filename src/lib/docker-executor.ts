import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile, unlink, mkdir, readFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const execAsync = promisify(exec);

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  status: 'Success' | 'Error' | 'Timeout';
  executionTime: number | null;
  plots?: string[];
}

export class DockerPythonExecutor {
  private static readonly CONTAINER_NAME = 'python-code-runner';
  private static readonly TIMEOUT_MS = 10000; // 10 seconds
  private static readonly MEMORY_LIMIT = '128m';
  
  private static async ensureContainerExists(): Promise<void> {
    try {
      // Check if image exists
      await execAsync(`docker inspect ${this.CONTAINER_NAME}`);
    } catch {
      // Image doesn't exist, build it
      console.log('Building Python execution container...');
      await execAsync(`docker build -t ${this.CONTAINER_NAME} .`);
    }
  }

  private static async createTempFiles(code: string, input: string): Promise<{
    codeFile: string;
    inputFile: string;
    sessionId: string;
  }> {
    const sessionId = uuidv4();
    const tempDir = join(process.cwd(), 'temp');
    
    try {
      await mkdir(tempDir, { recursive: true });
    } catch {
      // Directory already exists
    }
    
    const codeFile = join(tempDir, `${sessionId}.py`);
    const inputFile = join(tempDir, `${sessionId}.txt`);
    
    await writeFile(codeFile, code, 'utf8');
    await writeFile(inputFile, input, 'utf8');
    
    return { codeFile, inputFile, sessionId };
  }

  private static async cleanupTempFiles(codeFile: string, inputFile: string): Promise<void> {
    try {
      await unlink(codeFile);
      await unlink(inputFile);
    } catch {
      // Files may not exist or already cleaned up
    }
  }

  private static detectMatplotlibUsage(code: string): boolean {
    return /import\s+matplotlib|from\s+matplotlib|plt\.|pyplot\./i.test(code);
  }

  private static injectPlotSavingCode(code: string): string {
    // Add matplotlib plot capturing logic
    const plotCapture = `
import os
import base64
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')  # Ensure non-interactive backend

# Monkey patch plt.show() to save plots instead
_original_show = plt.show
_plot_counter = 0

def _save_plot(*args, **kwargs):
    global _plot_counter
    plot_path = f"/tmp/plot_{_plot_counter}.png"
    plt.savefig(plot_path, dpi=100, bbox_inches='tight')
    print(f"[PLOT_SAVED:{plot_path}]")
    _plot_counter += 1
    plt.close()  # Close the figure to free memory

plt.show = _save_plot

# At end of execution, encode and output all plots
import atexit
def _output_plots():
    import glob
    plot_files = glob.glob("/tmp/plot_*.png")
    if plot_files:
        print("[PLOT_DATA_START]")
        for plot_file in sorted(plot_files):
            try:
                with open(plot_file, 'rb') as f:
                    plot_data = f.read()
                    b64_data = base64.b64encode(plot_data).decode('utf-8')
                    print(f"[PLOT_B64:{b64_data}]")
            except Exception as e:
                print(f"[PLOT_ERROR:{e}]")
        print("[PLOT_DATA_END]")
    
atexit.register(_output_plots)
`;

    return plotCapture + '\n' + code;
  }

  private static async extractPlotsFromOutput(containerId: string, stdout: string): Promise<string[]> {
    const plots: string[] = [];
    
    try {
      console.log(`Extracting plots from output...`);
      
      // Parse base64 plot data from stdout using the [PLOT_B64:data] markers
      const plotDataMatches = stdout.match(/\[PLOT_B64:([^\]]+)\]/g);
      console.log(`Plot data matches found: ${plotDataMatches?.length || 0}`);
      
      if (plotDataMatches) {
        for (const match of plotDataMatches) {
          try {
            const base64Data = match.match(/\[PLOT_B64:([^\]]+)\]/)?.[1];
            if (base64Data) {
              plots.push(`data:image/png;base64,${base64Data}`);
              console.log(`Successfully extracted plot data (${base64Data.length} chars)`);
            }
          } catch (error) {
            console.warn(`Failed to extract plot data from match:`, error);
          }
        }
      } else {
        console.log('No plot data found in stdout');
      }
    } catch (error) {
      console.warn('Failed to extract plots:', error);
    }
    
    console.log(`Total plots extracted: ${plots.length}`);
    return plots;
  }

  public static async executeCode(code: string, input: string = ''): Promise<ExecutionResult> {
    const startTime = Date.now();
    
    try {
      await this.ensureContainerExists();
      
      // Check if code uses matplotlib and inject plot saving logic
      const hasMatplotlib = this.detectMatplotlibUsage(code);
      const processedCode = hasMatplotlib ? this.injectPlotSavingCode(code) : code;
      
      // Create temp files for reliable execution
      const { codeFile, inputFile, sessionId } = await this.createTempFiles(processedCode, input);
      
      try {
        // Build docker command that allows plot saving when matplotlib is detected
        const tmpfsOptions = hasMatplotlib ? '/tmp:size=10m' : '/tmp:noexec,nosuid,size=10m';
        const dockerCmd = input 
          ? `type "${inputFile}" | docker run --rm --network none --memory ${this.MEMORY_LIMIT} --cpus="0.5" --user 1000:1000 --read-only --tmpfs ${tmpfsOptions} -i -v "${codeFile}:/app/code.py:ro" ${this.CONTAINER_NAME} timeout 20s python /app/code.py`
          : `docker run --rm --network none --memory ${this.MEMORY_LIMIT} --cpus="0.5" --user 1000:1000 --read-only --tmpfs ${tmpfsOptions} -v "${codeFile}:/app/code.py:ro" ${this.CONTAINER_NAME} timeout 20s python /app/code.py`;
        
        let stdout = '';
        let stderr = '';
        let containerId = '';
        let plots: string[] | undefined;
        
        try {
          // For matplotlib code, we need a persistent container to extract plots
          if (hasMatplotlib) {
            // Create a named container that we can extract files from
            const containerName = `python-exec-${sessionId}`;
            const createCmd = input
              ? `type "${inputFile}" | docker run --name ${containerName} --network none --memory ${this.MEMORY_LIMIT} --cpus="0.5" --user 1000:1000 --read-only --tmpfs /tmp:size=10m -i -v "${codeFile}:/app/code.py:ro" ${this.CONTAINER_NAME} timeout 20s python /app/code.py`
              : `docker run --name ${containerName} --network none --memory ${this.MEMORY_LIMIT} --cpus="0.5" --user 1000:1000 --read-only --tmpfs /tmp:size=10m -v "${codeFile}:/app/code.py:ro" ${this.CONTAINER_NAME} timeout 20s python /app/code.py`;
            
            try {
              const result = await Promise.race([
                execAsync(createCmd),
                new Promise<never>((_, reject) => {
                  setTimeout(() => reject(new Error('Execution timeout')), this.TIMEOUT_MS * 2);
                })
              ]);
              stdout = result.stdout;
              stderr = result.stderr;
              containerId = containerName;
            } catch (error: any) {
              stdout = error.stdout || '';
              stderr = error.stderr || '';
              containerId = containerName;
            }
            
            // Extract plots IMMEDIATELY after execution while container still exists
            if (containerId) {
              try {
                plots = await this.extractPlotsFromOutput(containerId, stdout);
              } catch (error) {
                console.warn('Failed to extract plots:', error);
              } finally {
                // Clean up the named container
                await execAsync(`docker rm -f ${containerId}`).catch(() => {});
              }
            }
          } else {
            // Regular execution without plot extraction
            const result = await Promise.race([
              execAsync(dockerCmd),
              new Promise<never>((_, reject) => {
                setTimeout(() => reject(new Error('Execution timeout')), this.TIMEOUT_MS * 2);
              })
            ]);
            stdout = result.stdout;
            stderr = result.stderr;
          }
        } catch (error: any) {
          stdout = error.stdout || '';
          stderr = error.stderr || '';
          
          if (!stderr && error.message && !error.message.includes('timeout')) {
            stderr = error.message;
          }
        }

        const executionTime = Date.now() - startTime;
        
        return {
          stdout: stdout.trim(),
          stderr: stderr.trim(),
          status: stderr.trim() ? 'Error' : 'Success',
          executionTime,
          plots
        };
      } finally {
        // Always cleanup temp files
        await this.cleanupTempFiles(codeFile, inputFile);
      }
      
    } catch (error) {
      const executionTime = Date.now() - startTime;
      
      if (error instanceof Error) {
        if (error.message.includes('timeout') || executionTime >= this.TIMEOUT_MS) {
          return {
            stdout: '',
            stderr: 'Execution timeout: Code took too long to execute',
            status: 'Timeout',
            executionTime
          };
        }
        
        return {
          stdout: '',
          stderr: `Execution error: ${error.message}`,
          status: 'Error',
          executionTime
        };
      }
      
      return {
        stdout: '',
        stderr: 'Unknown execution error',
        status: 'Error',
        executionTime
      };
    }
  }
}