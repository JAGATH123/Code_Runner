import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem163() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 163: Level 3, Session 8, Case 1 - Single Inheritance
    const problem163 = {
      problem_id: 163,
      session_id: 30, // Level 3, Session 8
      title: 'Extending Spacecraft Capabilities',
      description: 'Learn how child classes can inherit features from parent classes while adding their own specialized functionality.',
      difficulty: 'Medium',
      question: `Create Spacecraft class with launch() method. Create Satellite(Spacecraft) with transmit() method. Both methods print with prefix based on name length: len>=7+even='Advanced:', len>=7+odd='Elite:', len<7+even='Basic:', len<7+odd='Swift:'. Call both methods.`,

      compiler_comment: '# Write your code here\n',
      sample_input: 'Hubble',
      sample_output: 'Advanced: Hubble Launching into space!\nAdvanced: Hubble Transmitting data to Earth.',

      age_group: '11-14',
      level_number: 3,
      difficulty_level: 2,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['inheritance', 'single inheritance', 'parent class', 'child class', 'method inheritance', 'OOP', 'conditional logic', 'nested conditionals', 'modulo operator'],
        estimated_time_minutes: 15
      },

      // Session-level content
      session_title: 'Session 8: Mastering Inheritance - Beginner',

      // Case-specific content
      case_number: 1,
      case_title: 'Single Inheritance – Extending Base Features',
      case_overview: `Single inheritance allows a child class to inherit methods from a parent class while adding new specialized features. The child gains all parent capabilities without rewriting code.`,
      case_explanation: `Create Spacecraft with __init__(name) and launch() that prints with conditional prefix. Satellite inherits from Spacecraft and adds transmit(). Use nested if-else to check name len>=7 or <7, then even/odd. Prefixes: len>=7+even='Advanced:', len>=7+odd='Elite:', len<7+even='Basic:', len<7+odd='Swift:'. Call both methods.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 163 if it exists
    await problemsCollection.deleteOne({ problem_id: 163 });
    await testCasesCollection.deleteMany({ problem_id: 163 });

    // Insert problem 163
    const problemResult = await problemsCollection.insertOne(problem163);
    console.log('Problem 163 inserted');

    // Test cases for Problem 163
    const testCases = [
      // Visible test case
      {
        test_case_id: 1631,
        problem_id: 163,
        input: 'Hubble',
        expected_output: 'Basic: Hubble Launching into space!\nBasic: Hubble Transmitting data to Earth.', // len=6, even, <7
        is_hidden: false,
        weight: 20
      },
      // Hidden test cases
      {
        test_case_id: 1632,
        problem_id: 163,
        input: 'GPS',
        expected_output: 'Swift: GPS Launching into space!\nSwift: GPS Transmitting data to Earth.', // len=3, odd, <7
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 1633,
        problem_id: 163,
        input: 'Voyager',
        expected_output: 'Elite: Voyager Launching into space!\nElite: Voyager Transmitting data to Earth.', // len=7, odd, >=7
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 1634,
        problem_id: 163,
        input: 'Starlink',
        expected_output: 'Advanced: Starlink Launching into space!\nAdvanced: Starlink Transmitting data to Earth.', // len=8, even, >=7
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 1635,
        problem_id: 163,
        input: 'ISS',
        expected_output: 'Swift: ISS Launching into space!\nSwift: ISS Transmitting data to Earth.', // len=3, odd, <7
        is_hidden: true,
        weight: 20
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 163`);

    console.log('\n✅ Problem 163 (Level 3, Session 8, Case 1: Single Inheritance) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem163()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
