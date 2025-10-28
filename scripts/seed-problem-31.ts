import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem31() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem31 = {
      problem_id: 31,
      session_id: 7,
      title: 'Creating and Accessing List Elements',
      description: 'Learn how to create a list and access its items using index numbers.',
      difficulty: 'Easy',
      tags: ['lists', 'indexing', 'data-structures', 'basics'],
      case_overview: `Case 1: Creating and Accessing List Elements

Learn how to create a list and access its items using index numbers.`,
      case_explanation: `Explanation:
● Lists use square brackets []
● Index starts from 0, so fruits[0] is "apple"
● fruits[2] gives the third item: "cherry"

Hints:
● Create a list called fruits with three string items: "apple", "banana", "cherry"
● Access the first item using index 0 and print it
● Access the third item using index 2 and print it
● Remember: Index numbering starts at 0, not 1
● Each print statement should be on a separate line`,
      case_code: `# Sample Example:
fruits = ["apple", "banana", "cherry"]
print(fruits[0])
print(fruits[2])

# Now you try:
# Create a list called planets with three items: "Mercury", "Venus", "Earth"
# Print the first planet (index 0)
# Print the third planet (index 2)`,
      expected_output: 'Mercury\nEarth',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCase31 = {
      problem_id: 31,
      case_number: 1,
      input: '',
      expected_output: 'Mercury\nEarth',
      is_hidden: false,
      created_at: new Date(),
    };

    const result = await problemsCollection.updateOne(
      { problem_id: 31 },
      { $set: problem31 },
      { upsert: true }
    );

    console.log('Problem 31 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 31 });
    const testResult = await testCasesCollection.insertOne(testCase31);
    console.log('Test cases inserted:', testResult.insertedId ? 1 : 0);

    console.log('\n✅ Problem 31 (Session 7, Case 1: Creating and Accessing List Elements) seeded successfully!');

  } catch (error) {
    console.error('Error seeding problem:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedProblem31()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
