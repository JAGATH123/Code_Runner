import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem223() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 223: Level 4, Session 7, Case 6 - Galactic Log Keeper – Navigating Mission Data
    const problem223 = {
      problem_id: 223,
      session_id: 40, // Level 4, Session 7
      title: 'Galactic Log Keeper – Navigating Mission Data',
      description: 'Build a comprehensive mission chronicle system using all file position and operation functions.',
      difficulty: 'Hard',
      question: `Build the Mission Chronicle System - a secure vault for spacecraft diagnostics where the crew scrubs back to the moment VORAX-9 first pulsed stable. They need precise cursor jumps to navigate mission data with random-access navigation to jump to key offsets and extract exact repair windows.

Complete 5 steps:

Step 1: Initiate and Structure the Chronicle - Create "chronicle_log.txt" and add 5 log entries: "SYSTEM BOOT", "DIAGNOSTICS PASS", "ENGINE ONLINE", "VORAX-9 STABLE", "SHIELDS ACTIVE". After each write(), use tell() to print the byte position in format "Position after [entry]: [bytes]"

Step 2: Access Targeted Entries with seek() - Reopen in read mode and use seek() to jump to the byte position of the third entry (noted from Step 1). Use readline() to print that entry in format "Targeted entry: [content]"

Step 3: Read Logs as a Stream with next() - Reopen the file and use next() to read line-by-line. Print only the second and fourth entries in format "Entry 2: [content]" and "Entry 4: [content]"

Step 4: Truncate After a Fault Event - Open in r+ mode and truncate the file to preserve only the first 3 entries. Print "Log truncated to safe entries"

Step 5: Confirm File Readiness and Seal the Vault - Append final entry "CHRONICLE SEALED - READY FOR TRANSMISSION". Print the file's name and encoding. Print "Mission Chronicle finalized"`,      sample_input: '',
      sample_output: 'Position after SYSTEM BOOT: 12\nPosition after DIAGNOSTICS PASS: 29\nPosition after ENGINE ONLINE: 43\nPosition after VORAX-9 STABLE: 59\nPosition after SHIELDS ACTIVE: 75\nTargeted entry: ENGINE ONLINE\nEntry 2: DIAGNOSTICS PASS\nEntry 4: VORAX-9 STABLE\nLog truncated to safe entries\nFile Name: chronicle_log.txt\nEncoding: utf-8\nMission Chronicle finalized',

      age_group: '11-14',
      level_number: 4,
      difficulty_level: 3,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['tell()', 'seek()', 'next()', 'truncate()', 'file.name', 'file.encoding', 'comprehensive file operations', 'random access navigation'],
        estimated_time_minutes: 35
      },

      // Session-level content
      session_title: 'Session 7: File Position and Operations',

      // Case-specific content
      case_number: 6,
      case_title: 'Galactic Log Keeper – Navigating Mission Data',
      case_overview: `Cadets become Mission Data Engineers, building the Mission Chronicle System, a secure vault to log and manage all critical spacecraft diagnostics, events, and interstellar messages. Their task is to ensure data is stored in structured form, navigable in real time, and free from corruption—ready for transmission to Galactic HQ.`,
      case_explanation: `Implement 5 comprehensive steps combining all file position and operation concepts: Track positions with tell(), navigate with seek(), stream with next(), preserve data with truncate(), and verify metadata. This system demonstrates complete mastery of file position control for mission-critical data management.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 223 if it exists
    await problemsCollection.deleteOne({ problem_id: 223 });
    await testCasesCollection.deleteMany({ problem_id: 223 });

    // Insert problem 223
    const problemResult = await problemsCollection.insertOne(problem223);
    console.log('Problem 223 inserted');

    // Test cases for Problem 223 (7 test cases)
    const testCases = [
      // Visible test case
      {
        test_case_id: 2231,
        problem_id: 223,
        input: '',
        expected_output: 'Position after SYSTEM BOOT: 12\nPosition after DIAGNOSTICS PASS: 29\nPosition after ENGINE ONLINE: 43\nPosition after VORAX-9 STABLE: 59\nPosition after SHIELDS ACTIVE: 75\nTargeted entry: ENGINE ONLINE\nEntry 2: DIAGNOSTICS PASS\nEntry 4: VORAX-9 STABLE\nLog truncated to safe entries\nFile Name: chronicle_log.txt\nEncoding: utf-8\nMission Chronicle finalized',
        is_hidden: false,
        weight: 15
      },
      // Hidden test cases
      {
        test_case_id: 2232,
        problem_id: 223,
        input: '',
        expected_output: 'Position after SYSTEM BOOT: 12\nPosition after DIAGNOSTICS PASS: 29\nPosition after ENGINE ONLINE: 43\nPosition after VORAX-9 STABLE: 59\nPosition after SHIELDS ACTIVE: 75\nTargeted entry: ENGINE ONLINE\nEntry 2: DIAGNOSTICS PASS\nEntry 4: VORAX-9 STABLE\nLog truncated to safe entries\nFile Name: chronicle_log.txt\nEncoding: utf-8\nMission Chronicle finalized',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 2233,
        problem_id: 223,
        input: '',
        expected_output: 'Position after SYSTEM BOOT: 12\nPosition after DIAGNOSTICS PASS: 29\nPosition after ENGINE ONLINE: 43\nPosition after VORAX-9 STABLE: 59\nPosition after SHIELDS ACTIVE: 75\nTargeted entry: ENGINE ONLINE\nEntry 2: DIAGNOSTICS PASS\nEntry 4: VORAX-9 STABLE\nLog truncated to safe entries\nFile Name: chronicle_log.txt\nEncoding: utf-8\nMission Chronicle finalized',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 2234,
        problem_id: 223,
        input: '',
        expected_output: 'Position after SYSTEM BOOT: 12\nPosition after DIAGNOSTICS PASS: 29\nPosition after ENGINE ONLINE: 43\nPosition after VORAX-9 STABLE: 59\nPosition after SHIELDS ACTIVE: 75\nTargeted entry: ENGINE ONLINE\nEntry 2: DIAGNOSTICS PASS\nEntry 4: VORAX-9 STABLE\nLog truncated to safe entries\nFile Name: chronicle_log.txt\nEncoding: utf-8\nMission Chronicle finalized',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 2235,
        problem_id: 223,
        input: '',
        expected_output: 'Position after SYSTEM BOOT: 12\nPosition after DIAGNOSTICS PASS: 29\nPosition after ENGINE ONLINE: 43\nPosition after VORAX-9 STABLE: 59\nPosition after SHIELDS ACTIVE: 75\nTargeted entry: ENGINE ONLINE\nEntry 2: DIAGNOSTICS PASS\nEntry 4: VORAX-9 STABLE\nLog truncated to safe entries\nFile Name: chronicle_log.txt\nEncoding: utf-8\nMission Chronicle finalized',
        is_hidden: true,
        weight: 10
      },
      {
        test_case_id: 2236,
        problem_id: 223,
        input: '',
        expected_output: 'Position after SYSTEM BOOT: 12\nPosition after DIAGNOSTICS PASS: 29\nPosition after ENGINE ONLINE: 43\nPosition after VORAX-9 STABLE: 59\nPosition after SHIELDS ACTIVE: 75\nTargeted entry: ENGINE ONLINE\nEntry 2: DIAGNOSTICS PASS\nEntry 4: VORAX-9 STABLE\nLog truncated to safe entries\nFile Name: chronicle_log.txt\nEncoding: utf-8\nMission Chronicle finalized',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 2237,
        problem_id: 223,
        input: '',
        expected_output: 'Position after SYSTEM BOOT: 12\nPosition after DIAGNOSTICS PASS: 29\nPosition after ENGINE ONLINE: 43\nPosition after VORAX-9 STABLE: 59\nPosition after SHIELDS ACTIVE: 75\nTargeted entry: ENGINE ONLINE\nEntry 2: DIAGNOSTICS PASS\nEntry 4: VORAX-9 STABLE\nLog truncated to safe entries\nFile Name: chronicle_log.txt\nEncoding: utf-8\nMission Chronicle finalized',
        is_hidden: true,
        weight: 15
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 223`);

    console.log('\n✅ Problem 223 (Level 4, Session 7, Case 6: Galactic Log Keeper) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem223()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
