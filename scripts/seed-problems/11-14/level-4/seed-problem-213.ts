import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem213() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 213: Level 4, Session 6, Case 2 - Writing Multiple Lines with writelines()
    const problem213 = {
      problem_id: 213,
      session_id: 39, // Level 4, Session 6
      title: 'Writing Multiple Lines with writelines()',
      description: 'Learn to write multiple lines at once using writelines() for batch data storage.',
      difficulty: 'Medium',
      question: `Create a file called "wishlist.txt" and write three things you wish to learn this year using writelines(). The items should be:
1. "Learn Machine Learning"
2. "Master Data Structures"
3. "Build Real Projects"

Each item should be on a new line (use \\n). Print "Wishlist saved successfully" when done.`,

      compiler_comment: '# Write your code here\n',
      sample_input: '',
      sample_output: 'Wishlist saved successfully',

      age_group: '11-14',
      level_number: 4,
      difficulty_level: 2,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['writelines()', 'list of strings', 'newline character', 'batch writing', 'file creation'],
        estimated_time_minutes: 12
      },

      // Session-level content
      session_title: 'Session 6: File Handling Functions',

      // Case-specific content
      case_number: 2,
      case_title: 'Writing Multiple Lines with writelines() – List of Items',
      case_overview: `When you want to save more than one thing at once—like your to-do list or a shopping list, writelines() helps! It lets you prepare a list of strings and writes all of them into the file in one shot. You just need to make sure each line ends with \\n (a new line), so the file looks clean and easy to read.`,
      case_explanation: `Create a Python list with multiple strings, each ending with \\n for a new line. Use writelines() to save all strings in the list into the file at once. This is much faster than calling write() multiple times.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 213 if it exists
    await problemsCollection.deleteOne({ problem_id: 213 });
    await testCasesCollection.deleteMany({ problem_id: 213 });

    // Insert problem 213
    const problemResult = await problemsCollection.insertOne(problem213);
    console.log('Problem 213 inserted');

    // Test cases for Problem 213
    const testCases = [
      // Visible test cases
      {
        test_case_id: 2131,
        problem_id: 213,
        input: '',
        expected_output: 'Wishlist saved successfully',
        is_hidden: false,
        weight: 10
      },
      {
        test_case_id: 2132,
        problem_id: 213,
        input: '',
        expected_output: 'Wishlist saved successfully',
        is_hidden: false,
        weight: 10
      },
      // Hidden test cases
      {
        test_case_id: 2133,
        problem_id: 213,
        input: '',
        expected_output: 'Wishlist saved successfully',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2134,
        problem_id: 213,
        input: '',
        expected_output: 'Wishlist saved successfully',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2135,
        problem_id: 213,
        input: '',
        expected_output: 'Wishlist saved successfully',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2136,
        problem_id: 213,
        input: '',
        expected_output: 'Wishlist saved successfully',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2137,
        problem_id: 213,
        input: '',
        expected_output: 'Wishlist saved successfully',
        is_hidden: true,
        weight: 16
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 213`);

    console.log('\n✅ Problem 213 (Level 4, Session 6, Case 2: Writing with writelines()) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem213()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
