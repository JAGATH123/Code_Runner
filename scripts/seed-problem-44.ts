import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem44() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem44 = {
      problem_id: 44,
      session_id: 9,
      title: 'Nested For Loop',
      description: 'A loop inside another loop is called a nested loop.',
      difficulty: 'Medium',
      tags: ['loops', 'for-loop', 'nested-loops', 'iteration'],
      case_overview: `Case 4: Nested For Loop

A loop inside another loop is called a nested loop.`,
      case_explanation: `Explanation:
● Outer loop runs over letters
● Inner loop runs over numbers for each letter

Hints:
● Create an outer for loop that iterates over a list ["A", "B"]
● Inside the outer loop, create an inner for loop that iterates over [1, 2]
● Inside the inner loop, print the outer variable followed by the inner variable
● Nested loops mean one loop runs completely for each iteration of the outer loop
● For each letter (A, B), all numbers (1, 2) will be printed
● Indentation: 4 spaces for outer loop body, 8 spaces for inner loop body
● The output will show all combinations: A 1, A 2, B 1, B 2`,
      case_code: `# Sample Example:
for x in ["A", "B"]:
    for y in [1, 2]:
        print(x, y)

# Now you try:
# Use nested loops to print coordinates like (x, y) for x in 1-2 and y in 1-3
# Outer loop: for x in range(1, 3) - this gives 1, 2
# Inner loop: for y in range(1, 4) - this gives 1, 2, 3
# Print in format: (x, y) using print(f"({x}, {y})")`,
      expected_output: '(1, 1)\n(1, 2)\n(1, 3)\n(2, 1)\n(2, 2)\n(2, 3)',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCase44 = {
      problem_id: 44,
      case_number: 1,
      input: '',
      expected_output: '(1, 1)\n(1, 2)\n(1, 3)\n(2, 1)\n(2, 2)\n(2, 3)',
      is_hidden: false,
      created_at: new Date(),
    };

    const result = await problemsCollection.updateOne(
      { problem_id: 44 },
      { $set: problem44 },
      { upsert: true }
    );

    console.log('Problem 44 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 44 });
    const testResult = await testCasesCollection.insertOne(testCase44);
    console.log('Test cases inserted:', testResult.insertedId ? 1 : 0);

    console.log('\n✅ Problem 44 (Session 9, Case 4: Nested For Loop) seeded successfully!');

  } catch (error) {
    console.error('Error seeding problem:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedProblem44()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
