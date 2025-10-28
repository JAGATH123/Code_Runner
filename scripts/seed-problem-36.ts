import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem36() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem36 = {
      problem_id: 36,
      session_id: 8,
      title: 'Inserting Items at a Specific Position',
      description: 'Use .insert(index, item) to add an item at a specific position.',
      difficulty: 'Easy',
      tags: ['lists', 'insert', 'list-methods', 'advanced-operations'],
      case_overview: `Case 1: Inserting Items at a Specific Position

Use .insert(index, item) to add an item at a specific position.`,
      case_explanation: `Explanation:
● .insert() adds an item at the given index
● The item "Venus" is inserted at index 1
● Result: ["Mercury", "Venus", "Earth", "Mars"]

Hints:
● Create a list called planets with three items: "Mercury", "Earth", "Mars"
● Use the .insert() method to add "Venus" at index 1
● Print the entire list to see the result
● Syntax: list_name.insert(index, item)
● Unlike .append() which adds to the end, .insert() lets you choose the position
● Items at and after the index position shift to the right
● Index 1 means the item will be the second element (remember indexing starts at 0)`,
      case_code: `# Sample Example:
planets = ["Mercury", "Earth", "Mars"]
planets.insert(1, "Venus")
print(planets)

# Now you try:
# Create a list called missions with three items: "Launch", "Orbit", "Landing"
# Use .insert() to add "Navigation" at index 1
# Print the missions list`,
      expected_output: "['Launch', 'Navigation', 'Orbit', 'Landing']",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCase36 = {
      problem_id: 36,
      case_number: 1,
      input: '',
      expected_output: "['Launch', 'Navigation', 'Orbit', 'Landing']",
      is_hidden: false,
      created_at: new Date(),
    };

    const result = await problemsCollection.updateOne(
      { problem_id: 36 },
      { $set: problem36 },
      { upsert: true }
    );

    console.log('Problem 36 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 36 });
    const testResult = await testCasesCollection.insertOne(testCase36);
    console.log('Test cases inserted:', testResult.insertedId ? 1 : 0);

    console.log('\n✅ Problem 36 (Session 8, Case 1: Inserting Items at a Specific Position) seeded successfully!');

  } catch (error) {
    console.error('Error seeding problem:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedProblem36()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
