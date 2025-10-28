import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function removeSessionIntroFromDB() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');

    // Remove session_introduction field from all problems
    const result = await problemsCollection.updateMany(
      {}, // Match all documents
      { $unset: { session_introduction: "" } } // Remove the field
    );

    console.log(`\n✅ Removed session_introduction from ${result.modifiedCount} problems`);

    // Verify by checking a few problems
    const sampleProblems = await problemsCollection.find(
      { problem_id: { $in: [21, 22, 26, 31] } },
      { projection: { problem_id: 1, title: 1, session_introduction: 1 } }
    ).toArray();

    console.log('\n📊 Sample verification:');
    sampleProblems.forEach(prob => {
      const hasIntro = prob.session_introduction ? '❌ STILL HAS' : '✅ REMOVED';
      console.log(`   Problem ${prob.problem_id}: ${hasIntro}`);
    });

  } catch (error) {
    console.error('Error removing session_introduction:', error);
    throw error;
  } finally {
    await client.close();
    console.log('\nMongoDB connection closed');
  }
}

removeSessionIntroFromDB()
  .then(() => {
    console.log('\n🚀 Database cleanup completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database cleanup failed:', error);
    process.exit(1);
  });
