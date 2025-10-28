import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem41() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('testcases');

    const problem41 = {
      problem_id: 41,
      session_id: 9,
      title: 'Basic For Loop over a List',
      description: 'Loop through a list of items using for.',
      difficulty: 'Easy',
      tags: ['loops', 'for-loop', 'iteration', 'lists'],
      case_overview: `Case 1: Basic For Loop over a List

Loop through a list of items using for.`,
      case_explanation: `Explanation:
● The loop goes through each element in the list planets
● On each iteration, it prints the name of the current planet

Hints:
● Create a list called planets with four items: "Mercury", "Venus", "Earth", "Mars"
● Use a for loop with syntax: for planet in planets:
● Inside the loop (indented by 4 spaces), print "Exploring:" followed by the planet variable
● The loop automatically iterates through each item in the list
● The variable 'planet' takes on each value from the list, one at a time
● Indentation is critical - the print statement must be indented to be inside the loop
● The output will have 4 lines, one for each planet`,
      case_code: `# Sample Example:
planets = ["Mercury", "Venus", "Earth", "Mars"]
for planet in planets:
    print("Exploring:", planet)

# Now you try:
# Create a list called missions with three items: "Apollo", "Artemis", "Voyager"
# Use a for loop to iterate through missions
# Inside the loop, print "Mission:" followed by the mission name`,
      expected_output: 'Mission: Apollo\nMission: Artemis\nMission: Voyager',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const testCase41 = {
      problem_id: 41,
      case_number: 1,
      input: '',
      expected_output: 'Mission: Apollo\nMission: Artemis\nMission: Voyager',
      is_hidden: false,
      created_at: new Date(),
    };

    const result = await problemsCollection.updateOne(
      { problem_id: 41 },
      { $set: problem41 },
      { upsert: true }
    );

    console.log('Problem 41 upserted:', result.upsertedId || 'Updated existing');

    await testCasesCollection.deleteMany({ problem_id: 41 });
    const testResult = await testCasesCollection.insertOne(testCase41);
    console.log('Test cases inserted:', testResult.insertedId ? 1 : 0);

    console.log('\n✅ Problem 41 (Session 9, Case 1: Basic For Loop over a List) seeded successfully!');

  } catch (error) {
    console.error('Error seeding problem:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedProblem41()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
