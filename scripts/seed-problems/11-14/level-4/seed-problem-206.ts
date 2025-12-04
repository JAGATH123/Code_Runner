import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem206() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 206: Level 4, Session 5, Case 1 - Writing Mission Logs to Text Files
    const problem206 = {
      problem_id: 206,
      session_id: 38, // Level 4, Session 5
      title: 'Writing Mission Logs to Text Files',
      description: 'Learn to create files and write structured mission data using write mode for logging launch sequences.',
      difficulty: 'Easy',
      question: `Create a program that writes 3 log entries for a mission launch sequence into a file called "mission_log.txt". The entries should be:
1. "PREP CHECKED"
2. "IGNITION STARTED"
3. "LAUNCHED"

Each entry should be on a new line. Print "Mission log created successfully" when done.`,

      compiler_comment: '# Write your code here\n',
      sample_input: '',
      sample_output: 'Mission log created successfully',

      age_group: '11-14',
      level_number: 4,
      difficulty_level: 1,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['write mode', 'file creation', 'open()', 'write()', 'mission logging', 'structured data'],
        estimated_time_minutes: 10
      },

      // Session-level content
      session_title: 'Session 5: File Handling',

      // Case-specific content
      case_number: 1,
      case_title: 'Writing Mission Logs to Text Files',
      case_overview: `Cadets will learn how to record mission events by writing structured data into a new text file. This technique is essential for logging launch sequences, system checks, and key milestones. By using write mode, they'll understand how files are created and how existing files are overwritten during mission initialization.`,
      case_explanation: `Use open() with "w" mode to create a new file or overwrite existing content. The write() method adds text data to the file. This is ideal for logging mission data during initialization. Remember to close the file or use the with statement for automatic closing.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 206 if it exists
    await problemsCollection.deleteOne({ problem_id: 206 });
    await testCasesCollection.deleteMany({ problem_id: 206 });

    // Insert problem 206
    const problemResult = await problemsCollection.insertOne(problem206);
    console.log('Problem 206 inserted');

    // Test cases for Problem 206
    const testCases = [
      // Visible test cases
      {
        test_case_id: 2061,
        problem_id: 206,
        input: '',
        expected_output: 'Mission log created successfully',
        is_hidden: false,
        weight: 10
      },
      {
        test_case_id: 2062,
        problem_id: 206,
        input: '',
        expected_output: 'Mission log created successfully',
        is_hidden: false,
        weight: 10
      },
      // Hidden test cases
      {
        test_case_id: 2063,
        problem_id: 206,
        input: '',
        expected_output: 'Mission log created successfully',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2064,
        problem_id: 206,
        input: '',
        expected_output: 'Mission log created successfully',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2065,
        problem_id: 206,
        input: '',
        expected_output: 'Mission log created successfully',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2066,
        problem_id: 206,
        input: '',
        expected_output: 'Mission log created successfully',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2067,
        problem_id: 206,
        input: '',
        expected_output: 'Mission log created successfully',
        is_hidden: true,
        weight: 16
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 206`);

    console.log('\n✅ Problem 206 (Level 4, Session 5, Case 1: Writing Mission Logs) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem206()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
