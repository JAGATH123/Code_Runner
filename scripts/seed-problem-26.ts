import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem26() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem26 = {
      problem_id: 26,
      session_id: 6,
      title: 'Simple Nested If',
      description: 'Learn to use nested if statements to make multi-level decisions based on multiple conditions.',
      difficulty: 'Easy',
      tags: ['conditionals', 'nested-if', 'multi-level-decisions'],
      case_overview: `Case 1: Simple Nested If

Learn to use nested if statements to check conditions within conditions, creating multi-level decision-making logic.`,
      case_explanation: `Nested If Structure:
● Outer if checks first condition
● If outer condition is True, its code block runs
● Inside that block, you can have another if (nested if)
● The nested if only runs if the outer if was True

Hints:
● Get fuel_level from user input (convert to int)
● Check if fuel_level > 50
● If true, print "Fuel level is sufficient."
● Inside that if block, check if fuel_level > 75
● If true, print "Fuel level is excellent."
● Use proper indentation (4 spaces for outer, 8 spaces for nested)
● Your solution must work for ANY fuel_level value`,
      case_code: `# Sample Example:
temperature = int(input("Enter temperature: "))
if temperature > 20:
    print("Temperature is comfortable.")
    if temperature > 30:
        print("It's getting hot!")

# Now you try:
# Get fuel_level from user input (convert to int)
# Check if fuel_level > 50
#   If true, print "Fuel level is sufficient."
#   Inside that, check if fuel_level > 75
#     If true, print "Fuel level is excellent."`,
      expected_output: 'Fuel level is sufficient.\nFuel level is excellent.',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCases = [
      {
        problem_id: 26,
        case_number: 1,
        input: '80',
        expected_output: 'Fuel level is sufficient.\nFuel level is excellent.',
        is_hidden: false,
        created_at: new Date(),
      },
      {
        problem_id: 26,
        case_number: 2,
        input: '60',
        expected_output: 'Fuel level is sufficient.',
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 26,
        case_number: 3,
        input: '40',
        expected_output: '',
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 26,
        case_number: 4,
        input: '76',
        expected_output: 'Fuel level is sufficient.\nFuel level is excellent.',
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 26,
        case_number: 5,
        input: '50',
        expected_output: '',
        is_hidden: true,
        created_at: new Date(),
      },
    ];

    const result = await problemsCollection.updateOne(
      { problem_id: 26 },
      { $set: problem26 },
      { upsert: true }
    );

    console.log('Problem 26 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 26 });
    const testResult = await testCasesCollection.insertMany(testCases);
    console.log('Test cases inserted:', testResult.insertedCount);

    console.log('\n✅ Problem 26 (Session 6, Case 1: Simple Nested If) seeded successfully!');
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

seedProblem26()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
