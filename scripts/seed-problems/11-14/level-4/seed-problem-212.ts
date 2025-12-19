import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem212() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 212: Level 4, Session 6, Case 1 - Writing with write()
    const problem212 = {
      problem_id: 212,
      session_id: 39, // Level 4, Session 6
      title: 'Writing with write()',
      description: 'Learn to save single messages into files using the write() function for simple data storage.',
      difficulty: 'Easy',
      question: `Create a file named "myinfo.txt" and write your name "John Doe" and your favorite subject "Python Programming" into it using write(). Write them as a single line separated by a space and a dash like this: "John Doe - Python Programming". Print "File created successfully" when done.`,      sample_input: '',
      sample_output: 'File created successfully',

      age_group: '11-14',
      level_number: 4,
      difficulty_level: 1,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['write()', 'open()', 'close()', 'file creation', 'write mode', 'saving data'],
        estimated_time_minutes: 10
      },

      // Session-level content
      session_title: 'Session 6: File Handling Functions',

      // Case-specific content
      case_number: 1,
      case_title: 'Writing with write() – Save One Note',
      case_overview: `The write() function lets your program open a file and store one sentence or message in it. This is super useful when you want to save something simple—like your name, a diary thought, or your top score in a game. Just remember: every time you use write() in "w" mode, it replaces the old content with new content. So it's like starting on a fresh page every time.`,
      case_explanation: `Use open("filename.txt", "w") to open or create a file in write mode. The write() method puts your message into the file. Always use close() to save and close the file, or use the with statement for automatic closing.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 212 if it exists
    await problemsCollection.deleteOne({ problem_id: 212 });
    await testCasesCollection.deleteMany({ problem_id: 212 });

    // Insert problem 212
    const problemResult = await problemsCollection.insertOne(problem212);
    console.log('Problem 212 inserted');

    // Test cases for Problem 212
    const testCases = [
      // Visible test cases
      {
        test_case_id: 2121,
        problem_id: 212,
        input: '',
        expected_output: 'File created successfully',
        is_hidden: false,
        weight: 10
      },
      {
        test_case_id: 2122,
        problem_id: 212,
        input: '',
        expected_output: 'File created successfully',
        is_hidden: false,
        weight: 10
      },
      // Hidden test cases
      {
        test_case_id: 2123,
        problem_id: 212,
        input: '',
        expected_output: 'File created successfully',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2124,
        problem_id: 212,
        input: '',
        expected_output: 'File created successfully',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2125,
        problem_id: 212,
        input: '',
        expected_output: 'File created successfully',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2126,
        problem_id: 212,
        input: '',
        expected_output: 'File created successfully',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2127,
        problem_id: 212,
        input: '',
        expected_output: 'File created successfully',
        is_hidden: true,
        weight: 16
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 212`);

    console.log('\n✅ Problem 212 (Level 4, Session 6, Case 1: Writing with write()) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem212()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
