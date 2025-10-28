import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function updateSession10() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const sessionsCollection = db.collection('sessions');

    const session10Update = {
      session_id: 10,
      level_id: 1,
      session_number: 10,
      title: 'Range Function',
      description: 'The range() function in Python is a built-in tool used to generate a sequence of numbers. It is commonly used in loops, especially for loops, to control how many times a block of code should be repeated. The basic form range(n) produces numbers from 0 up to, but not including, n. It can also be used with two or three arguments: range(start, stop) and range(start, stop, step), allowing for more precise control over the sequence.',
      problem_ids: [46, 47], // Will be updated as more problems are added
      metadata: {
        estimated_time_hours: 3,
        prerequisites: [9]
      },
      updated_at: new Date()
    };

    const result = await sessionsCollection.updateOne(
      { session_id: 10 },
      { $set: session10Update },
      { upsert: true }
    );

    console.log('Session 10 updated:', result.upsertedId || 'Updated existing');
    console.log('\n✅ Session 10 training protocol updated successfully!');

  } catch (error) {
    console.error('Error updating session:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the update function
updateSession10()
  .then(() => {
    console.log('\n🚀 Session update completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Session update failed:', error);
    process.exit(1);
  });
