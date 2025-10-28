const { MongoClient } = require('mongodb');

(async () => {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  const db = client.db('code_runner');

  const levels = await db.collection('levels').find({ age_group: '11-14' }).toArray();

  levels.forEach(level => {
    console.log('Level:', level.level_number);
    level.sessions.forEach(session => {
      console.log('  Session', session.session_number, ':', session.title);
      console.log('    Session ID:', session.session_id);
      console.log('    Has intro:', !!session.introduction_content);
    });
  });

  await client.close();
})();
