import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem37() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem37 = {
      problem_id: 37,
      session_id: 8,
      title: 'Popping Items from a List',
      description: 'Use .pop() to remove and return an item by index (default is last item).',
      difficulty: 'Easy',
      tags: ['lists', 'pop', 'list-methods', 'advanced-operations'],
      case_overview: `Case 2: Popping Items from a List

Use .pop() to remove and return an item by index (default is last item).`,
      case_explanation: `Explanation:
● .pop() removes and returns the last item
● Useful for stack operations or temporary removal

Hints:
● Create a list called tools with three items: "wrench", "hammer", "screwdriver"
● Use the .pop() method to remove the last item and store it in a variable called removed_tool
● Print "Removed:" followed by the removed_tool variable
● Print "Updated List:" followed by the tools list
● .pop() both removes the item from the list AND returns it
● Without an argument, .pop() removes the last item
● You can also use .pop(index) to remove an item at a specific position`,
      case_code: `# Sample Example:
tools = ["wrench", "hammer", "screwdriver"]
removed_tool = tools.pop()
print("Removed:", removed_tool)
print("Updated List:", tools)

# Now you try:
# Create a list called tasks with three items: "Planning", "Execution", "Review"
# Use .pop() to remove the last item and store it in a variable called removed_task
# Print "Removed:" followed by the removed_task
# Print "Updated List:" followed by the tasks list`,
      expected_output: 'Removed: Review\nUpdated List: [\'Planning\', \'Execution\']',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCase37 = {
      problem_id: 37,
      case_number: 1,
      input: '',
      expected_output: 'Removed: Review\nUpdated List: [\'Planning\', \'Execution\']',
      is_hidden: false,
      created_at: new Date(),
    };

    const result = await problemsCollection.updateOne(
      { problem_id: 37 },
      { $set: problem37 },
      { upsert: true }
    );

    console.log('Problem 37 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 37 });
    const testResult = await testCasesCollection.insertOne(testCase37);
    console.log('Test cases inserted:', testResult.insertedId ? 1 : 0);

    console.log('\n✅ Problem 37 (Session 8, Case 2: Popping Items from a List) seeded successfully!');

  } catch (error) {
    console.error('Error seeding problem:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedProblem37()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
