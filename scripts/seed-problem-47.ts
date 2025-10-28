import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem47() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem47 = {
      problem_id: 47,
      session_id: 10,
      title: 'Range with Start and Stop',
      description: 'Use range(start, stop) to control where the sequence begins and ends.',
      difficulty: 'Easy',
      tags: ['range', 'for-loop', 'loops', 'start-stop'],
      case_overview: `Case 2: Range with Start and Stop

Use range(start, stop) to control where the sequence begins and ends.`,
      case_explanation: `Task:
● Change the range to start from 5 and stop at 10
● Print "Deck Clear" after each level
● Try print("Scan complete") outside the loop—what happens?

Hints:
● Use range(5, 10) to generate numbers from 5 to 9
● range(start, stop) includes start but excludes stop
● range(5, 10) produces: 5, 6, 7, 8, 9
● Inside the loop, print "Deck Clear" followed by the level number
● After the loop (no indentation), print "Scan complete"
● Code outside the loop executes only once, after all iterations finish
● Indentation: 4 spaces for inside the loop, 0 spaces for outside the loop
● The output will have 5 lines for the loop, then 1 line for "Scan complete"`,
      case_code: `# Sample Example:
for level in range(2, 7):
    print("Scanning Deck", level)

# Now you try:
# Use a for loop with range(5, 10) to iterate from 5 to 9
# Inside the loop, print "Deck Clear" followed by the level number
# Outside the loop (no indentation), print "Scan complete"`,
      expected_output: 'Deck Clear 5\nDeck Clear 6\nDeck Clear 7\nDeck Clear 8\nDeck Clear 9\nScan complete',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCase47 = {
      problem_id: 47,
      case_number: 1,
      input: '',
      expected_output: 'Deck Clear 5\nDeck Clear 6\nDeck Clear 7\nDeck Clear 8\nDeck Clear 9\nScan complete',
      is_hidden: false,
      created_at: new Date(),
    };

    const result = await problemsCollection.updateOne(
      { problem_id: 47 },
      { $set: problem47 },
      { upsert: true }
    );

    console.log('Problem 47 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 47 });
    const testResult = await testCasesCollection.insertOne(testCase47);
    console.log('Test cases inserted:', testResult.insertedId ? 1 : 0);

    console.log('\n✅ Problem 47 (Session 10, Case 2: Range with Start and Stop) seeded successfully!');

  } catch (error) {
    console.error('Error seeding problem:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedProblem47()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
