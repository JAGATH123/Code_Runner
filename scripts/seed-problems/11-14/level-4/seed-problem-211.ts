import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem211() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 211: Level 4, Session 5, Case 6 - Galactic Data Archives
    const problem211 = {
      problem_id: 211,
      session_id: 38, // Level 4, Session 5
      title: 'Galactic Data Archives – Building the Space Mission Log Core',
      description: 'Build a comprehensive logging system using all file handling modes to store and retrieve mission data.',
      difficulty: 'Hard',
      question: `Build a comprehensive Galactic Data Archives system that logs mission data using both text and binary files. The team reviews earlier trials and loads binary sensor frames from the relay buffer. Create a dual-mode logger that appends textual summaries and stores raw binary payloads for later replay.

Complete 5 steps:

Step 1: Initialize Mission Log (Write Mode) - Create "galactic_archive.txt" and write the header "=== MISSION START ===" followed by "Initial system check: PASSED" on a new line. Print "Archive initialized"

Step 2: Log Mid-Mission Events (Append Mode) - Append these three events to the file: "ENGINES IGNITED", "NAVIGATION STABLE", "SHIELDS ACTIVE" (each on a new line). Print "Mission events logged"

Step 3: Add Timestamped Entry - Import datetime module and append a timestamped entry in format: "TIMESTAMP: [current time in HH:MM:SS format] - STATUS UPDATE". Print "Timestamped entry added"

Step 4: Modify an Entry (r+ Mode) - Read the file, replace "NAVIGATION STABLE" with "NAVIGATION FAILED", write the updated content back. Print "Log entry modified"

Step 5: Log Binary Sensor Data - Write binary sensor data b"SENSOR_RAW: TEMP=22 RAD=0.5" to "sensor_archive.bin", read it back, and print the decoded content. Print "Binary telemetry archived"`,

      compiler_comment: '# Write your code here\n',
      sample_input: '',
      sample_output: 'Archive initialized\nMission events logged\nTimestamped entry added\nLog entry modified\nBinary telemetry archived\nSENSOR_RAW: TEMP=22 RAD=0.5',

      age_group: '11-14',
      level_number: 4,
      difficulty_level: 3,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['comprehensive file handling', 'write mode', 'append mode', 'r+ mode', 'binary modes', 'timestamps', 'datetime module', 'dual-format logging'],
        estimated_time_minutes: 35
      },

      // Session-level content
      session_title: 'Session 5: File Handling',

      // Case-specific content
      case_number: 6,
      case_title: 'Galactic Data Archives – Building the Space Mission Log Core',
      case_overview: `Cadets become data engineers aboard an interstellar fleet, designing the Galactic Data Archives—a secure system that logs, updates, and retrieves mission data using both text and binary files. From launch sequences to sensor telemetry, this archive ensures no critical information is lost during space operations.`,
      case_explanation: `Implement 5 interconnected steps combining all file handling concepts: Initialize logs with write mode, append mission events dynamically, add timestamps using datetime module, modify entries with r+ mode, and store binary sensor data. This comprehensive system demonstrates mastery of text and binary file operations for mission-critical data management.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 211 if it exists
    await problemsCollection.deleteOne({ problem_id: 211 });
    await testCasesCollection.deleteMany({ problem_id: 211 });

    // Insert problem 211
    const problemResult = await problemsCollection.insertOne(problem211);
    console.log('Problem 211 inserted');

    // Test cases for Problem 211 (7 test cases)
    const testCases = [
      // Visible test case
      {
        test_case_id: 2111,
        problem_id: 211,
        input: '',
        expected_output: 'Archive initialized\nMission events logged\nTimestamped entry added\nLog entry modified\nBinary telemetry archived\nSENSOR_RAW: TEMP=22 RAD=0.5',
        is_hidden: false,
        weight: 15
      },
      // Hidden test cases
      {
        test_case_id: 2112,
        problem_id: 211,
        input: '',
        expected_output: 'Archive initialized\nMission events logged\nTimestamped entry added\nLog entry modified\nBinary telemetry archived\nSENSOR_RAW: TEMP=22 RAD=0.5',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 2113,
        problem_id: 211,
        input: '',
        expected_output: 'Archive initialized\nMission events logged\nTimestamped entry added\nLog entry modified\nBinary telemetry archived\nSENSOR_RAW: TEMP=22 RAD=0.5',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 2114,
        problem_id: 211,
        input: '',
        expected_output: 'Archive initialized\nMission events logged\nTimestamped entry added\nLog entry modified\nBinary telemetry archived\nSENSOR_RAW: TEMP=22 RAD=0.5',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 2115,
        problem_id: 211,
        input: '',
        expected_output: 'Archive initialized\nMission events logged\nTimestamped entry added\nLog entry modified\nBinary telemetry archived\nSENSOR_RAW: TEMP=22 RAD=0.5',
        is_hidden: true,
        weight: 10
      },
      {
        test_case_id: 2116,
        problem_id: 211,
        input: '',
        expected_output: 'Archive initialized\nMission events logged\nTimestamped entry added\nLog entry modified\nBinary telemetry archived\nSENSOR_RAW: TEMP=22 RAD=0.5',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 2117,
        problem_id: 211,
        input: '',
        expected_output: 'Archive initialized\nMission events logged\nTimestamped entry added\nLog entry modified\nBinary telemetry archived\nSENSOR_RAW: TEMP=22 RAD=0.5',
        is_hidden: true,
        weight: 15
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 211`);

    console.log('\n✅ Problem 211 (Level 4, Session 5, Case 6: Galactic Data Archives) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem211()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
