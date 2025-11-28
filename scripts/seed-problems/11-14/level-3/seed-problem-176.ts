import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem176() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 176: Level 3, Session 10, Case 2 - Operator Overloading (+)
    const problem176 = {
      problem_id: 176,
      session_id: 32, // Level 3, Session 10
      title: 'Combining Book Pages with Custom Addition',
      description: 'Learn how to redefine operators like + to work with custom objects.',
      difficulty: 'Medium',
      question: `Can you create a Book class where adding two books together combines their page counts? When you use the + operator on Book objects, it should create a new Book with the total pages from both.`,

      compiler_comment: '# Write your code here\n',
      sample_input: '',
      sample_output: 'Book with 250 pages',

      age_group: '11-14',
      level_number: 3,
      difficulty_level: 2,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['polymorphism', 'operator overloading', '__add__', '__str__', 'magic methods', 'OOP'],
        estimated_time_minutes: 15
      },

      // Session-level content
      session_title: 'Session 10: Polymorphism',

      // Case-specific content
      case_number: 2,
      case_title: 'Operator Overloading – Redefining + for Custom Objects',
      case_overview: `Operator overloading allows custom objects to use standard operators like +, -, * by defining special methods that specify the operator's behavior for that class.`,
      case_explanation: `Create Book class with __init__(pages). Define __add__(other) to return new Book with combined pages. Define __str__() to return formatted string. Create two books, add them, print result.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 176 if it exists
    await problemsCollection.deleteOne({ problem_id: 176 });
    await testCasesCollection.deleteMany({ problem_id: 176 });

    // Insert problem 176
    const problemResult = await problemsCollection.insertOne(problem176);
    console.log('Problem 176 inserted');

    // Test cases for Problem 176
    const testCases = [
      // Visible test case
      {
        test_case_id: 1761,
        problem_id: 176,
        input: '',
        expected_output: 'Book with 250 pages',
        is_hidden: false,
        weight: 20
      },
      // Hidden test cases
      {
        test_case_id: 1762,
        problem_id: 176,
        input: '',
        expected_output: 'Book with 250 pages',
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 1763,
        problem_id: 176,
        input: '',
        expected_output: 'Book with 250 pages',
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 1764,
        problem_id: 176,
        input: '',
        expected_output: 'Book with 250 pages',
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 1765,
        problem_id: 176,
        input: '',
        expected_output: 'Book with 250 pages',
        is_hidden: true,
        weight: 20
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 176`);

    console.log('\n✅ Problem 176 (Level 3, Session 10, Case 2: Operator Overloading) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem176()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
