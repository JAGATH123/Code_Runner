import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem20() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 20: Session 4, Case 5 - Mission Logic System (Final Task)
    const problem20 = {
      problem_id: 20,
      session_id: 4,
      title: 'Mission Logic System',
      description: 'Build a comprehensive mission control system that uses arithmetic, assignment, and logical operators to determine launch approval.',
      difficulty: 'Intro',
      example_code: '# Build your Mission Logic System\n# Your code here:\n',
      sample_input: '',
      sample_output: 'Launch Approved!',
      age_group: '11-14',
      level_number: 1,
      metadata: {
        concepts: ['arithmetic operators', 'assignment operators', 'logical operators', 'conditionals', 'if-else', 'boolean logic', 'decision making'],
        space_theme: true,
        estimated_time_minutes: 15,
        test_protocol: 'Students should create fuel_level=100, oxygen_level=80, engine_ready=True, reduce fuel by 25 using -=, check all three conditions with and, and print "Launch Approved!" or "Launch Denied!" based on conditions'
      },

      // Session-level content
      session_title: 'Session 4: Understanding Operators in Python',
      session_introduction: `Operators are unique symbols in Python that let you work with variables and values. Like buttons on a mission control panel, they are vital tools that support the thought, calculation, and decision-making processes of your programs. Operators are essential, whether they are determining a rover's speed, updating the fuel left on a mission, or making sure all systems are prepared for launch. Logical operators enable your program to make decisions based on conditions; assignment operators allow you to store and update values; and arithmetic operators assist you in performing calculations such as addition and subtraction. You can take control of your code's flow and your mission by becoming proficient with these operators.`,

      // Case-specific content
      case_number: 5,
      case_title: 'Mission Logic System',
      case_overview: `Commander, it's time to test your full control system! Build a Python program that combines all operator types to create a mission launch approval system.`,
      case_code: `# Sample Example:
power_level = 100
backup_power = 50
systems_online = True
power_level -= 30
launch_ready = (power_level > 60) and (backup_power > 40) and systems_online
if launch_ready:
    print("All systems go!")
else:
    print("Systems check failed!")

# Now build your Mission Logic System:
# 1. Create fuel_level = 100 (integer)
# 2. Create oxygen_level = 80 (integer)
# 3. Create engine_ready = True (boolean)
# 4. Reduce fuel by 25 using -=
# 5. Check if fuel_level > 50 AND oxygen_level > 60 AND engine_ready
# 6. Print "Launch Approved!" if all conditions are true
# 7. Print "Launch Denied!" if any condition is false`,
      case_explanation: `Hints:
● Create three variables with the specified values
● Use -= to reduce fuel_level by 25 (fuel_level becomes 75)
● Use 'and' to combine all three conditions
● All three must be True for launch approval
● Use if-else statement to check conditions
● Format:
  if fuel_level > 50 and oxygen_level > 60 and engine_ready:
      print("Launch Approved!")
  else:
      print("Launch Denied!")`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Test cases for Problem 20
    const testCases20 = [
      {
        problem_id: 20,
        test_case_id: 1,
        input: '',
        expected_output: 'Launch Approved!',
        is_hidden: false,
        weight: 1.0,
        created_at: new Date()
      }
    ];

    // Upsert problem 20
    const problemResult = await problemsCollection.updateOne(
      { problem_id: 20 },
      { $set: problem20 },
      { upsert: true }
    );

    console.log('Problem 20 upserted:', problemResult.upsertedId || 'Updated existing');

    // Delete existing test cases for problem 20
    await testCasesCollection.deleteMany({ problem_id: 20 });

    // Insert test cases
    const testCasesResult = await testCasesCollection.insertMany(testCases20);
    console.log('Test cases inserted:', testCasesResult.insertedCount);

    console.log('\n✅ Problem 20 (Session 4, Case 5: Mission Logic System) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem20()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
