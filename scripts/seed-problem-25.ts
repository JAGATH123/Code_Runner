import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem25() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem25 = {
      problem_id: 25,
      session_id: 5,
      title: 'Decision Chain',
      description: 'Combine multiple if-elif-else statements to make complex decisions based on multiple conditions.',
      difficulty: 'Easy',
      tags: ['conditionals', 'elif', 'multiple-conditions', 'decision-making', 'final-task'],
      question: `Write a program that asks the user for fuel level and altitude. Check the following conditions in order:
- If fuel >= 80 AND altitude >= 5000, print "Launch approved."
- If fuel >= 50 AND altitude >= 3000, print "Launch on standby."
- If fuel < 50, print "Insufficient fuel."
- Otherwise, print "Altitude too low."`,
      case_overview: `Case 5: Decision Chain (Final Task)

Create a decision chain that checks multiple conditions to determine if a spacecraft can launch.`,
      case_explanation: `Decision Chain Pattern:
● Check multiple conditions in sequence
● Each condition leads to different messages
● Use if-elif-else for multiple paths

Hints:
● Get fuel from user input (convert to int)
● Get altitude from user input (convert to int)
● Check if fuel >= 80 AND altitude >= 5000 → print "Launch approved."
● Check elif fuel >= 50 AND altitude >= 3000 → print "Launch on standby."
● Check elif fuel < 50 → print "Insufficient fuel."
● Else (altitude too low) → print "Altitude too low."
● Your solution must work for ANY combination of fuel and altitude values`,
      case_code: `# Sample Example:
speed = int(input("Enter speed: "))
weather = input("Enter weather: ")
if speed >= 100 and weather == "clear":
    print("Flight ready")
elif speed >= 100:
    print("Wait for better weather")
elif weather == "clear":
    print("Increase speed")
else:
    print("Not ready")

# Now you try:
# Get fuel (int) and altitude (int) from user
# if fuel >= 80 and altitude >= 5000: print "Launch approved."
# elif fuel >= 50 and altitude >= 3000: print "Launch on standby."
# elif fuel < 50: print "Insufficient fuel."
# else: print "Altitude too low."`,
      expected_output: 'Launch approved.',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCases = [
      {
        problem_id: 25,
        case_number: 1,
        input: '85\n5500',
        expected_output: 'Launch approved.',
        is_hidden: false,
        created_at: new Date(),
      },
      {
        problem_id: 25,
        case_number: 2,
        input: '60\n4000',
        expected_output: 'Launch on standby.',
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 25,
        case_number: 3,
        input: '40\n6000',
        expected_output: 'Insufficient fuel.',
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 25,
        case_number: 4,
        input: '90\n2000',
        expected_output: 'Altitude too low.',
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 25,
        case_number: 5,
        input: '80\n5000',
        expected_output: 'Launch approved.',
        is_hidden: true,
        created_at: new Date(),
      },
    ];

    const result = await problemsCollection.updateOne(
      { problem_id: 25 },
      { $set: problem25 },
      { upsert: true }
    );

    console.log('Problem 25 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 25 });
    const testResult = await testCasesCollection.insertMany(testCases);
    console.log('Test cases inserted:', testResult.insertedCount);

    console.log('\n✅ Problem 25 (Session 5, Case 5: Decision Chain) seeded successfully!');
    console.log('   📊 Test cases: 1 visible + 4 hidden');

  } catch (error) {
    console.error('Error seeding problem:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedProblem25()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
