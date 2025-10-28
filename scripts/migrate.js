// Migration script to run from command line
// Usage: node scripts/migrate.js

const { migrateDataToMongoDB } = require('../src/lib/migrate-data');

console.log('Starting migration...');

migrateDataToMongoDB()
  .then(() => {
    console.log('✅ Migration completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  });