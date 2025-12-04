import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem220() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 220: Level 4, Session 7, Case 3 - Using next() to Read a Line
    const problem220 = {
      problem_id: 220,
      session_id: 40, // Level 4, Session 7
      title: 'Using next() to Read a Line',
      description: 'Learn to read files line-by-line using next() for sequential stream processing.',
      difficulty: 'Easy',
      question: `Open "galactic_log.txt" which contains multiple log entries. Use next() to skip the first two lines, then print only the third and fourth log entries. Format: "Third Entry: [content]" and "Fourth Entry: [content]" on separate lines.`,

      compiler_comment: '# Write your code here\n',
      sample_input: '',
      sample_output: 'Third Entry: CABIN SEALED\nFourth Entry: LAUNCH SEQUENCE STARTED',

      age_group: '11-14',
      level_number: 4,
      difficulty_level: 1,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['next()', 'iterator', 'line-by-line reading', 'sequential processing', 'file streams'],
        estimated_time_minutes: 10
      },

      // Session-level content
      session_title: 'Session 7: File Position and Operations',

      // Case-specific content
      case_number: 3,
      case_title: 'Using next() to Read a Line',
      case_overview: `Space log data is often read one line at a time by systems or engineers. Using next(), cadets can read lines step-by-step and pause between reads. This simulates situations like receiving mission updates in real-time or verifying one log event before proceeding to the next.`,
      case_explanation: `next(file) reads one line at a time. It's ideal for line-by-line processing, reduces memory usage, and helps isolate key events. This is perfect for streaming data or processing large files without loading everything into memory.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 220 if it exists
    await problemsCollection.deleteOne({ problem_id: 220 });
    await testCasesCollection.deleteMany({ problem_id: 220 });

    // Insert problem 220
    const problemResult = await problemsCollection.insertOne(problem220);
    console.log('Problem 220 inserted');

    // Test cases for Problem 220
    const testCases = [
      // Visible test cases
      {
        test_case_id: 2201,
        problem_id: 220,
        input: '',
        expected_output: 'Third Entry: CABIN SEALED\nFourth Entry: LAUNCH SEQUENCE STARTED',
        is_hidden: false,
        weight: 10
      },
      {
        test_case_id: 2202,
        problem_id: 220,
        input: '',
        expected_output: 'Third Entry: CABIN SEALED\nFourth Entry: LAUNCH SEQUENCE STARTED',
        is_hidden: false,
        weight: 10
      },
      // Hidden test cases
      {
        test_case_id: 2203,
        problem_id: 220,
        input: '',
        expected_output: 'Third Entry: CABIN SEALED\nFourth Entry: LAUNCH SEQUENCE STARTED',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2204,
        problem_id: 220,
        input: '',
        expected_output: 'Third Entry: CABIN SEALED\nFourth Entry: LAUNCH SEQUENCE STARTED',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2205,
        problem_id: 220,
        input: '',
        expected_output: 'Third Entry: CABIN SEALED\nFourth Entry: LAUNCH SEQUENCE STARTED',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2206,
        problem_id: 220,
        input: '',
        expected_output: 'Third Entry: CABIN SEALED\nFourth Entry: LAUNCH SEQUENCE STARTED',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2207,
        problem_id: 220,
        input: '',
        expected_output: 'Third Entry: CABIN SEALED\nFourth Entry: LAUNCH SEQUENCE STARTED',
        is_hidden: true,
        weight: 16
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 220`);

    console.log('\n✅ Problem 220 (Level 4, Session 7, Case 3: Using next()) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem220()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
