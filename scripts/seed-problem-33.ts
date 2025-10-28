import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem33() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem33 = {
      problem_id: 33,
      session_id: 7,
      title: 'Removing Items from a List',
      description: 'Use .remove() to delete a specific item by value.',
      difficulty: 'Easy',
      tags: ['lists', 'remove', 'list-methods', 'data-structures'],
      case_overview: `Case 3: Removing Items from a List

Use .remove() to delete a specific item by value.`,
      case_explanation: `Explanation:
● .remove("item") deletes the item if it exists
● The list becomes ["cat", "rabbit"]

Hints:
● Create a list called animals with three items: "cat", "dog", "rabbit"
● Use the .remove() method to delete "dog" from the list
● Print the entire list to see the result
● The .remove() method modifies the original list
● Syntax: list_name.remove(item_to_delete)
● If the item doesn't exist, it will cause an error, so make sure the item is in the list`,
      case_code: `# Sample Example:
animals = ["cat", "dog", "rabbit"]
animals.remove("dog")
print(animals)

# Now you try:
# Create a list called tools with three items: "hammer", "wrench", "screwdriver"
# Use .remove() to delete "wrench" from the list
# Print the tools list`,
      expected_output: "['hammer', 'screwdriver']",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCase33 = {
      problem_id: 33,
      case_number: 1,
      input: '',
      expected_output: "['hammer', 'screwdriver']",
      is_hidden: false,
      created_at: new Date(),
    };

    const result = await problemsCollection.updateOne(
      { problem_id: 33 },
      { $set: problem33 },
      { upsert: true }
    );

    console.log('Problem 33 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 33 });
    const testResult = await testCasesCollection.insertOne(testCase33);
    console.log('Test cases inserted:', testResult.insertedId ? 1 : 0);

    console.log('\n✅ Problem 33 (Session 7, Case 3: Removing Items from a List) seeded successfully!');

  } catch (error) {
    console.error('Error seeding problem:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedProblem33()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
