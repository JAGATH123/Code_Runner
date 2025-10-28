import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function updateSession8() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const sessionsCollection = db.collection('sessions');

    const session8Update = {
      session_id: 8,
      level_id: 1,
      session_number: 8,
      title: 'Advanced List Operations & List Methods',
      description: 'In Python, advanced list operations and built-in methods allow you to manipulate, organize, and analyze data more effectively. These include inserting at a position, popping elements, copying lists, slicing, list comprehensions, and using aggregate functions like min(), max(), and sum().',
      problem_ids: [36, 37, 38, 39, 40],
      metadata: {
        estimated_time_hours: 3,
        prerequisites: [7]
      },
      updated_at: new Date()
    };

    const result = await sessionsCollection.updateOne(
      { session_id: 8 },
      { $set: session8Update },
      { upsert: true }
    );

    console.log('Session 8 updated:', result.upsertedId || 'Updated existing');
    console.log('\n✅ Session 8 training protocol updated successfully!');

  } catch (error) {
    console.error('Error updating session:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the update function
updateSession8()
  .then(() => {
    console.log('\n🚀 Session update completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Session update failed:', error);
    process.exit(1);
  });
