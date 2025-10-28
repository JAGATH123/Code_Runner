import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem45() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem45 = {
      problem_id: 45,
      session_id: 9,
      title: 'For Loop with Strings',
      description: 'You can loop through each character of a string.',
      difficulty: 'Easy',
      tags: ['loops', 'for-loop', 'strings', 'iteration', 'final-task'],
      case_overview: `Case 5: For Loop with Strings (Final Task)

You can loop through each character of a string.`,
      case_explanation: `Explanation:
● Each character in the string "Mars" is printed one by one

Hints:
● Create a variable called word with the string "Mars"
● Use a for loop to iterate through each character in the string
● Syntax: for letter in word:
● Inside the loop (indented by 4 spaces), print each letter
● Strings are sequences, so you can iterate through them like lists
● Each iteration gives you one character from the string
● The loop automatically goes through each character from left to right
● The output will have 4 lines, one for each character: M, a, r, s`,
      case_code: `# Sample Example:
word = "Mars"
for letter in word:
    print(letter)

# Now you try:
# Create a variable called mission with the string "Apollo"
# Use a for loop to iterate through each character in mission
# Inside the loop, print each character`,
      expected_output: 'A\np\no\nl\nl\no',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCase45 = {
      problem_id: 45,
      case_number: 1,
      input: '',
      expected_output: 'A\np\no\nl\nl\no',
      is_hidden: false,
      created_at: new Date(),
    };

    const result = await problemsCollection.updateOne(
      { problem_id: 45 },
      { $set: problem45 },
      { upsert: true }
    );

    console.log('Problem 45 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 45 });
    const testResult = await testCasesCollection.insertOne(testCase45);
    console.log('Test cases inserted:', testResult.insertedId ? 1 : 0);

    console.log('\n✅ Problem 45 (Session 9, Case 5: For Loop with Strings) seeded successfully!');

  } catch (error) {
    console.error('Error seeding problem:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedProblem45()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
