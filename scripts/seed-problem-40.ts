import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem40() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem40 = {
      problem_id: 40,
      session_id: 8,
      title: 'List Comprehension & Aggregates',
      description: 'Create a new list using a single line expression. Use min(), max(), and sum() for numerical data.',
      difficulty: 'Medium',
      tags: ['lists', 'list-comprehension', 'aggregates', 'min-max-sum', 'final-task'],
      case_overview: `Case 5: List Comprehension & Aggregates (Final Task)

Create a new list using a single line expression. Use min(), max(), and sum() for numerical data.`,
      case_explanation: `Explanation:
● [x**2 for x in range(1, 6)] creates [1, 4, 9, 16, 25]

Hints:
● Use list comprehension syntax: [expression for variable in range()]
● Create a list called squares using: [x**2 for x in range(1, 6)]
● This means: for each x from 1 to 5, calculate x**2 (x squared)
● Print the squares list
● Use min(squares) to find the smallest value and print "Min:" followed by the result
● Use max(squares) to find the largest value and print "Max:" followed by the result
● Use sum(squares) to add all values and print "Sum:" followed by the result
● List comprehension is a compact way to create lists
● range(1, 6) generates numbers 1, 2, 3, 4, 5 (not including 6)
● ** is the exponent operator (x**2 means x squared)`,
      case_code: `# Sample Example:
squares = [x**2 for x in range(1, 6)]
print(squares)
print("Min:", min(squares))
print("Max:", max(squares))
print("Sum:", sum(squares))

# Now you try:
# Create a list called cubes using list comprehension: [x**3 for x in range(1, 5)]
# This creates cubes of numbers 1 to 4
# Print the cubes list
# Print "Min:" followed by the minimum value
# Print "Max:" followed by the maximum value
# Print "Sum:" followed by the sum of all values`,
      expected_output: '[1, 8, 27, 64]\nMin: 1\nMax: 64\nSum: 100',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCase40 = {
      problem_id: 40,
      case_number: 1,
      input: '',
      expected_output: '[1, 8, 27, 64]\nMin: 1\nMax: 64\nSum: 100',
      is_hidden: false,
      created_at: new Date(),
    };

    const result = await problemsCollection.updateOne(
      { problem_id: 40 },
      { $set: problem40 },
      { upsert: true }
    );

    console.log('Problem 40 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 40 });
    const testResult = await testCasesCollection.insertOne(testCase40);
    console.log('Test cases inserted:', testResult.insertedId ? 1 : 0);

    console.log('\n✅ Problem 40 (Session 8, Case 5: List Comprehension & Aggregates) seeded successfully!');

  } catch (error) {
    console.error('Error seeding problem:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedProblem40()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
