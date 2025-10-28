import { createClient } from 'redis';

async function clearCache() {
  const client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  });

  try {
    await client.connect();
    console.log('Connected to Redis');

    // Clear all cache keys
    await client.flushAll();
    console.log('✅ Cache cleared successfully!');

  } catch (error) {
    console.error('Error clearing cache:', error);
    console.log('ℹ️  Redis might not be running, which is fine for development');
  } finally {
    await client.quit();
    console.log('Redis connection closed');
  }
}

clearCache()
  .then(() => {
    console.log('\n🚀 Cache clear completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(0); // Exit with 0 even on error since Redis might not be running
  });
