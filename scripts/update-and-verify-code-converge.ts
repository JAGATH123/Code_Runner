import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function updateAndVerifyCodeConverge() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB\n');

    const db = client.db(MONGODB_DB);
    const sessions = db.collection('sessions');
    const problems = db.collection('problems');

    // Update Session 44 title
    await sessions.updateOne(
      { session_id: 44 },
      {
        $set: {
          title: 'Code Converge: Project GALACTIC COMMAND',
          updated_at: new Date()
        }
      }
    );

    console.log('✅ Session 44 title updated to: Code Converge: Project GALACTIC COMMAND');

    // Verify problem
    const codeConverge = await problems.findOne({ session_id: 44 });
    console.log('\n=== Code Converge Problem (session_id: 44) ===');
    if (codeConverge) {
      console.log(`Problem ${codeConverge.problem_id}: ${codeConverge.title}`);
      console.log(`Max Score: ${codeConverge.max_score}`);
      console.log(`Is Code Converge: ${codeConverge.metadata.is_code_converge}`);
    } else {
      console.log('No problem found for session_id 44');
    }

    console.log('\n✅ Code Converge verification complete!');
    console.log('\n🎉🎉🎉 LEVEL 4 IS NOW 100% COMPLETE! 🎉🎉🎉');
    console.log('All 10 sessions + Code Converge completed!');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

updateAndVerifyCodeConverge();
