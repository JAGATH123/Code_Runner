import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function updateSession6() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const sessionsCollection = db.collection('sessions');

    const session6Update = {
      session_id: 6,
      level_id: 1,
      session_number: 6,
      title: 'Nested If-Else Statements',
      description: 'Nested if-else statements are advanced decision-making tools in Python. Like layers of security checks in a mission control system, they help your program evaluate multiple conditions step-by-step before taking action. These structures are critical when decisions depend on more than one factor—such as checking fuel, oxygen, system readiness, and external weather conditions before launch.',
      problem_ids: [26, 27, 28, 29, 30],
      metadata: {
        estimated_time_hours: 3,
        prerequisites: [5]
      },
      updated_at: new Date()
    };

    const result = await sessionsCollection.updateOne(
      { session_id: 6 },
      { $set: session6Update },
      { upsert: true }
    );

    console.log('Session 6 updated:', result.upsertedId || 'Updated existing');
    console.log('\n✅ Session 6 training protocol updated successfully!');

  } catch (error) {
    console.error('Error updating session:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the update function
updateSession6()
  .then(() => {
    console.log('\n🚀 Session update completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Session update failed:', error);
    process.exit(1);
  });
