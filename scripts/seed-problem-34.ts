import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem34() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem34 = {
      problem_id: 34,
      session_id: 7,
      title: 'Sorting and Reversing a List',
      description: 'Use .sort() to arrange items in order and .reverse() to flip the list.',
      difficulty: 'Easy',
      tags: ['lists', 'sort', 'reverse', 'list-methods', 'data-structures'],
      case_overview: `Case 4: Sorting and Reversing a List

Use .sort() to arrange items in order and .reverse() to flip the list.`,
      case_explanation: `Explanation:
● .sort() arranges in ascending order: [65, 72, 88, 93]
● .reverse() flips it: [93, 88, 72, 65]

Hints:
● Create a list called scores with four numbers: 88, 72, 93, 65
● Use the .sort() method to arrange the list in ascending order
● Print the sorted list with the label "Sorted:"
● Use the .reverse() method to flip the order of the list
● Print the reversed list with the label "Reversed:"
● Both methods modify the original list
● .sort() arranges numbers from smallest to largest
● .reverse() flips the entire list order`,
      case_code: `# Sample Example:
scores = [88, 72, 93, 65]
scores.sort()
print("Sorted:", scores)
scores.reverse()
print("Reversed:", scores)

# Now you try:
# Create a list called temperatures with four values: 25, 18, 30, 22
# Use .sort() to arrange them in ascending order
# Print with label "Sorted:" followed by the list
# Use .reverse() to flip the order
# Print with label "Reversed:" followed by the list`,
      expected_output: 'Sorted: [18, 22, 25, 30]\nReversed: [30, 25, 22, 18]',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCase34 = {
      problem_id: 34,
      case_number: 1,
      input: '',
      expected_output: 'Sorted: [18, 22, 25, 30]\nReversed: [30, 25, 22, 18]',
      is_hidden: false,
      created_at: new Date(),
    };

    const result = await problemsCollection.updateOne(
      { problem_id: 34 },
      { $set: problem34 },
      { upsert: true }
    );

    console.log('Problem 34 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 34 });
    const testResult = await testCasesCollection.insertOne(testCase34);
    console.log('Test cases inserted:', testResult.insertedId ? 1 : 0);

    console.log('\n✅ Problem 34 (Session 7, Case 4: Sorting and Reversing a List) seeded successfully!');

  } catch (error) {
    console.error('Error seeding problem:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedProblem34()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
