import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function updateSession7() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const sessionsCollection = db.collection('sessions');

    const session7Update = {
      session_id: 7,
      level_id: 1,
      session_number: 7,
      title: 'List Operations & Built-in Methods',
      description: 'In Python, a list is a collection of items stored in a single variable. You can store numbers, strings, or even other lists. Python provides many built-in methods to work with lists, such as adding, removing, sorting, and finding items. Let\'s explore how we can use these features!',
      problem_ids: [31, 32, 33, 34, 35],
      metadata: {
        estimated_time_hours: 3,
        prerequisites: [6]
      },
      updated_at: new Date()
    };

    const result = await sessionsCollection.updateOne(
      { session_id: 7 },
      { $set: session7Update },
      { upsert: true }
    );

    console.log('Session 7 updated:', result.upsertedId || 'Updated existing');
    console.log('\n✅ Session 7 training protocol updated successfully!');

  } catch (error) {
    console.error('Error updating session:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the update function
updateSession7()
  .then(() => {
    console.log('\n🚀 Session update completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Session update failed:', error);
    process.exit(1);
  });
