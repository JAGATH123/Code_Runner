import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem30() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem30 = {
      problem_id: 30,
      session_id: 6,
      title: 'Nested If-Else with External Flags',
      description: 'Combine nested if-else statements with flag variables to control program flow based on multiple sequential checks.',
      difficulty: 'Medium',
      tags: ['conditionals', 'nested-if', 'flags', 'boolean-logic', 'final-task'],
      case_overview: `Case 5: Nested If-Else with External Flags (Final Task)

In this final task, you'll combine everything you've learned about nested if-else statements with flag variables. A flag is a boolean variable that stores the result of multiple condition checks.`,
      case_explanation: `Flag Pattern:
● Use a boolean variable (flag) to track if all conditions pass
● Start with flag = False
● Use nested ifs to check conditions
● If all pass, set flag = True
● After checks, use the flag to make final decision

Hints:
● Get 4 inputs: power (int), cooling (int), pressure_ok (string), radiation_safe (string)
● Create reactor_ready = False
● if power > 80:
●   if cooling > 70:
●     if pressure_ok == "True" and radiation_safe == "True":
●       reactor_ready = True
● if reactor_ready: print "Reactor Startup Approved."
● else: print "Reactor Startup Denied."`,
      case_code: `# Sample Example:
fuel = int(input())
oxygen = int(input())
engine = input()
weather = input()
launch_ready = False

if fuel > 60:
    if oxygen > 70:
        if engine == "True" and weather == "True":
            launch_ready = True

if launch_ready:
    print("Launch Approved.")
else:
    print("Launch Denied.")

# Now you try:
# Get power (int), cooling (int), pressure_ok (string), radiation_safe (string)
# reactor_ready = False
# if power > 80:
#   if cooling > 70:
#     if pressure_ok == "True" and radiation_safe == "True":
#       reactor_ready = True
# if reactor_ready: print "Reactor Startup Approved."
# else: print "Reactor Startup Denied."`,
      expected_output: 'Reactor Startup Approved.',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCases = [
      {
        problem_id: 30,
        case_number: 1,
        input: '95\n75\nTrue\nTrue',
        expected_output: 'Reactor Startup Approved.',
        is_hidden: false,
        created_at: new Date(),
      },
      {
        problem_id: 30,
        case_number: 2,
        input: '70\n75\nTrue\nTrue',
        expected_output: 'Reactor Startup Denied.',
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 30,
        case_number: 3,
        input: '95\n65\nTrue\nTrue',
        expected_output: 'Reactor Startup Denied.',
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 30,
        case_number: 4,
        input: '95\n75\nFalse\nTrue',
        expected_output: 'Reactor Startup Denied.',
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 30,
        case_number: 5,
        input: '100\n80\nTrue\nTrue',
        expected_output: 'Reactor Startup Approved.',
        is_hidden: true,
        created_at: new Date(),
      },
    ];

    const result = await problemsCollection.updateOne(
      { problem_id: 30 },
      { $set: problem30 },
      { upsert: true }
    );

    console.log('Problem 30 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 30 });
    const testResult = await testCasesCollection.insertMany(testCases);
    console.log('Test cases inserted:', testResult.insertedCount);

    console.log('\n✅ Problem 30 (Session 6, Case 5: Nested If-Else with External Flags) seeded successfully!');
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

seedProblem30()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
