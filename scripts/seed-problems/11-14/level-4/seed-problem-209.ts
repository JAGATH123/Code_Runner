import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem209() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 209: Level 4, Session 5, Case 4 - Modifying Mission Logs with r+ Mode
    const problem209 = {
      problem_id: 209,
      session_id: 38, // Level 4, Session 5
      title: 'Modifying Mission Logs with r+ Mode',
      description: 'Learn to read and update existing log entries using r+ mode for in-place file modifications.',
      difficulty: 'Medium',
      question: `Read a mission log file "mission_log.txt" that contains the entry "LAUNCHED" and update it to "COMPLETED" wherever it appears. Use r+ mode to read and write in the same operation. Print "Log status modified successfully" when done.

The file initially contains:
PREP CHECKED
IGNITION STARTED
LAUNCHED`,      sample_input: '',
      sample_output: 'Log status modified successfully',

      age_group: '11-14',
      level_number: 4,
      difficulty_level: 2,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['r+ mode', 'seek()', 'replace()', 'reading and writing', 'in-place modification'],
        estimated_time_minutes: 15
      },

      // Session-level content
      session_title: 'Session 5: File Handling',

      // Case-specific content
      case_number: 4,
      case_title: 'Modifying Mission Logs with r+ Mode',
      case_overview: `Cadets will modify existing mission logs using read-plus mode. They'll learn to search, update, and rewrite entries such as status changes or correction of log errors. This dual-mode handling prepares them for real-world scenarios where mission logs need to be updated without erasing previously stored data.`,
      case_explanation: `Use "r+" mode to allow both reading and writing. The seek(0) method moves the cursor to the start of the file before writing. This enables modifications to be made without starting from scratch, perfect for updating mission status or correcting errors.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 209 if it exists
    await problemsCollection.deleteOne({ problem_id: 209 });
    await testCasesCollection.deleteMany({ problem_id: 209 });

    // Insert problem 209
    const problemResult = await problemsCollection.insertOne(problem209);
    console.log('Problem 209 inserted');

    // Test cases for Problem 209
    const testCases = [
      // Visible test cases
      {
        test_case_id: 2091,
        problem_id: 209,
        input: '',
        expected_output: 'Log status modified successfully',
        is_hidden: false,
        weight: 10
      },
      {
        test_case_id: 2092,
        problem_id: 209,
        input: '',
        expected_output: 'Log status modified successfully',
        is_hidden: false,
        weight: 10
      },
      // Hidden test cases
      {
        test_case_id: 2093,
        problem_id: 209,
        input: '',
        expected_output: 'Log status modified successfully',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2094,
        problem_id: 209,
        input: '',
        expected_output: 'Log status modified successfully',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2095,
        problem_id: 209,
        input: '',
        expected_output: 'Log status modified successfully',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2096,
        problem_id: 209,
        input: '',
        expected_output: 'Log status modified successfully',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2097,
        problem_id: 209,
        input: '',
        expected_output: 'Log status modified successfully',
        is_hidden: true,
        weight: 16
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 209`);

    console.log('\n✅ Problem 209 (Level 4, Session 5, Case 4: Modifying Logs with r+ Mode) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem209()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
