import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem42() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem42 = {
      problem_id: 42,
      session_id: 9,
      title: 'For Loop with range()',
      description: 'Use range(start, stop) to repeat something a specific number of times.',
      difficulty: 'Easy',
      tags: ['loops', 'for-loop', 'range', 'iteration'],
      case_overview: `Case 2: For Loop with range()

Use range(start, stop) to repeat something a specific number of times.`,
      case_explanation: `Explanation:
● range(1, 6) generates numbers from 1 to 5
● Each number is used in the loop to represent a rocket stage

Hints:
● Use a for loop with range(1, 6) to generate numbers 1 through 5
● Syntax: for i in range(1, 6):
● Inside the loop (indented by 4 spaces), print "Rocket Stage" followed by the variable i
● range(start, stop) generates numbers from start up to (but not including) stop
● range(1, 6) produces: 1, 2, 3, 4, 5
● The variable 'i' is commonly used as a loop counter
● The output will have 5 lines, one for each number`,
      case_code: `# Sample Example:
for i in range(1, 6):
    print("Rocket Stage", i)

# Now you try:
# Use a for loop with range(1, 4) to generate numbers 1, 2, 3
# Inside the loop, print "Level" followed by the number`,
      expected_output: 'Level 1\nLevel 2\nLevel 3',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCase42 = {
      problem_id: 42,
      case_number: 1,
      input: '',
      expected_output: 'Level 1\nLevel 2\nLevel 3',
      is_hidden: false,
      created_at: new Date(),
    };

    const result = await problemsCollection.updateOne(
      { problem_id: 42 },
      { $set: problem42 },
      { upsert: true }
    );

    console.log('Problem 42 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 42 });
    const testResult = await testCasesCollection.insertOne(testCase42);
    console.log('Test cases inserted:', testResult.insertedId ? 1 : 0);

    console.log('\n✅ Problem 42 (Session 9, Case 2: For Loop with range()) seeded successfully!');

  } catch (error) {
    console.error('Error seeding problem:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedProblem42()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
