const { MongoClient } = require('mongodb');

(async () => {
  const client = new MongoClient('mongodb://localhost:27017');

  try {
    await client.connect();
    const db = client.db('code_runner');

    console.log('Checking collections...');
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));

    // Check problems collection
    const problems = await db.collection('problems').find({}).limit(5).toArray();
    console.log('\nSample problems:');
    problems.forEach(p => {
      console.log(`  Problem ${p.problem_id}: Session ${p.session_id} - ${p.title}`);
    });

    // Get unique session IDs
    const sessionIds = await db.collection('problems').distinct('session_id');
    console.log('\nUnique session IDs:', sessionIds.sort((a, b) => a - b));

    await client.close();
  } catch (error) {
    console.error('Error:', error);
    await client.close();
    process.exit(1);
  }
})();
