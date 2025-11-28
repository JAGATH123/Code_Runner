# Container Pool Improvements

## Current Issues
1. ❌ 380 stopped containers accumulating over time
2. ❌ Temporary containers not deleted after use
3. ❌ System waits when pool is exhausted instead of creating temporary
4. ❌ No cleanup on server shutdown
5. ❌ No cleanup on server startup

## Proposed Solution

### Changes to gpu-container-pool.ts

#### 1. Add `temporary` flag to PoolContainer interface
```typescript
interface PoolContainer {
  id: string;
  busy: boolean;
  lastUsed: number;
  type: 'cpu' | 'gpu';
  temporary: boolean;  // NEW: Track if this is a temporary container
}
```

#### 2. Modify `getAvailableContainer()` - Don't wait, create temporary immediately
```typescript
private static async getAvailableContainer(type: 'cpu' | 'gpu'): Promise<PoolContainer> {
  const pool = type === 'gpu' ? this.gpuContainers : this.cpuContainers;
  const poolSize = type === 'gpu' ? this.GPU_POOL_SIZE : this.CPU_POOL_SIZE;

  // PRIORITY 1: Find free container from the main pool (20 CPU or 5 GPU)
  for (const [id, container] of pool) {
    if (!container.busy && !container.temporary) {
      // Verify container still exists
      try {
        await execAsync(`docker inspect ${id}`);
        container.busy = true;
        container.lastUsed = Date.now();
        console.log(`Using idle ${type.toUpperCase()} pool container: ${id.substring(0, 12)}`);
        return container;
      } catch (error) {
        console.warn(`Container ${id.substring(0, 12)} no longer exists, removing from pool`);
        pool.delete(id);
        continue;
      }
    }
  }

  // PRIORITY 2: All pool containers busy - create temporary one immediately
  console.log(`All ${type.toUpperCase()} pool containers busy, creating temporary container`);
  const newContainer = await this.createPoolContainer(type, true);
  return newContainer;
}
```

#### 3. Modify `returnContainer()` - Delete temporary containers immediately
```typescript
private static async returnContainer(containerId: string, type: 'cpu' | 'gpu'): Promise<void> {
  const pool = type === 'gpu' ? this.gpuContainers : this.cpuContainers;
  const container = pool.get(containerId);

  if (container) {
    if (container.temporary) {
      // Delete temporary container immediately after use
      console.log(`Deleting temporary ${type.toUpperCase()} container: ${containerId.substring(0, 12)}`);
      try {
        await execAsync(`docker stop -t 2 ${containerId}`);
        await execAsync(`docker rm -f ${containerId}`);
        pool.delete(containerId);
        console.log(`✅ Temporary container deleted`);
      } catch (error) {
        console.error(`Failed to delete temporary container:`, error);
        pool.delete(containerId); // Remove from tracking anyway
      }
    } else {
      // Return pool container to available state
      container.busy = false;
      container.lastUsed = Date.now();
      console.log(`Returned ${type.toUpperCase()} pool container to idle state: ${containerId.substring(0, 12)}`);
    }
  }
}
```

