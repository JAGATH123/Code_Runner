const { MongoClient } = require('mongodb');

(async () => {
  const client = new MongoClient('mongodb://localhost:27017');

  try {
    await client.connect();
    const db = client.db('code_runner');

    console.log('Checking sessions collection...');

    const sessions = await db.collection('sessions').find({}).sort({ session_id: 1 }).toArray();

    console.log(`Found ${sessions.length} sessions`);

    if (sessions.length === 0) {
      console.log('\nNo sessions found. You need to run seed scripts first!');
      await client.close();
      return;
    }

    const emptyIntroContent = [
      { imageName: 'placeholder1.png', description: 'Concept 1 explanation' },
      { imageName: 'placeholder2.png', description: 'Concept 2 explanation' },
      { imageName: 'placeholder3.png', description: 'Concept 3 explanation' },
      { imageName: 'placeholder4.png', description: 'Concept 4 explanation' },
      { imageName: 'placeholder5.png', description: 'Concept 5 explanation' }
    ];

    for (const session of sessions) {
      console.log(`\nSession ${session.session_id}: ${session.title}`);
      console.log(`  Has intro: ${!!session.introduction_content}`);

      if (!session.introduction_content || session.introduction_content.length === 0) {
        await db.collection('sessions').updateOne(
          { session_id: session.session_id },
          { $set: { introduction_content: emptyIntroContent } }
        );
        console.log('  ✅ Added empty introduction template');
      } else {
        console.log('  ✓ Already has introduction content');
      }
    }

    console.log('\n✅ All sessions updated successfully!');

    await client.close();
  } catch (error) {
    console.error('Error:', error);
    await client.close();
    process.exit(1);
  }
})();
