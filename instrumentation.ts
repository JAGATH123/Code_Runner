import { GPUContainerPool } from './src/lib/execution/gpu-container-pool';

export async function register() {
  // Run on server side only
  if (process.env.NEXT_RUNTIME === 'nodejs' || typeof window === 'undefined') {
    // Log to both console and stderr to ensure visibility
    const log = (msg: string) => {
      console.log(msg);
      process.stderr.write(msg + '\n');
    };

    log('🚀 [INSTRUMENTATION] Server starting - Initializing container pool...');

    try {
      // Initialize container pool on server startup
      // This will:
      // 1. Clean up stopped containers from previous runs
      // 2. Reuse existing running containers (up to pool size)
      // 3. Remove excess containers beyond pool size
      // 4. Create fresh pool containers if needed
      await GPUContainerPool.initialize();

      log('✅ [INSTRUMENTATION] Container pool initialized at server startup');
    } catch (error) {
      log(`❌ [INSTRUMENTATION] Failed to initialize container pool at startup: ${error}`);
    }

    // Register graceful shutdown handlers
    const shutdownHandler = async (signal: string) => {
      console.log(`\n${signal} received - Shutting down container pool gracefully...`);
      try {
        await GPUContainerPool.shutdown();
        console.log('✅ Container pool shutdown complete');
        process.exit(0);
      } catch (error) {
        console.error('❌ Error during container pool shutdown:', error);
        process.exit(1);
      }
    };

    process.on('SIGINT', () => shutdownHandler('SIGINT'));
    process.on('SIGTERM', () => shutdownHandler('SIGTERM'));

    // For Windows Ctrl+C
    if (process.platform === 'win32') {
      const readline = require('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      rl.on('SIGINT', () => {
        process.emit('SIGINT', 'SIGINT');
      });
    }
  }
}
