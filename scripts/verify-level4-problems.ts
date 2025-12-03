import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function verifyProblems() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const levelsCollection = db.collection('levels');
    const sessionsCollection = db.collection('sessions');

    // Check for Level 4 record
    const level4 = await levelsCollection.findOne({ age_group: '11-14', level_number: 4 });
    console.log('\n=== Level 4 Record ===');
    if (level4) {
      console.log(`✅ Level 4 exists: ${level4.title} (Level ID: ${level4.level_id})`);
    } else {
      console.log('❌ Level 4 NOT FOUND - This is the problem!');
    }

    // Check for Session 34 record
    const session34 = await sessionsCollection.findOne({ session_id: 34 });
    console.log('\n=== Session 34 Record ===');
    if (session34) {
      console.log(`Session 34 exists: ${session34.title} (Level ID: ${session34.level_id})`);

      // Fix if session's level_id doesn't match level 4
      if (level4 && session34.level_id !== level4.level_id) {
        console.log(`⚠️  WARNING: Session 34 is linked to level_id ${session34.level_id}, but problems are for Level 4!`);
        console.log(`🔧 Fixing: Updating Session 34 level_id from ${session34.level_id} to ${level4.level_id}...`);

        await sessionsCollection.updateOne(
          { session_id: 34 },
          {
            $set: {
              level_id: level4.level_id,
              title: 'Session 1: Error Detection and Exception Resolution',
              session_number: 1,
              updated_at: new Date()
            }
          }
        );
        console.log('✅ Session 34 updated successfully!');
      } else if (level4 && session34.level_id === level4.level_id) {
        console.log('✅ Session 34 is correctly linked to Level 4!');
      }
    } else {
      console.log('❌ Session 34 NOT FOUND - This is the problem!');
    }

    // Check all sessions
    const allLevel4Sessions = await sessionsCollection.find({ level_id: 4 }).sort({ session_id: 1 }).toArray();
    console.log(`\n=== All Sessions for Level 4 ===`);
    console.log(`Found ${allLevel4Sessions.length} sessions:\n`);
    allLevel4Sessions.forEach(s => {
      console.log(`  Session ${s.session_id}: ${s.title} (Session Number: ${s.session_number})`);
    });

    // Find all Level 4, Session 1 problems
    const problems = await problemsCollection
      .find({ session_id: 34, level_number: 4 })
      .sort({ problem_id: 1 })
      .toArray();

    console.log(`\n=== Level 4 Problems ===`);
    console.log(`Found ${problems.length} Level 4, Session 1 problems:\n`);

    problems.forEach(problem => {
      console.log(`Problem ${problem.problem_id}: ${problem.title}`);
      console.log(`  Session ID: ${problem.session_id}`);
      console.log(`  Case Number: ${problem.case_number}`);
      console.log(`  Difficulty: ${problem.difficulty}`);
      console.log('');
    });

  } catch (error) {
    console.error('Error verifying problems:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

verifyProblems();
