import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function checkSession5() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const sessionsCollection = db.collection('sessions');

    const session5 = await sessionsCollection.findOne({ session_id: 5 });

    console.log('\n=== Session 5 Data ===');
    console.log('Session ID:', session5?.session_id);
    console.log('Title:', session5?.title);
    console.log('Has introduction_content:', !!session5?.introduction_content);
    if (session5?.introduction_content) {
      console.log('Introduction content preview:', session5.introduction_content.substring(0, 100) + '...');
    } else {
      console.log('⚠️  NO INTRODUCTION CONTENT FOUND!');
    }

  } catch (error) {
    console.error('Error checking session:', error);
    throw error;
  } finally {
    await client.close();
    console.log('\nMongoDB connection closed');
  }
}

checkSession5()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });
