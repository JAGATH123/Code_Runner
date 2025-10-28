import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function updateSession9() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const sessionsCollection = db.collection('sessions');

    const session9Update = {
      session_id: 9,
      level_id: 1,
      session_number: 9,
      title: 'Loops in Python (For Loop)',
      description: 'In Python, the for loop is used to iterate over a sequence such as a list, tuple, dictionary, string, or a range. It allows you to execute a block of code multiple times, once for each item in the sequence.',
      problem_ids: [41, 42, 43, 44, 45],
      metadata: {
        estimated_time_hours: 3,
        prerequisites: [8]
      },
      updated_at: new Date()
    };

    const result = await sessionsCollection.updateOne(
      { session_id: 9 },
      { $set: session9Update },
      { upsert: true }
    );

    console.log('Session 9 updated:', result.upsertedId || 'Updated existing');
    console.log('\n✅ Session 9 training protocol updated successfully!');

  } catch (error) {
    console.error('Error updating session:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the update function
updateSession9()
  .then(() => {
    console.log('\n🚀 Session update completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Session update failed:', error);
    process.exit(1);
  });
