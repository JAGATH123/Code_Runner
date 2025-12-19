import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem202() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 202: Level 4, Session 4, Case 3 - Appending to a File
    const problem202 = {
      problem_id: 202,
      session_id: 37, // Level 4, Session 4
      title: 'Appending to a File',
      description: 'Learn to add new content to an existing file without deleting the old content using append mode.',
      difficulty: 'Medium',
      question: `A file "mynote.txt" contains "Hello, this is my first note!". Open it in append mode and add a new line "\\nHere's something new I learned today." without erasing the original content. Print "Content appended successfully" when done.`,      sample_input: '',
      sample_output: 'Content appended successfully',

      age_group: '11-14',
      level_number: 4,
      difficulty_level: 2,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['append mode', 'adding without erasing', 'newline character', 'preserving data'],
        estimated_time_minutes: 12
      },

      // Session-level content
      session_title: 'Session 4: Python File Handling Basics',

      // Case-specific content
      case_number: 3,
      case_title: 'Appending to a File',
      case_overview: `Appending lets you add new notes to your file without deleting old ones. It's like adding a new line to your notebook without tearing out the old page.`,
      case_explanation: `Use "a" for append mode. Use \\n to move the new text to a new line. The old content stays safe while new messages stack below it.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 202 if it exists
    await problemsCollection.deleteOne({ problem_id: 202 });
    await testCasesCollection.deleteMany({ problem_id: 202 });

    // Insert problem 202
    const problemResult = await problemsCollection.insertOne(problem202);
    console.log('Problem 202 inserted');

    // Test cases for Problem 202
    const testCases = [
      // Visible test cases
      {
        test_case_id: 2021,
        problem_id: 202,
        input: '',
        expected_output: 'Content appended successfully',
        is_hidden: false,
        weight: 10
      },
      {
        test_case_id: 2022,
        problem_id: 202,
        input: '',
        expected_output: 'Content appended successfully',
        is_hidden: false,
        weight: 10
      },
      // Hidden test cases
      {
        test_case_id: 2023,
        problem_id: 202,
        input: '',
        expected_output: 'Content appended successfully',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2024,
        problem_id: 202,
        input: '',
        expected_output: 'Content appended successfully',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2025,
        problem_id: 202,
        input: '',
        expected_output: 'Content appended successfully',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2026,
        problem_id: 202,
        input: '',
        expected_output: 'Content appended successfully',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2027,
        problem_id: 202,
        input: '',
        expected_output: 'Content appended successfully',
        is_hidden: true,
        weight: 16
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 202`);

    console.log('\n✅ Problem 202 (Level 4, Session 4, Case 3: Appending to a File) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem202()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
