import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem23() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    const problem23 = {
      problem_id: 23,
      session_id: 5,
      title: 'Using Comparison Operators',
      description: 'Learn to use comparison operators like != to check if values are different.',
      difficulty: 'Easy',
      tags: ['conditionals', 'comparison-operators', 'not-equal', 'input'],
      question: `Write a program that asks the user for a system_status. If the status is not equal to "OK", print "System malfunction detected!"`,
      case_overview: `Case 3: Using Comparison Operators

Learn to use different comparison operators, focusing on != (not equal).`,
      case_explanation: `| Operator | Symbol | Description |
|----------|--------|-------------|
| Equal to | == | Checks if two values are equal |
| Not equal | != | Checks if two values are different |
| Greater than | > | Checks if left is greater than right |
| Less than | < | Checks if left is less than right |
| Greater or equal | >= | Checks if left is greater or equal |
| Less or equal | <= | Checks if left is less or equal |`,
      case_code: `# Sample Example:
password = input("Enter password: ")
if password != "1234":
    print("Access denied!")

# Now you try for our task`,
      sample_input: 'ERROR',
      sample_output: 'System malfunction detected!',
      expected_output: 'System malfunction detected!',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCases = [
      {
        problem_id: 23,
        case_number: 1,
        input: 'ERROR',
        expected_output: 'System malfunction detected!',
        is_hidden: false,
        created_at: new Date(),
      },
      {
        problem_id: 23,
        case_number: 2,
        input: 'FAIL',
        expected_output: 'System malfunction detected!',
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 23,
        case_number: 3,
        input: 'OK',
        expected_output: '',
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 23,
        case_number: 4,
        input: 'WARNING',
        expected_output: 'System malfunction detected!',
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 23,
        case_number: 5,
        input: 'ok',
        expected_output: 'System malfunction detected!',
        is_hidden: true,
        created_at: new Date(),
      },
    ];

    const result = await problemsCollection.updateOne(
      { problem_id: 23 },
      { $set: problem23 },
      { upsert: true }
    );

    console.log('Problem 23 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 23 });
    const testResult = await testCasesCollection.insertMany(testCases);
    console.log('Test cases inserted:', testResult.insertedCount);

    console.log('\n✅ Problem 23 (Session 5, Case 3: Using Comparison Operators) seeded successfully!');
    console.log('   📊 Test cases: 1 visible + 4 hidden');

  } catch (error) {
    console.error('Error seeding problem:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedProblem23()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
