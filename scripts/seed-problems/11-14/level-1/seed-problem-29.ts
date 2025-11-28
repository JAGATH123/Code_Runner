import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem29() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    const problem29 = {
      problem_id: 29,
      session_id: 6,
      title: 'Deeply Nested If-Else Chain',
      description: 'Master deeply nested if-else chains to create multi-layered decision structures that check multiple conditions in sequence.',
      difficulty: 'Medium',
      tags: ['conditionals', 'nested-if', 'if-else-chain', 'multi-level-decisions'],
      question: `Use input() to get speed (convert to integer).
Use input() to get altitude (convert to integer).
Use input() to get systems_check (string: "True" or "False").
Check if speed > 100, else print "Speed insufficient."
If true, check if altitude > 4000, else print "Altitude too low."
If true, check if systems_check == "True", print "Flight approved.", else print "Systems malfunction."`,
      example_code: '# Write your code here\n',
      sample_input: '120\n5000\nTrue',
      sample_output: 'Flight approved.',
      age_group: '11-14',
      level_number: 1,
      metadata: {
        concepts: ['nested-if', 'if-else-chain', 'multi-level-decisions', 'sequential-checks'],
        space_theme: true,
        estimated_time_minutes: 15,
        test_protocol: 'Students should use deeply nested if-else chains with three levels of conditions'
      },
      // Case-specific content
      case_number: 4,
      case_title: 'Deeply Nested If-Else Chain',
      case_overview: `Case 4: Deeply Nested If-Else Chain

Learn how to create deeply nested if-else chains with multiple levels of decision-making. Like a series of security checkpoints before a rocket launch, each condition must pass before moving to the next check.`,
      case_explanation: `Three levels of if-else conditions. Each level checks a different condition. Only proceeds to next level if current passes. Provides specific error messages for each failure.`,
      case_code: `# Sample Example:
fuel = int(input())
oxygen = int(input())
engine = input()
if fuel > 60:
    if oxygen > 75:
        if engine == "True":
            print("Launch Conditions Met.")
        else:
            print("Engine failure.")
    else:
        print("Oxygen too low.")
else:
    print("Fuel insufficient.")

# Now you try for our task`,
      expected_output: 'Flight approved.',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCases29 = [
      {
        problem_id: 29,
        test_case_id: 1,
        input: '120\n5000\nTrue',
        expected_output: 'Flight approved.',
        is_hidden: false,
        weight: 1.0,
        created_at: new Date()
      },
      {
        problem_id: 29,
        test_case_id: 2,
        input: '90\n5000\nTrue',
        expected_output: 'Speed insufficient.',
        is_hidden: true,
        weight: 1.0,
        created_at: new Date()
      },
      {
        problem_id: 29,
        test_case_id: 3,
        input: '120\n3000\nTrue',
        expected_output: 'Altitude too low.',
        is_hidden: true,
        weight: 1.0,
        created_at: new Date()
      },
      {
        problem_id: 29,
        test_case_id: 4,
        input: '120\n5000\nFalse',
        expected_output: 'Systems malfunction.',
        is_hidden: true,
        weight: 1.0,
        created_at: new Date()
      },
      {
        problem_id: 29,
        test_case_id: 5,
        input: '150\n6000\nTrue',
        expected_output: 'Flight approved.',
        is_hidden: true,
        weight: 1.0,
        created_at: new Date()
      }
    ];

    const result = await problemsCollection.updateOne(
      { problem_id: 29 },
      { $set: problem29 },
      { upsert: true }
    );

    console.log('Problem 29 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 29 });
    const testCasesResult = await testCasesCollection.insertMany(testCases29);
    console.log('Test cases inserted:', testCasesResult.insertedCount);

    console.log('\n✅ Problem 29 (Session 6, Case 4: Deeply Nested If-Else Chain) seeded successfully!');
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

seedProblem29()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
