import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem46() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem46 = {
      problem_id: 46,
      session_id: 10,
      title: 'Basic Range Loop',
      description: 'Use range() to generate a sequence of numbers for iteration.',
      difficulty: 'Easy',
      tags: ['range', 'for-loop', 'loops', 'basics'],
      case_overview: `Case 1: Basic Range Loop

Use range() to generate a sequence of numbers for iteration.`,
      case_explanation: `Hints:
● Use a for loop with range(5) to iterate 5 times
● range(5) generates numbers from 0 to 4 (0, 1, 2, 3, 4)
● Inside the loop, print "Mission Check" followed by the current number (i)
● Syntax: for i in range(5):
● The variable i will take values 0, 1, 2, 3, 4 in each iteration
● Indentation: 4 spaces for the loop body
● range(n) always starts from 0 and goes up to (but not including) n
● The output will have 5 lines, one for each number from 0 to 4`,
      case_code: `# Sample Example:
for i in range(5):
    print("Mission Check", i)

# Now you try:
# Use a for loop with range(4) to iterate 4 times
# Inside the loop, print "Step" followed by the number`,
      expected_output: 'Step 0\nStep 1\nStep 2\nStep 3',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCase46 = {
      problem_id: 46,
      case_number: 1,
      input: '',
      expected_output: 'Step 0\nStep 1\nStep 2\nStep 3',
      is_hidden: false,
      created_at: new Date(),
    };

    const result = await problemsCollection.updateOne(
      { problem_id: 46 },
      { $set: problem46 },
      { upsert: true }
    );

    console.log('Problem 46 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 46 });
    const testResult = await testCasesCollection.insertOne(testCase46);
    console.log('Test cases inserted:', testResult.insertedId ? 1 : 0);

    console.log('\n✅ Problem 46 (Session 10, Case 1: Basic Range Loop) seeded successfully!');

  } catch (error) {
    console.error('Error seeding problem:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedProblem46()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