#### 4. Modify `createPoolContainer()` - Set temporary flag
```typescript
private static async createPoolContainer(type: 'cpu' | 'gpu', temporary = false): Promise<PoolContainer> {
  try {
    const containerName = `pool-${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const imageName = type === 'gpu' ? this.GPU_IMAGE_NAME : this.CPU_IMAGE_NAME;

    let dockerCmd = `docker run -d --name ${containerName} --network none `;

    if (type === 'gpu') {
      dockerCmd += `--gpus all --memory 4g --cpus="2.0" `;
      dockerCmd += `--read-only --tmpfs /tmp:size=100m `;
      dockerCmd += `--user 1000:1000 `;
      dockerCmd += `-e NVIDIA_VISIBLE_DEVICES=all `;
      dockerCmd += `-e NVIDIA_DRIVER_CAPABILITIES=compute,utility `;
    } else {
      dockerCmd += `--memory 128m --cpus="0.5" `;
      dockerCmd += `--read-only --tmpfs /tmp:size=50m `;
      dockerCmd += `--user 1000:1000 `;
    }

    dockerCmd += imageName;

    const { stdout } = await execAsync(dockerCmd);
    const containerId = stdout.trim();

    const container: PoolContainer = {
      id: containerId,
      busy: true,  // Always start as busy
      lastUsed: Date.now(),
      type,
      temporary  // NEW: Mark if temporary
    };

    // Add to pool tracking (even temporary ones, for cleanup)
    if (type === 'gpu') {
      this.gpuContainers.set(containerId, container);
    } else {
      this.cpuContainers.set(containerId, container);
    }

    console.log(`Created ${temporary ? 'TEMPORARY' : 'pool'} ${type.toUpperCase()} container: ${containerId.substring(0, 12)}`);
    return container;
  } catch (error) {
    console.error(`Failed to create ${type} container:`, error);
    throw new Error(`Container creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
```

#### 5. Add `cleanupAllContainersOnStartup()` - Remove stopped containers before initialization
```typescript
private static async cleanupAllContainersOnStartup(): Promise<void> {
  try {
    console.log('Cleaning up stopped pool containers from previous runs...');

    // Find all stopped pool containers (both CPU and GPU)
    const { stdout: stoppedStdout } = await execAsync('docker ps -aq --filter "name=pool-" --filter "status=exited"');
    const stoppedIds = stoppedStdout.trim().split('\n').filter(id => id.length > 0);

    if (stoppedIds.length > 0) {
      console.log(`Found ${stoppedIds.length} stopped containers, removing...`);
      for (const id of stoppedIds) {
        await execAsync(`docker rm -f ${id}`).catch(() => {});
      }
      console.log(`✅ Cleaned up ${stoppedIds.length} stopped containers`);
    } else {
      console.log('No stopped containers found');
    }
  } catch (error) {
    console.warn('Error during startup cleanup:', error);
  }
}
```

#### 6. Add `shutdown()` - Graceful cleanup on server stop
```typescript
static async shutdown(): Promise<void> {
  console.log('Shutting down container pool...');

  try {
    // Get all container IDs
    const allContainerIds = [
      ...Array.from(this.cpuContainers.keys()),
      ...Array.from(this.gpuContainers.keys())
    ];

    console.log(`Stopping and removing ${allContainerIds.length} containers...`);

    // Stop and remove all containers
    for (const id of allContainerIds) {
      try {
        await execAsync(`docker stop -t 2 ${id}`);
        await execAsync(`docker rm -f ${id}`);
      } catch (error) {
        // Ignore errors, container might already be stopped
        await execAsync(`docker rm -f ${id}`).catch(() => {});
      }
    }

    // Clear pools
    this.cpuContainers.clear();
    this.gpuContainers.clear();

    console.log('✅ Container pool shutdown complete');
  } catch (error) {
    console.error('Error during container pool shutdown:', error);
  }
}
```

#### 7. Update `initialize()` - Call startup cleanup first
```typescript
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

  // NEW: Cleanup stopped containers from previous runs FIRST
  await this.cleanupAllContainersOnStartup();

  // Check GPU availability
  this.gpuAvailable = await this.checkGPUAvailability();
  console.log(`GPU available: ${this.gpuAvailable}`);

  // Build images...
  // Rest of initialization code...
}
```

#### 8. Update `executeCode()` - Make returnContainer async
```typescript
static async executeCode(code: string, input: string = ''): Promise<ExecutionResult> {
  const startTime = Date.now();

  try {
    if (!this.initialized) {
      await this.initialize();
    }

    const requiresGPU = this.detectGPUUsage(code);
    const useGPU = requiresGPU && this.gpuAvailable;

    const container = await this.getAvailableContainer(useGPU ? 'gpu' : 'cpu');

    try {
      const result = await this.runCodeInContainer(container.id, code, input, useGPU);

      const executionTime = Date.now() - startTime;
      return {
        ...result,
        executionTime,
        usedGPU: useGPU
      };
    } finally {
      // NEW: await the async returnContainer
      await this.returnContainer(container.id, container.type);
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
```

### Register Shutdown Handler (Add to your server entry point)

In your main server file (e.g., `src/app/api/...` or wherever you initialize the server):

```typescript
import { GPUContainerPool } from '@/lib/execution/gpu-container-pool';

// Register graceful shutdown handlers
process.on('SIGINT', async () => {
  console.log('\nReceived SIGINT, shutting down gracefully...');
  await GPUContainerPool.shutdown();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\nReceived SIGTERM, shutting down gracefully...');
  await GPUContainerPool.shutdown();
  process.exit(0);
});

// For Windows Ctrl+C
if (process.platform === 'win32') {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  readline.on('SIGINT', async () => {
    console.log('\nReceived Ctrl+C, shutting down gracefully...');
    await GPUContainerPool.shutdown();
    process.exit(0);
  });
}
```

## Summary of Changes

✅ **Temporary containers are deleted immediately** after execution
✅ **Always prioritizes the 20 idle pool containers** first
✅ **Creates temporary container immediately** if all pool containers busy (no waiting)
✅ **Startup cleanup** removes all stopped containers before creating pool
✅ **Graceful shutdown** removes all containers when server stops
✅ **No container accumulation** - clean state every time

## Expected Behavior After Changes

1. **Server Start**: Cleans up old stopped containers → Creates fresh pool of 20 CPU + 5 GPU
2. **Normal Load**: All executions use the 20 idle containers
3. **High Load**: When all 20 busy, creates temporary containers immediately
4. **After Execution**:
   - Pool container: Returns to idle state
   - Temporary container: Deleted immediately
5. **Server Stop**: All containers cleaned up automatically

## How to Apply Changes

Would you like me to apply these changes to your `gpu-container-pool.ts` file?
