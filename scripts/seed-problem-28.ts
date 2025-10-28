import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem28() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem28 = {
      problem_id: 28,
      session_id: 6,
      title: 'Multiple Conditions in Inner If',
      description: 'Learn to combine logical operators with nested if statements to evaluate multiple conditions within inner decision blocks.',
      difficulty: 'Easy',
      tags: ['conditionals', 'nested-if', 'logical-operators', 'multiple-conditions'],
      case_overview: `Case 3: Multiple Conditions in Inner If

In this case, you'll learn how to use logical operators (and, or) within nested if statements. This allows you to check multiple conditions at the same time in your inner decision blocks.`,
      case_explanation: `Multiple Conditions Pattern:
● Outer if checks first condition
● Inner if uses AND/OR to check multiple conditions together
● Both conditions must be true for AND
● At least one must be true for OR

Hints:
● Get temperature from user input (convert to int)
● Get pressure_stable from user input (compare with "True")
● Check if temperature > 20
● If true, print "Temperature acceptable."
● Inside that, check if pressure_stable == "True" AND temperature > 25
  ● If both true, print "All systems go for launch."
  ● Else, print "Additional checks needed."
● Your solution must work for ANY combination of inputs`,
      case_code: `# Sample Example:
fuel_level = int(input("Enter fuel level: "))
engine_ready = input("Engine ready? (True/False): ")
if fuel_level > 60:
    print("Fuel OK.")
    if engine_ready == "True" and fuel_level > 65:
        print("Engine ready and fuel sufficient for launch.")
    else:
        print("Either engine not ready or fuel just enough.")

# Now you try:
# Get temperature from user (convert to int)
# Get pressure_stable from user (string: "True" or "False")
# Check if temperature > 20
#   If true, print "Temperature acceptable."
#   Inside that, check if pressure_stable == "True" and temperature > 25
#     If both true, print "All systems go for launch."
#     If either false, print "Additional checks needed."`,
      expected_output: 'Temperature acceptable.\nAll systems go for launch.',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCases = [
      {
        problem_id: 28,
        case_number: 1,
        input: '30\nTrue',
        expected_output: 'Temperature acceptable.\nAll systems go for launch.',
        is_hidden: false,
        created_at: new Date(),
      },
      {
        problem_id: 28,
        case_number: 2,
        input: '23\nFalse',
        expected_output: 'Temperature acceptable.\nAdditional checks needed.',
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 28,
        case_number: 3,
        input: '15\nTrue',
        expected_output: '',
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 28,
        case_number: 4,
        input: '26\nTrue',
        expected_output: 'Temperature acceptable.\nAll systems go for launch.',
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 28,
        case_number: 5,
        input: '35\nFalse',
        expected_output: 'Temperature acceptable.\nAdditional checks needed.',
        is_hidden: true,
        created_at: new Date(),
      },
    ];

    const result = await problemsCollection.updateOne(
      { problem_id: 28 },
      { $set: problem28 },
      { upsert: true }
    );

    console.log('Problem 28 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 28 });
    const testResult = await testCasesCollection.insertMany(testCases);
    console.log('Test cases inserted:', testResult.insertedCount);

    console.log('\n✅ Problem 28 (Session 6, Case 3: Multiple Conditions in Inner If) seeded successfully!');
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

seedProblem28()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
