import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem205() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 205: Level 4, Session 4, Case 6 - Cosmic Data Vault – Archiving Mission Logs
    const problem205 = {
      problem_id: 205,
      session_id: 37, // Level 4, Session 4
      title: 'Cosmic Data Vault – Archiving Mission Logs for Deep-Space Exploration',
      description: 'Build a comprehensive fault-free logging system using all file handling basics to archive mission logs permanently.',
      difficulty: 'Hard',
      question: `Welcome to the Cosmic Data Vault! You are the Data Archivist responsible for building a fault-free logging system. During repair operations, Astra orders a permanent log of every attempt with time-stamps so nothing is lost if the core blinks.

Your spacecraft must:
- Log messages into mission_log.txt
- Retrieve logs for analysis
- Add new entries without removing old ones
- Display all mission history cleanly

Complete 4 steps:

Step 1: Create Mission Log File - Create mission_log.txt and write "Mission started successfully." using write mode.

Step 2: Append System Updates - Add "Oxygen levels stable" and "Engines checked" to the file without deleting the first message using append mode with \\n.

Step 3: Read All Mission Logs - Open the file in read mode and print all updates saved so far using the with statement.

Step 4: Add User-Entered Logs - Take user input for a new log message, append it to the file, and print "Log saved!" after writing.`,

      compiler_comment: '# Write your code here\n',
      sample_input: 'Solar panels deployed',
      sample_output: 'Mission log created\nSystem updates appended\nMission started successfully.\nOxygen levels stable\nEngines checked\nLog saved!',

      age_group: '11-14',
      level_number: 4,
      difficulty_level: 3,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['comprehensive file handling', 'write mode', 'append mode', 'read mode', 'with statement', 'user input', 'time-stamped logs', 'data persistence'],
        estimated_time_minutes: 35
      },

      // Session-level content
      session_title: 'Session 4: Python File Handling Basics',

      // Case-specific content
      case_number: 6,
      case_title: 'Cosmic Data Vault – Archiving Mission Logs for Deep-Space Exploration',
      case_overview: `A comprehensive mission logging system that combines all file handling techniques: creating files with write mode, appending updates without data loss, reading logs for analysis, and accepting user-entered logs. Creates time-stamped permanent records for deep-space repair operations.`,
      case_explanation: `Implement 4 interconnected steps: Create mission_log.txt with opening message, append system updates with newlines, read and display all logs using with statement, accept user input and append to log file. Demonstrates complete file handling mastery for mission-critical data archival.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 205 if it exists
    await problemsCollection.deleteOne({ problem_id: 205 });
    await testCasesCollection.deleteMany({ problem_id: 205 });

    // Insert problem 205
    const problemResult = await problemsCollection.insertOne(problem205);
    console.log('Problem 205 inserted');

    // Test cases for Problem 205 (7 test cases)
    const testCases = [
      // Visible test case
      {
        test_case_id: 2051,
        problem_id: 205,
        input: 'Solar panels deployed',
        expected_output: 'Mission log created\nSystem updates appended\nMission started successfully.\nOxygen levels stable\nEngines checked\nLog saved!',
        is_hidden: false,
        weight: 15
      },
      // Hidden test cases
      {
        test_case_id: 2052,
        problem_id: 205,
        input: 'Navigation systems online',
        expected_output: 'Mission log created\nSystem updates appended\nMission started successfully.\nOxygen levels stable\nEngines checked\nLog saved!',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 2053,
        problem_id: 205,
        input: 'Communication restored',
        expected_output: 'Mission log created\nSystem updates appended\nMission started successfully.\nOxygen levels stable\nEngines checked\nLog saved!',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 2054,
        problem_id: 205,
        input: 'Life support functional',
        expected_output: 'Mission log created\nSystem updates appended\nMission started successfully.\nOxygen levels stable\nEngines checked\nLog saved!',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 2055,
        problem_id: 205,
        input: 'Shields activated',
        expected_output: 'Mission log created\nSystem updates appended\nMission started successfully.\nOxygen levels stable\nEngines checked\nLog saved!',
        is_hidden: true,
        weight: 10
      },
      {
        test_case_id: 2056,
        problem_id: 205,
        input: 'Thrusters calibrated',
        expected_output: 'Mission log created\nSystem updates appended\nMission started successfully.\nOxygen levels stable\nEngines checked\nLog saved!',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 2057,
        problem_id: 205,
        input: 'Sensors initialized',
        expected_output: 'Mission log created\nSystem updates appended\nMission started successfully.\nOxygen levels stable\nEngines checked\nLog saved!',
        is_hidden: true,
        weight: 15
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 205`);

    console.log('\n✅ Problem 205 (Level 4, Session 4, Case 6: Cosmic Data Vault) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem205()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
