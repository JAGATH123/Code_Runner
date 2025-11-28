import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem172() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 172: Level 3, Session 9, Case 4 - Using super()
    const problem172 = {
      problem_id: 172,
      session_id: 31, // Level 3, Session 9
      title: 'Extending System Diagnostics with super()',
      description: 'Learn how to extend parent class behavior while keeping the original functionality intact.',
      difficulty: 'Medium',
      question: `Can you create an AdvancedCheck system that runs the basic system diagnostics from its parent class and then adds its own functionality check? The child class should enhance, not replace, the parent's behavior.`,

      compiler_comment: '# Write your code here\n',
      sample_input: '',
      sample_output: 'Running system diagnostics.\nAll systems functional.',

      age_group: '11-14',
      level_number: 3,
      difficulty_level: 2,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['super()', 'inheritance', 'method extension', 'parent method access', 'OOP'],
        estimated_time_minutes: 15
      },

      // Session-level content
      session_title: 'Session 9: Mastering Inheritance - Advanced',

      // Case-specific content
      case_number: 4,
      case_title: 'Using super() to Access Parent Methods',
      case_overview: `The super() function allows child classes to call parent methods, enabling behavior extension rather than complete replacement.`,
      case_explanation: `Create SystemCheck class with check() printing "Running system diagnostics." Create AdvancedCheck inheriting SystemCheck. In check(), use super().check() then print "All systems functional." Create object and call check().`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 172 if it exists
    await problemsCollection.deleteOne({ problem_id: 172 });
    await testCasesCollection.deleteMany({ problem_id: 172 });

    // Insert problem 172
    const problemResult = await problemsCollection.insertOne(problem172);
    console.log('Problem 172 inserted');

    // Test cases for Problem 172
    const testCases = [
      // Visible test case
      {
        test_case_id: 1721,
        problem_id: 172,
        input: '',
        expected_output: 'Running system diagnostics.\nAll systems functional.',
        is_hidden: false,
        weight: 20
      },
      // Hidden test cases
      {
        test_case_id: 1722,
        problem_id: 172,
        input: '',
        expected_output: 'Running system diagnostics.\nAll systems functional.',
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 1723,
        problem_id: 172,
        input: '',
        expected_output: 'Running system diagnostics.\nAll systems functional.',
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 1724,
        problem_id: 172,
        input: '',
        expected_output: 'Running system diagnostics.\nAll systems functional.',
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 1725,
        problem_id: 172,
        input: '',
        expected_output: 'Running system diagnostics.\nAll systems functional.',
        is_hidden: true,
        weight: 20
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 172`);

    console.log('\n✅ Problem 172 (Level 3, Session 9, Case 4: Using super()) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem172()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
