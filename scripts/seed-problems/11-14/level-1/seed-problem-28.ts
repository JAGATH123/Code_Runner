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
    const testCasesCollection = db.collection('test_cases');

    const problem28 = {
      problem_id: 28,
      session_id: 6,
      title: 'Multiple Conditions in Inner If',
      description: 'Learn to combine logical operators with nested if statements to evaluate multiple conditions within inner decision blocks.',
      difficulty: 'Easy',
      tags: ['conditionals', 'nested-if', 'logical-operators', 'multiple-conditions'],
      question: `Use input() to get temperature (convert to integer).
Use input() to get pressure_stable (string: "True" or "False").
Check if temperature > 20.
If true, print "Temperature acceptable."
Inside that if block, check if pressure_stable == "True" AND temperature > 25.
If both true, print "All systems go for launch."
If either false, print "Additional checks needed."`,
      example_code: '# Write your code here\n',
      sample_input: '30\nTrue',
      sample_output: 'Temperature acceptable.\nAll systems go for launch.',
      age_group: '11-14',
      level_number: 1,
      metadata: {
        concepts: ['nested-if', 'logical-operators', 'multiple-conditions', 'and-operator'],
        space_theme: true,
        estimated_time_minutes: 15,
        test_protocol: 'Students should use nested if with AND operator to check multiple conditions'
      },
      // Case-specific content
      case_number: 3,
      case_title: 'Multiple Conditions in Inner If',
      case_overview: `Case 3: Multiple Conditions in Inner If

Learn how to use logical operators (and, or) within nested if statements to check multiple conditions at the same time in your inner decision blocks.`,
      case_explanation: `Outer if checks first condition. Inner if uses AND/OR to check multiple conditions together. Both conditions must be true for AND. At least one must be true for OR.`,
      case_code: `# Sample Example:
fuel_level = int(input("Enter fuel level: "))
engine_ready = input("Engine ready? (True/False): ")
if fuel_level > 60:
    print("Fuel OK.")
    if engine_ready == "True" and fuel_level > 65:
        print("Engine ready and fuel sufficient for launch.")

# Now you try for our task`,
      expected_output: 'Temperature acceptable.\nAll systems go for launch.',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCases28 = [
      {
        problem_id: 28,
        test_case_id: 1,
        input: '30\nTrue',
        expected_output: 'Temperature acceptable.\nAll systems go for launch.',
        is_hidden: false,
        weight: 1.0,
        created_at: new Date()
      },
      {
        problem_id: 28,
        test_case_id: 2,
        input: '23\nFalse',
        expected_output: 'Temperature acceptable.\nAdditional checks needed.',
        is_hidden: true,
        weight: 1.0,
        created_at: new Date()
      },
      {
        problem_id: 28,
        test_case_id: 3,
        input: '15\nTrue',
        expected_output: '',
        is_hidden: true,
        weight: 1.0,
        created_at: new Date()
      },
      {
        problem_id: 28,
        test_case_id: 4,
        input: '26\nTrue',
        expected_output: 'Temperature acceptable.\nAll systems go for launch.',
        is_hidden: true,
        weight: 1.0,
        created_at: new Date()
      },
      {
        problem_id: 28,
        test_case_id: 5,
        input: '35\nFalse',
        expected_output: 'Temperature acceptable.\nAdditional checks needed.',
        is_hidden: true,
        weight: 1.0,
        created_at: new Date()
      }
    ];

    const result = await problemsCollection.updateOne(
      { problem_id: 28 },
      { $set: problem28 },
      { upsert: true }
    );

    console.log('Problem 28 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 28 });
    const testCasesResult = await testCasesCollection.insertMany(testCases28);
    console.log('Test cases inserted:', testCasesResult.insertedCount);

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
