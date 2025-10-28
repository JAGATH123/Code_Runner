import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem21() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem21 = {
      problem_id: 21,
      session_id: 5,
      title: 'Simple If Statement',
      description: 'Learn to use the if statement to check a condition and run code only when it is true.',
      difficulty: 'Easy',
      tags: ['conditionals', 'if-statement', 'comparison-operators', 'input'],
      question: `Write a program that asks the user for the temperature in degrees Celsius. If the temperature is greater than 30, print "It's a hot day!"`,
      case_overview: `Case 1: Simple If Statement

Check a condition and run a block of code only if it's true.`,
      case_explanation: `| Operator | Symbol | Description |
|----------|--------|-------------|
| Equal to | == | Checks if two values are equal |
| Not equal | != | Checks if two values are different |
| Greater than | > | Checks if left is greater than right |
| Less than | < | Checks if left is less than right |
| Greater or equal | >= | Checks if left is greater or equal |
| Less or equal | <= | Checks if left is less or equal |

Hints:
● Use input() to get temperature from user
● Convert to integer using int()
● Use if statement with condition: temperature > 30
● Remember to indent the code inside if block (4 spaces)
● Format: "It's a hot day!"
● Your solution must work for ANY temperature value, not just the example`,
      case_code: `# Sample Example:
speed = int(input("Enter rover speed: "))
if speed > 50:
    print("Speed is too high!")

# Now you try:
# Ask user for temperature in °C (use input and convert to int)
# Check if temperature > 30
# If true, print "It's a hot day!"`,
      expected_output: "It's a hot day!",
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Multiple test cases to prevent hardcoding
    const testCases = [
      {
        problem_id: 21,
        case_number: 1,
        input: '35',
        expected_output: "It's a hot day!",
        is_hidden: false,
        created_at: new Date(),
      },
      {
        problem_id: 21,
        case_number: 2,
        input: '31',
        expected_output: "It's a hot day!",
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 21,
        case_number: 3,
        input: '25',
        expected_output: '',
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 21,
        case_number: 4,
        input: '100',
        expected_output: "It's a hot day!",
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 21,
        case_number: 5,
        input: '30',
        expected_output: '',
        is_hidden: true,
        created_at: new Date(),
      },
    ];

    const result = await problemsCollection.updateOne(
      { problem_id: 21 },
      { $set: problem21 },
      { upsert: true }
    );

    console.log('Problem 21 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 21 });
    const testResult = await testCasesCollection.insertMany(testCases);
    console.log('Test cases inserted:', testResult.insertedCount);

    console.log('\n✅ Problem 21 (Session 5, Case 1: Simple If Statement) seeded successfully!');
    console.log('   📊 Test cases: 1 visible + 4 hidden');

  } catch (error) {
    console.error('Error seeding problem:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedProblem21()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
