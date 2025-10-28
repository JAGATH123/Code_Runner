import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem35() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem35 = {
      problem_id: 35,
      session_id: 7,
      title: 'Finding Length and Checking Membership',
      description: 'Use len() to count items and in to check if an item exists in the list.',
      difficulty: 'Easy',
      tags: ['lists', 'len', 'membership', 'in-operator', 'final-task'],
      case_overview: `Case 5: Finding Length and Checking Membership (Final Task)

Use len() to count items and in to check if an item exists in the list.`,
      case_explanation: `Explanation:
● len(list) gives the number of items
● "item" in list returns True or False

Hints:
● Create a list called devices with three items: "laptop", "tablet", "phone"
● Use len() function to count the number of items in the list and print it
● Use the 'in' operator to check if "phone" is in the list and print the result (True/False)
● Use the 'in' operator to check if "camera" is in the list and print the result (True/False)
● len() is a built-in function, not a method, so use len(list_name)
● The 'in' operator syntax: "item" in list_name
● The output will be three lines: a number, then True, then False`,
      case_code: `# Sample Example:
devices = ["laptop", "tablet", "phone"]
print(len(devices))
print("phone" in devices)
print("camera" in devices)

# Now you try:
# Create a list called supplies with four items: "fuel", "oxygen", "water", "food"
# Print the length of the supplies list using len()
# Check if "oxygen" is in the supplies list and print the result
# Check if "battery" is in the supplies list and print the result`,
      expected_output: '4\nTrue\nFalse',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCase35 = {
      problem_id: 35,
      case_number: 1,
      input: '',
      expected_output: '4\nTrue\nFalse',
      is_hidden: false,
      created_at: new Date(),
    };

    const result = await problemsCollection.updateOne(
      { problem_id: 35 },
      { $set: problem35 },
      { upsert: true }
    );

    console.log('Problem 35 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 35 });
    const testResult = await testCasesCollection.insertOne(testCase35);
    console.log('Test cases inserted:', testResult.insertedId ? 1 : 0);

    console.log('\n✅ Problem 35 (Session 7, Case 5: Finding Length and Checking Membership) seeded successfully!');

  } catch (error) {
    console.error('Error seeding problem:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedProblem35()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
