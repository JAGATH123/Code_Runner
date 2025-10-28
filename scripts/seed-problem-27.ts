import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem27() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem27 = {
      problem_id: 27,
      session_id: 6,
      title: 'Nested If-Else',
      description: 'Learn to use nested if-else statements to handle multiple decision paths based on layered conditions.',
      difficulty: 'Easy',
      tags: ['conditionals', 'nested-if', 'if-else', 'decision-making'],
      case_overview: `Case 2: Nested If-Else

In this case, you'll learn how to use nested if-else statements to create multiple decision paths. By placing an if-else block inside another if statement, you can handle different scenarios based on layered conditions.`,
      case_explanation: `Nested If-Else Pattern:
● Outer if checks first condition
● If true, execute its block which contains another if-else
● The inner if-else creates two paths within the outer condition
● If outer condition is false, outer else executes

Hints:
● Get speed from user input (convert to int)
● Check if speed >= 50
● If true, print "Speed is sufficient."
● Inside that, check if speed >= 100
  ● If true, print "Speed is excellent."
  ● Else, print "Speed is moderate."
● If outer condition false, print "Speed too low."
● Your solution must work for ANY speed value`,
      case_code: `# Sample Example:
oxygen_level = int(input("Enter oxygen level: "))
if oxygen_level >= 60:
    print("Oxygen is at acceptable level.")
    if oxygen_level >= 80:
        print("Oxygen is optimal.")
    else:
        print("Oxygen is just above minimum.")
else:
    print("Oxygen too low. Cannot proceed.")

# Now you try:
# Get speed from user input (convert to int)
# Check if speed >= 50
#   If true, print "Speed is sufficient."
#   Inside that, check if speed >= 100
#     If true, print "Speed is excellent."
#     If false, print "Speed is moderate."
# If speed < 50, print "Speed too low."`,
      expected_output: 'Speed is sufficient.\nSpeed is moderate.',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCases = [
      {
        problem_id: 27,
        case_number: 1,
        input: '85',
        expected_output: 'Speed is sufficient.\nSpeed is moderate.',
        is_hidden: false,
        created_at: new Date(),
      },
      {
        problem_id: 27,
        case_number: 2,
        input: '120',
        expected_output: 'Speed is sufficient.\nSpeed is excellent.',
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 27,
        case_number: 3,
        input: '30',
        expected_output: 'Speed too low.',
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 27,
        case_number: 4,
        input: '50',
        expected_output: 'Speed is sufficient.\nSpeed is moderate.',
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 27,
        case_number: 5,
        input: '100',
        expected_output: 'Speed is sufficient.\nSpeed is excellent.',
        is_hidden: true,
        created_at: new Date(),
      },
    ];

    const result = await problemsCollection.updateOne(
      { problem_id: 27 },
      { $set: problem27 },
      { upsert: true }
    );

    console.log('Problem 27 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 27 });
    const testResult = await testCasesCollection.insertMany(testCases);
    console.log('Test cases inserted:', testResult.insertedCount);

    console.log('\n✅ Problem 27 (Session 6, Case 2: Nested If-Else) seeded successfully!');
    console.log('   📊 Test cases: 1 visible + 4 hidden');
    console.log('   ⚠️  CONVERTED: Hardcoded → Input-based');

  } catch (error) {
    console.error('Error seeding problem:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedProblem27()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
