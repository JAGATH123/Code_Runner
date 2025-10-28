import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem24() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem24 = {
      problem_id: 24,
      session_id: 5,
      title: 'Using Multiple Conditions with elif',
      description: 'Learn to handle multiple conditions using elif statements.',
      difficulty: 'Easy',
      tags: ['conditionals', 'elif', 'multiple-conditions', 'input'],
      question: `Write a program that asks the user for a test score (0-100). Print the grade based on these conditions:
- If score >= 90, print "Grade: A"
- If score >= 80, print "Grade: B"
- If score >= 70, print "Grade: C"
- If score >= 60, print "Grade: D"
- Otherwise, print "Grade: F"`,
      case_overview: `Case 4: Using Multiple Conditions with elif

Handle multiple conditions using if-elif-else chains.`,
      case_explanation: `elif Structure:
● if condition1:
    # Runs if condition1 is True
● elif condition2:
    # Runs if condition1 is False and condition2 is True
● else:
    # Runs if all conditions are False

Hints:
● Use input() to get score from user and convert to int
● Use if to check score >= 90 → print "Grade: A"
● Use elif to check score >= 80 → print "Grade: B"
● Use elif to check score >= 70 → print "Grade: C"
● Use elif to check score >= 60 → print "Grade: D"
● Use else for scores below 60 → print "Grade: F"
● Your solution must work for ANY score value`,
      case_code: `# Sample Example:
altitude = int(input("Enter altitude: "))
if altitude > 10000:
    print("High altitude")
elif altitude > 5000:
    print("Medium altitude")
else:
    print("Low altitude")

# Now you try:
# Get score from user (convert to int)
# if score >= 90: print "Grade: A"
# elif score >= 80: print "Grade: B"
# elif score >= 70: print "Grade: C"
# elif score >= 60: print "Grade: D"
# else: print "Grade: F"`,
      expected_output: 'Grade: A',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCases = [
      {
        problem_id: 24,
        case_number: 1,
        input: '95',
        expected_output: 'Grade: A',
        is_hidden: false,
        created_at: new Date(),
      },
      {
        problem_id: 24,
        case_number: 2,
        input: '85',
        expected_output: 'Grade: B',
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 24,
        case_number: 3,
        input: '75',
        expected_output: 'Grade: C',
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 24,
        case_number: 4,
        input: '65',
        expected_output: 'Grade: D',
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 24,
        case_number: 5,
        input: '50',
        expected_output: 'Grade: F',
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 24,
        case_number: 6,
        input: '90',
        expected_output: 'Grade: A',
        is_hidden: true,
        created_at: new Date(),
      },
    ];

    const result = await problemsCollection.updateOne(
      { problem_id: 24 },
      { $set: problem24 },
      { upsert: true }
    );

    console.log('Problem 24 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 24 });
    const testResult = await testCasesCollection.insertMany(testCases);
    console.log('Test cases inserted:', testResult.insertedCount);

    console.log('\n✅ Problem 24 (Session 5, Case 4: Using Multiple Conditions with elif) seeded successfully!');
    console.log('   📊 Test cases: 1 visible + 5 hidden');

  } catch (error) {
    console.error('Error seeding problem:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedProblem24()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
