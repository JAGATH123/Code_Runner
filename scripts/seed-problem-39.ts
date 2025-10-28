import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem39() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem39 = {
      problem_id: 39,
      session_id: 8,
      title: 'List Slicing',
      description: 'Use slicing to access parts of a list.',
      difficulty: 'Easy',
      tags: ['lists', 'slicing', 'indexing', 'advanced-operations'],
      case_overview: `Case 4: List Slicing

Use slicing to access parts of a list.`,
      case_explanation: `Explanation:
● list[start:end] returns a sublist from start to end-1

Hints:
● Create a list called letters with five items: "a", "b", "c", "d", "e"
● Use slicing syntax [1:4] to get elements from index 1 up to (but not including) index 4
● Print the sliced result
● Slicing syntax: list_name[start:end]
● The start index is included, the end index is excluded
● letters[1:4] will return ["b", "c", "d"] (indices 1, 2, 3)
● The original list is not modified by slicing`,
      case_code: `# Sample Example:
letters = ["a", "b", "c", "d", "e"]
print(letters[1:4])

# Now you try:
# Create a list called numbers with seven values: 10, 20, 30, 40, 50, 60, 70
# Use slicing [2:5] to get elements from index 2 to 4 (not including 5)
# Print the sliced result`,
      expected_output: '[30, 40, 50]',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCase39 = {
      problem_id: 39,
      case_number: 1,
      input: '',
      expected_output: '[30, 40, 50]',
      is_hidden: false,
      created_at: new Date(),
    };

    const result = await problemsCollection.updateOne(
      { problem_id: 39 },
      { $set: problem39 },
      { upsert: true }
    );

    console.log('Problem 39 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 39 });
    const testResult = await testCasesCollection.insertOne(testCase39);
    console.log('Test cases inserted:', testResult.insertedId ? 1 : 0);

    console.log('\n✅ Problem 39 (Session 8, Case 4: List Slicing) seeded successfully!');

  } catch (error) {
    console.error('Error seeding problem:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedProblem39()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
