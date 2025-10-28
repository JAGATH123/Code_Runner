import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem22() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem22 = {
      problem_id: 22,
      session_id: 5,
      title: 'If-Else Statement',
      description: 'Learn to choose between two blocks of code using if-else statements.',
      difficulty: 'Easy',
      tags: ['conditionals', 'if-else', 'comparison-operators', 'input'],
      question: `Write a program that asks the user for the speed of a car in km/h. If the speed is greater than 60, print "You're going too fast!" Otherwise, print "You're within the speed limit."`,
      case_overview: `Case 2: If-Else Statement

Choose between two blocks of code depending on the condition.`,
      case_explanation: `If-Else Structure:
● if condition:
    # Code runs when condition is True
● else:
    # Code runs when condition is False

Hints:
● Use input() to get speed from user
● Convert to integer using int()
● Use if statement with condition: speed > 60
● Add else block for the alternative case
● Remember to indent both code blocks (4 spaces)
● When condition is True: "You're going too fast!"
● When condition is False: "You're within the speed limit."
● Your solution must work for ANY speed value, not just the example`,
      case_code: `# Sample Example:
fuel_level = int(input("Enter fuel level: "))
if fuel_level < 20:
    print("Warning: Low fuel!")
else:
    print("Fuel level is sufficient.")

# Now you try:
# Ask user for speed of the car in km/h (use input and convert to int)
# Check if speed > 60
# If true, print "You're going too fast!"
# If false, print "You're within the speed limit."`,
      expected_output: "You're going too fast!",
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Multiple test cases to prevent hardcoding
    const testCases = [
      {
        problem_id: 22,
        case_number: 1,
        input: '75',
        expected_output: "You're going too fast!",
        is_hidden: false,
        created_at: new Date(),
      },
      {
        problem_id: 22,
        case_number: 2,
        input: '61',
        expected_output: "You're going too fast!",
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 22,
        case_number: 3,
        input: '50',
        expected_output: "You're within the speed limit.",
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 22,
        case_number: 4,
        input: '60',
        expected_output: "You're within the speed limit.",
        is_hidden: true,
        created_at: new Date(),
      },
      {
        problem_id: 22,
        case_number: 5,
        input: '120',
        expected_output: "You're going too fast!",
        is_hidden: true,
        created_at: new Date(),
      },
    ];

    const result = await problemsCollection.updateOne(
      { problem_id: 22 },
      { $set: problem22 },
      { upsert: true }
    );

    console.log('Problem 22 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 22 });
    const testResult = await testCasesCollection.insertMany(testCases);
    console.log('Test cases inserted:', testResult.insertedCount);

    console.log('\n✅ Problem 22 (Session 5, Case 2: If-Else Statement) seeded successfully!');
    console.log('   📊 Test cases: 1 visible + 4 hidden');

  } catch (error) {
    console.error('Error seeding problem:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedProblem22()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
