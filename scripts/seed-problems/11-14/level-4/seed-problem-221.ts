import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem221() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 221: Level 4, Session 7, Case 4 - Truncating Mission Logs
    const problem221 = {
      problem_id: 221,
      session_id: 40, // Level 4, Session 7
      title: 'Truncating Mission Logs',
      description: 'Learn to cut files to a safe size using truncate() to preserve only essential data.',
      difficulty: 'Medium',
      question: `A file "galactic_log.txt" contains multiple log entries. Truncate the file to retain only the first two full log entries (approximately 50 bytes). Use r+ mode. Print "Log file truncated to safe size" after truncation. Then read and print the remaining content to confirm.`,      sample_input: '',
      sample_output: 'Log file truncated to safe size\nENGINE IGNITED\nNAV ONLINE',

      age_group: '11-14',
      level_number: 4,
      difficulty_level: 2,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['truncate()', 'file size control', 'data preservation', 'memory management', 'r+ mode'],
        estimated_time_minutes: 15
      },

      // Session-level content
      session_title: 'Session 7: File Position and Operations',

      // Case-specific content
      case_number: 4,
      case_title: 'Truncating Mission Logs',
      case_overview: `Sometimes, logs collect unnecessary or corrupted data. Using truncate(), cadets will learn how to cut the mission log to a safe byte size, preserving only confirmed entries. This is useful before data transmission, helping avoid overflow, corruption, or exposure of sensitive mission data.`,
      case_explanation: `truncate(n) cuts off data after byte n. It prevents corruption or overload, keeps logs clean for transfer, and helps simulate safe log transmission. This is critical for maintaining data integrity in space missions.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 221 if it exists
    await problemsCollection.deleteOne({ problem_id: 221 });
    await testCasesCollection.deleteMany({ problem_id: 221 });

    // Insert problem 221
    const problemResult = await problemsCollection.insertOne(problem221);
    console.log('Problem 221 inserted');

    // Test cases for Problem 221
    const testCases = [
      // Visible test cases
      {
        test_case_id: 2211,
        problem_id: 221,
        input: '',
        expected_output: 'Log file truncated to safe size\nENGINE IGNITED\nNAV ONLINE',
        is_hidden: false,
        weight: 10
      },
      {
        test_case_id: 2212,
        problem_id: 221,
        input: '',
        expected_output: 'Log file truncated to safe size\nENGINE IGNITED\nNAV ONLINE',
        is_hidden: false,
        weight: 10
      },
      // Hidden test cases
      {
        test_case_id: 2213,
        problem_id: 221,
        input: '',
        expected_output: 'Log file truncated to safe size\nENGINE IGNITED\nNAV ONLINE',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2214,
        problem_id: 221,
        input: '',
        expected_output: 'Log file truncated to safe size\nENGINE IGNITED\nNAV ONLINE',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2215,
        problem_id: 221,
        input: '',
        expected_output: 'Log file truncated to safe size\nENGINE IGNITED\nNAV ONLINE',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2216,
        problem_id: 221,
        input: '',
        expected_output: 'Log file truncated to safe size\nENGINE IGNITED\nNAV ONLINE',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2217,
        problem_id: 221,
        input: '',
        expected_output: 'Log file truncated to safe size\nENGINE IGNITED\nNAV ONLINE',
        is_hidden: true,
        weight: 16
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 221`);

    console.log('\n✅ Problem 221 (Level 4, Session 7, Case 4: Truncating Logs) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem221()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
