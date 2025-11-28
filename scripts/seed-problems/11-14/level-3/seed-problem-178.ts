import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem178() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 178: Level 3, Session 10, Case 4 - Using super()
    const problem178 = {
      problem_id: 178,
      session_id: 32, // Level 3, Session 10
      title: 'Extending Diagnostic Systems with super()',
      description: 'Master how to extend parent functionality while preserving original behavior.',
      difficulty: 'Medium',
      question: `Can you create an AdvancedCheck system that first runs the basic diagnostics from its parent SystemCheck class using super(), then adds additional functionality checks? The system should combine both parent and child behaviors.`,

      compiler_comment: '# Write your code here\n',
      sample_input: '',
      sample_output: 'Running system diagnostics.\nAll systems functional.',

      age_group: '11-14',
      level_number: 3,
      difficulty_level: 2,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['polymorphism', 'super()', 'inheritance', 'method extension', 'parent method access', 'OOP'],
        estimated_time_minutes: 15
      },

      // Session-level content
      session_title: 'Session 10: Polymorphism',

      // Case-specific content
      case_number: 4,
      case_title: 'Using super() to Access Parent Methods',
      case_overview: `The super() function enables child classes to invoke parent methods, allowing behavior extension rather than complete replacement. This preserves parent logic while adding new functionality.`,
      case_explanation: `Create SystemCheck with check() printing diagnostics message. Create AdvancedCheck inheriting SystemCheck. Override check() using super().check() first, then add functionality message. Create object and call check().`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 178 if it exists
    await problemsCollection.deleteOne({ problem_id: 178 });
    await testCasesCollection.deleteMany({ problem_id: 178 });

    // Insert problem 178
    const problemResult = await problemsCollection.insertOne(problem178);
    console.log('Problem 178 inserted');

    // Test cases for Problem 178
    const testCases = [
      // Visible test case
      {
        test_case_id: 1781,
        problem_id: 178,
        input: '',
        expected_output: 'Running system diagnostics.\nAll systems functional.',
        is_hidden: false,
        weight: 20
      },
      // Hidden test cases
      {
        test_case_id: 1782,
        problem_id: 178,
        input: '',
        expected_output: 'Running system diagnostics.\nAll systems functional.',
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 1783,
        problem_id: 178,
        input: '',
        expected_output: 'Running system diagnostics.\nAll systems functional.',
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 1784,
        problem_id: 178,
        input: '',
        expected_output: 'Running system diagnostics.\nAll systems functional.',
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 1785,
        problem_id: 178,
        input: '',
        expected_output: 'Running system diagnostics.\nAll systems functional.',
        is_hidden: true,
        weight: 20
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 178`);

    console.log('\n✅ Problem 178 (Level 3, Session 10, Case 4: Using super()) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem178()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
