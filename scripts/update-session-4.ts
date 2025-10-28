import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function updateSession4() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const sessionsCollection = db.collection('sessions');

    // Update Session 4 with Operators content
    const session4Update = {
      session_id: 4,
      level_id: 1,
      session_number: 4,
      title: 'Understanding Operators in Python (Arithmetic, Assignment, and Logical Operators)',
      description: 'Operators are unique symbols in Python that let you work with variables and values. Like buttons on a mission control panel, they are vital tools that support calculations, decision-making, and controlling your code flow. Master arithmetic, assignment, and logical operators to power your programs.',
      problem_ids: [16, 17, 18, 19, 20],
      metadata: {
        estimated_time_hours: 3,
        prerequisites: [3]
      },
      updated_at: new Date()
    };

    const result = await sessionsCollection.updateOne(
      { session_id: 4 },
      { $set: session4Update }
    );

    console.log('Session 4 updated:', result.modifiedCount > 0 ? 'Success' : 'No changes needed');

    console.log('\n✅ Session 4 training protocol updated successfully!');
    console.log('Title:', session4Update.title);
    console.log('Description:', session4Update.description);

  } catch (error) {
    console.error('Error updating session:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the update function
updateSession4()
  .then(() => {
    console.log('\n🚀 Session update completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Session update failed:', error);
    process.exit(1);
  });
