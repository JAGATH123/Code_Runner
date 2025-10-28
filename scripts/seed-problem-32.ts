import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem32() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem32 = {
      problem_id: 32,
      session_id: 7,
      title: 'Adding Items to a List',
      description: 'Use .append() to add a new item at the end of a list.',
      difficulty: 'Easy',
      tags: ['lists', 'append', 'list-methods', 'data-structures'],
      case_overview: `Case 2: Adding Items to a List

Use .append() to add a new item at the end of a list.`,
      case_explanation: `Explanation:
● .append(item) adds the item to the end of the list
● numbers becomes [1, 2, 3, 4]

Hints:
● Create a list called numbers with three values: 1, 2, 3
● Use the .append() method to add 4 to the end of the list
● Print the entire list to see the result
● The .append() method modifies the original list
● Syntax: list_name.append(new_item)`,
      case_code: `# Sample Example:
numbers = [1, 2, 3]
numbers.append(4)
print(numbers)

# Now you try:
# Create a list called crew with three items: "Alice", "Bob", "Charlie"
# Use .append() to add "Diana" to the list
# Print the crew list`,
      expected_output: "['Alice', 'Bob', 'Charlie', 'Diana']",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCase32 = {
      problem_id: 32,
      case_number: 1,
      input: '',
      expected_output: "['Alice', 'Bob', 'Charlie', 'Diana']",
      is_hidden: false,
      created_at: new Date(),
    };

    const result = await problemsCollection.updateOne(
      { problem_id: 32 },
      { $set: problem32 },
      { upsert: true }
    );

    console.log('Problem 32 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 32 });
    const testResult = await testCasesCollection.insertOne(testCase32);
    console.log('Test cases inserted:', testResult.insertedId ? 1 : 0);

    console.log('\n✅ Problem 32 (Session 7, Case 2: Adding Items to a List) seeded successfully!');

  } catch (error) {
    console.error('Error seeding problem:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedProblem32()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
