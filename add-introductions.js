const { MongoClient } = require('mongodb');

(async () => {
  const client = new MongoClient('mongodb://localhost:27017');

  try {
    await client.connect();
    const db = client.db('code_runner');

    const levels = await db.collection('levels').find({ age_group: '11-14' }).toArray();

    console.log('Found', levels.length, 'levels');

    for (const level of levels) {
      console.log('\n Level:', level.level_number, '-', level.title);

      for (const session of level.sessions) {
        console.log('  Session', session.session_number, ':', session.title);
        console.log('    Session ID:', session.session_id);
        console.log('    Has intro:', !!session.introduction_content);

        // If session doesn't have introduction_content, add empty array
        if (!session.introduction_content || session.introduction_content.length === 0) {
          console.log('    -> Adding empty introduction_content');

          await db.collection('levels').updateOne(
            {
              _id: level._id,
              'sessions.session_id': session.session_id
            },
            {
              $set: {
                'sessions.$.introduction_content': [
                  { imageName: 'placeholder1.png', description: 'Concept 1 explanation' },
                  { imageName: 'placeholder2.png', description: 'Concept 2 explanation' },
                  { imageName: 'placeholder3.png', description: 'Concept 3 explanation' },
                  { imageName: 'placeholder4.png', description: 'Concept 4 explanation' },
                  { imageName: 'placeholder5.png', description: 'Concept 5 explanation' }
                ]
              }
            }
          );

          console.log('    -> Done!');
        }
      }
    }

    console.log('\n All sessions updated successfully!');

    await client.close();
  } catch (error) {
    console.error('Error:', error);
    await client.close();
    process.exit(1);
  }
})();
