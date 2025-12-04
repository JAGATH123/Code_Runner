import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem219() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 219: Level 4, Session 7, Case 2 - Navigating Logs Using seek()
    const problem219 = {
      problem_id: 219,
      session_id: 40, // Level 4, Session 7
      title: 'Navigating Logs Using seek()',
      description: 'Learn to jump directly to specific byte positions in files using seek() for fast data access.',
      difficulty: 'Medium',
      question: `A file "galactic_log.txt" contains multiple log entries. Use seek() to jump to byte position 50 (the third entry) and print that line using readline(). Strip any extra whitespace. Print in format: "Third entry: [content]"`,

      compiler_comment: '# Write your code here\n',
      sample_input: '',
      sample_output: 'Third entry: CABIN SEALED',

      age_group: '11-14',
      level_number: 4,
      difficulty_level: 2,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['seek()', 'file pointer navigation', 'byte positioning', 'direct access', 'readline()'],
        estimated_time_minutes: 12
      },

      // Session-level content
      session_title: 'Session 7: File Position and Operations',

      // Case-specific content
      case_number: 2,
      case_title: 'Navigating Logs Using seek()',
      case_overview: `Now that cadets know where each log entry begins, they'll learn how to jump directly to those byte positions using seek(). This simulates retrieving a specific part of the log, like reviewing the exact moment of engine ignition or system failure, without reading the entire file from the beginning.`,
      case_explanation: `seek(n) moves the file pointer to byte n. This enables fast access to known entries, avoids full file scans, and is useful in large log file navigation. It's like jumping to a specific page in a book instead of reading from the start.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 219 if it exists
    await problemsCollection.deleteOne({ problem_id: 219 });
    await testCasesCollection.deleteMany({ problem_id: 219 });

    // Insert problem 219
    const problemResult = await problemsCollection.insertOne(problem219);
    console.log('Problem 219 inserted');

    // Test cases for Problem 219
    const testCases = [
      // Visible test cases
      {
        test_case_id: 2191,
        problem_id: 219,
        input: '',
        expected_output: 'Third entry: CABIN SEALED',
        is_hidden: false,
        weight: 10
      },
      {
        test_case_id: 2192,
        problem_id: 219,
        input: '',
        expected_output: 'Third entry: CABIN SEALED',
        is_hidden: false,
        weight: 10
      },
      // Hidden test cases
      {
        test_case_id: 2193,
        problem_id: 219,
        input: '',
        expected_output: 'Third entry: CABIN SEALED',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2194,
        problem_id: 219,
        input: '',
        expected_output: 'Third entry: CABIN SEALED',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2195,
        problem_id: 219,
        input: '',
        expected_output: 'Third entry: CABIN SEALED',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2196,
        problem_id: 219,
        input: '',
        expected_output: 'Third entry: CABIN SEALED',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2197,
        problem_id: 219,
        input: '',
        expected_output: 'Third entry: CABIN SEALED',
        is_hidden: true,
        weight: 16
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 219`);

    console.log('\n✅ Problem 219 (Level 4, Session 7, Case 2: Navigating with seek()) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem219()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
