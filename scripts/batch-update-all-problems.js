// Master Batch Update Script for All Problems with Hidden Test Cases
// This script will update Problems 21-47 with secure test case structures

const { execSync } = require('child_process');

const problems = [
  21, 22, 23, 24, 25, // Session 5
  26, 27, 28, 29, 30, // Session 6
  31, 32, 33, 34, 35, // Session 7
  36, 37, 38, 39, 40, // Session 8
  41, 42, 43, 44, 45, // Session 9
  46, 47              // Session 10
];

console.log('🚀 Starting batch update for all problems...\n');
console.log(`📊 Total problems to update: ${problems.length}\n`);

let successCount = 0;
let failCount = 0;

for (const problemId of problems) {
  try {
    console.log(`⏳ Seeding Problem ${problemId}...`);
    execSync(`npm run seed:problem${problemId}`, {
      stdio: 'inherit',
      cwd: 'd:\\LOF\\PROJECTS\\LOF\\Code_Runner-main'
    });
    successCount++;
    console.log(`✅ Problem ${problemId} completed\n`);
  } catch (error) {
    failCount++;
    console.error(`❌ Problem ${problemId} failed\n`);
  }
}

console.log('\n' + '='.repeat(50));
console.log('📈 Batch Update Summary:');
console.log(`✅ Successful: ${successCount}`);
console.log(`❌ Failed: ${failCount}`);
console.log(`📊 Total: ${problems.length}`);
console.log('='.repeat(50));
