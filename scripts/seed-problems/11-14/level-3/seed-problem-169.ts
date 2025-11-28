import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem169() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 169: Level 3, Session 9, Case 1 - Multiple Inheritance
    const problem169 = {
      problem_id: 169,
      session_id: 31, // Level 3, Session 9
      title: 'Combining Navigation and Communication Systems',
      description: 'Explore how a single class can inherit capabilities from multiple parent classes simultaneously.',
      difficulty: 'Medium',
      question: `Can you create a MissionAI that combines both navigation and communication capabilities by inheriting from two separate parent classes? The system should be able to navigate space and send signals without writing duplicate code.`,

      compiler_comment: '# Write your code here\n',
      sample_input: '',
      sample_output: 'Navigating space.\nSending signal.',

      age_group: '11-14',
      level_number: 3,
      difficulty_level: 2,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['multiple inheritance', 'inheritance', 'parent classes', 'child class', 'code reuse', 'OOP'],
        estimated_time_minutes: 15
      },

      // Session-level content
      session_title: 'Session 9: Mastering Inheritance - Advanced',

      // Case-specific content
      case_number: 1,
      case_title: 'Multiple Inheritance',
      case_overview: `Multiple inheritance allows a class to inherit features from two or more parent classes simultaneously, giving the child access to methods from all parents without code duplication.`,
      case_explanation: `Create Navigator class with navigate() method and Communicator class with transmit() method. Create MissionAI inheriting from both. Create object and call both inherited methods.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 169 if it exists
    await problemsCollection.deleteOne({ problem_id: 169 });
    await testCasesCollection.deleteMany({ problem_id: 169 });

    // Insert problem 169
    const problemResult = await problemsCollection.insertOne(problem169);
    console.log('Problem 169 inserted');

    // Test cases for Problem 169
    const testCases = [
      // Visible test case
      {
        test_case_id: 1691,
        problem_id: 169,
        input: '',
        expected_output: 'Navigating space.\nSending signal.',
        is_hidden: false,
        weight: 20
      },
      // Hidden test cases
      {
        test_case_id: 1692,
        problem_id: 169,
        input: '',
        expected_output: 'Navigating space.\nSending signal.',
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 1693,
        problem_id: 169,
        input: '',
        expected_output: 'Navigating space.\nSending signal.',
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 1694,
        problem_id: 169,
        input: '',
        expected_output: 'Navigating space.\nSending signal.',
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 1695,
        problem_id: 169,
        input: '',
        expected_output: 'Navigating space.\nSending signal.',
        is_hidden: true,
        weight: 20
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 169`);

    console.log('\n✅ Problem 169 (Level 3, Session 9, Case 1: Multiple Inheritance) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem169()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
