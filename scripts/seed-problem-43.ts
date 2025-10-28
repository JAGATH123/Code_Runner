import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem43() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem43 = {
      problem_id: 43,
      session_id: 9,
      title: 'For Loop with Conditional Logic',
      description: 'Add if statements inside loops to add logic.',
      difficulty: 'Easy',
      tags: ['loops', 'for-loop', 'conditionals', 'if-else', 'modulo'],
      case_overview: `Case 3: For Loop with Conditional Logic

Add if statements inside loops to add logic.`,
      case_explanation: `Explanation:
● % is the modulo operator
● It checks whether numbers are even or odd

Hints:
● Use a for loop with range(1, 6) to iterate through numbers 1 to 5
● Inside the loop, use an if statement to check if number % 2 == 0
● If the condition is true (even number), print the number followed by "is even"
● If the condition is false (odd number), print the number followed by "is odd"
● The modulo operator % returns the remainder of division
● number % 2 == 0 means the number is divisible by 2 (even)
● Indentation: 4 spaces for the loop body, 8 spaces for the if/else statements
● The output will have 5 lines showing whether each number is even or odd`,
      case_code: `# Sample Example:
for number in range(1, 6):
    if number % 2 == 0:
        print(number, "is even")
    else:
        print(number, "is odd")

# Now you try:
# Use a for loop with range(10, 16) to iterate through numbers 10 to 15
# Inside the loop, check if the number is divisible by 3 using % 3 == 0
# If true, print the number followed by "is divisible by 3"
# If false, print the number followed by "is not divisible by 3"`,
      expected_output: '10 is not divisible by 3\n11 is not divisible by 3\n12 is divisible by 3\n13 is not divisible by 3\n14 is not divisible by 3\n15 is divisible by 3',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCase43 = {
      problem_id: 43,
      case_number: 1,
      input: '',
      expected_output: '10 is not divisible by 3\n11 is not divisible by 3\n12 is divisible by 3\n13 is not divisible by 3\n14 is not divisible by 3\n15 is divisible by 3',
      is_hidden: false,
      created_at: new Date(),
    };

    const result = await problemsCollection.updateOne(
      { problem_id: 43 },
      { $set: problem43 },
      { upsert: true }
    );

    console.log('Problem 43 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 43 });
    const testResult = await testCasesCollection.insertOne(testCase43);
    console.log('Test cases inserted:', testResult.insertedId ? 1 : 0);

    console.log('\n✅ Problem 43 (Session 9, Case 3: For Loop with Conditional Logic) seeded successfully!');

  } catch (error) {
    console.error('Error seeding problem:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedProblem43()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
