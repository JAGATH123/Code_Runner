import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem38() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem38 = {
      problem_id: 38,
      session_id: 8,
      title: 'Copying a List',
      description: 'Use .copy() to create a new copy of an existing list.',
      difficulty: 'Easy',
      tags: ['lists', 'copy', 'list-methods', 'advanced-operations'],
      case_overview: `Case 3: Copying a List

Use .copy() to create a new copy of an existing list.`,
      case_explanation: `Explanation:
● Changes to the copy don't affect the original list

Hints:
● Create a list called original with three values: 10, 20, 30
● Use the .copy() method to create a duplicate of the original list
● Store the copy in a variable called duplicate
● Use .append() to add 40 to the duplicate list
● Print "Original:" followed by the original list
● Print "Duplicate:" followed by the duplicate list
● The .copy() method creates an independent copy
● Modifying the copy does NOT change the original
● This is different from just using = which creates a reference, not a copy`,
      case_code: `# Sample Example:
original = [10, 20, 30]
duplicate = original.copy()
duplicate.append(40)
print("Original:", original)
print("Duplicate:", duplicate)

# Now you try:
# Create a list called base_config with three items: "mode1", "mode2", "mode3"
# Use .copy() to create a copy called custom_config
# Use .append() to add "mode4" to custom_config
# Print "Original:" followed by base_config
# Print "Duplicate:" followed by custom_config`,
      expected_output: 'Original: [\'mode1\', \'mode2\', \'mode3\']\nDuplicate: [\'mode1\', \'mode2\', \'mode3\', \'mode4\']',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCase38 = {
      problem_id: 38,
      case_number: 1,
      input: '',
      expected_output: 'Original: [\'mode1\', \'mode2\', \'mode3\']\nDuplicate: [\'mode1\', \'mode2\', \'mode3\', \'mode4\']',
      is_hidden: false,
      created_at: new Date(),
    };

    const result = await problemsCollection.updateOne(
      { problem_id: 38 },
      { $set: problem38 },
      { upsert: true }
    );

    console.log('Problem 38 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 38 });
    const testResult = await testCasesCollection.insertOne(testCase38);
    console.log('Test cases inserted:', testResult.insertedId ? 1 : 0);

    console.log('\n✅ Problem 38 (Session 8, Case 3: Copying a List) seeded successfully!');

  } catch (error) {
    console.error('Error seeding problem:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedProblem38()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
