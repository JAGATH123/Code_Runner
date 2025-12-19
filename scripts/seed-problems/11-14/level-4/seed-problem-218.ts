import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem218() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 218: Level 4, Session 7, Case 1 - Locating the Cursor with tell()
    const problem218 = {
      problem_id: 218,
      session_id: 40, // Level 4, Session 7
      title: 'Locating the Cursor with tell()',
      description: 'Learn to track file pointer position using tell() to monitor where data is written in the log.',
      difficulty: 'Easy',
      question: `Write three new log entries to "galactic_log.txt" and track the file pointer position after each entry:
1. "ENGINE IGNITED"
2. "NAV ONLINE"
3. "CABIN SEALED"

After writing each entry on a new line, print the position in format: "Position after [entry name]: [byte position]"`,      sample_input: '',
      sample_output: 'Position after ENGINE IGNITED: 15\nPosition after NAV ONLINE: 26\nPosition after CABIN SEALED: 39',

      age_group: '11-14',
      level_number: 4,
      difficulty_level: 1,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['tell()', 'file pointer position', 'byte tracking', 'cursor location', 'write mode'],
        estimated_time_minutes: 10
      },

      // Session-level content
      session_title: 'Session 7: File Position and Operations',

      // Case-specific content
      case_number: 1,
      case_title: 'Locating the Cursor with tell()',
      case_overview: `During space missions, it's important to know exactly where each entry is written in the mission log. Cadets will use the tell() function to track the position of the file pointer after each entry is added. This allows them to monitor log growth and plan for precise edits or analysis later.`,
      case_explanation: `tell() gives the current byte location in the file. It's useful for tracking where data ends, helps debug and manage memory, and supports later navigation with seek(). This is essential for monitoring log file structure.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 218 if it exists
    await problemsCollection.deleteOne({ problem_id: 218 });
    await testCasesCollection.deleteMany({ problem_id: 218 });

    // Insert problem 218
    const problemResult = await problemsCollection.insertOne(problem218);
    console.log('Problem 218 inserted');

    // Test cases for Problem 218
    const testCases = [
      // Visible test cases
      {
        test_case_id: 2181,
        problem_id: 218,
        input: '',
        expected_output: 'Position after ENGINE IGNITED: 15\nPosition after NAV ONLINE: 26\nPosition after CABIN SEALED: 39',
        is_hidden: false,
        weight: 10
      },
      {
        test_case_id: 2182,
        problem_id: 218,
        input: '',
        expected_output: 'Position after ENGINE IGNITED: 15\nPosition after NAV ONLINE: 26\nPosition after CABIN SEALED: 39',
        is_hidden: false,
        weight: 10
      },
      // Hidden test cases
      {
        test_case_id: 2183,
        problem_id: 218,
        input: '',
        expected_output: 'Position after ENGINE IGNITED: 15\nPosition after NAV ONLINE: 26\nPosition after CABIN SEALED: 39',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2184,
        problem_id: 218,
        input: '',
        expected_output: 'Position after ENGINE IGNITED: 15\nPosition after NAV ONLINE: 26\nPosition after CABIN SEALED: 39',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2185,
        problem_id: 218,
        input: '',
        expected_output: 'Position after ENGINE IGNITED: 15\nPosition after NAV ONLINE: 26\nPosition after CABIN SEALED: 39',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2186,
        problem_id: 218,
        input: '',
        expected_output: 'Position after ENGINE IGNITED: 15\nPosition after NAV ONLINE: 26\nPosition after CABIN SEALED: 39',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2187,
        problem_id: 218,
        input: '',
        expected_output: 'Position after ENGINE IGNITED: 15\nPosition after NAV ONLINE: 26\nPosition after CABIN SEALED: 39',
        is_hidden: true,
        weight: 16
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 218`);

    console.log('\n✅ Problem 218 (Level 4, Session 7, Case 1: Locating with tell()) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem218()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
