import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem210() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 210: Level 4, Session 5, Case 5 - Binary Data Transmission Logs
    const problem210 = {
      problem_id: 210,
      session_id: 38, // Level 4, Session 5
      title: 'Binary Data Transmission Logs',
      description: 'Learn to handle binary file operations for storing and retrieving encoded sensor data.',
      difficulty: 'Medium',
      question: `Create a program that:
1. Writes the binary message b"TELEMETRY: SYSTEM OK - TEMP 22C" to a file called "sensor_data.bin" using binary write mode
2. Reads the binary data back from the file
3. Prints the decoded content

Print "Binary data logged successfully" after writing, then print the decoded content after reading.`,

      compiler_comment: '# Write your code here\n',
      sample_input: '',
      sample_output: 'Binary data logged successfully\nTELEMETRY: SYSTEM OK - TEMP 22C',

      age_group: '11-14',
      level_number: 4,
      difficulty_level: 2,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['binary modes (wb, rb)', 'encoded data', 'binary file handling', 'telemetry', 'decode()'],
        estimated_time_minutes: 15
      },

      // Session-level content
      session_title: 'Session 5: File Handling',

      // Case-specific content
      case_number: 5,
      case_title: 'Binary Data Transmission Logs',
      case_overview: `This case introduces binary file handling, where cadets write and read mission data in encoded formats. They will work with telemetry strings or sensor packets stored in binary to simulate secure space communication systems. Binary mode is ideal for transmitting raw or compressed data efficiently.`,
      case_explanation: `Use "wb" and "rb" modes to handle non-text (binary) data like encoded signals or images. The b"" prefix denotes binary format. After reading binary data, use decode() to convert it back to text. This is used for raw sensor logs or secure packet transfers in spacecraft systems.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 210 if it exists
    await problemsCollection.deleteOne({ problem_id: 210 });
    await testCasesCollection.deleteMany({ problem_id: 210 });

    // Insert problem 210
    const problemResult = await problemsCollection.insertOne(problem210);
    console.log('Problem 210 inserted');

    // Test cases for Problem 210
    const testCases = [
      // Visible test cases
      {
        test_case_id: 2101,
        problem_id: 210,
        input: '',
        expected_output: 'Binary data logged successfully\nTELEMETRY: SYSTEM OK - TEMP 22C',
        is_hidden: false,
        weight: 10
      },
      {
        test_case_id: 2102,
        problem_id: 210,
        input: '',
        expected_output: 'Binary data logged successfully\nTELEMETRY: SYSTEM OK - TEMP 22C',
        is_hidden: false,
        weight: 10
      },
      // Hidden test cases
      {
        test_case_id: 2103,
        problem_id: 210,
        input: '',
        expected_output: 'Binary data logged successfully\nTELEMETRY: SYSTEM OK - TEMP 22C',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2104,
        problem_id: 210,
        input: '',
        expected_output: 'Binary data logged successfully\nTELEMETRY: SYSTEM OK - TEMP 22C',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2105,
        problem_id: 210,
        input: '',
        expected_output: 'Binary data logged successfully\nTELEMETRY: SYSTEM OK - TEMP 22C',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2106,
        problem_id: 210,
        input: '',
        expected_output: 'Binary data logged successfully\nTELEMETRY: SYSTEM OK - TEMP 22C',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2107,
        problem_id: 210,
        input: '',
        expected_output: 'Binary data logged successfully\nTELEMETRY: SYSTEM OK - TEMP 22C',
        is_hidden: true,
        weight: 16
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 210`);

    console.log('\n✅ Problem 210 (Level 4, Session 5, Case 5: Binary Data Transmission) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem210()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
