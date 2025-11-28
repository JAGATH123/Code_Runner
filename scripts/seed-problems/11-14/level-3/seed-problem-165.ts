import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem165() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 165: Level 3, Session 8, Case 3 - Method Overloading
    const problem165 = {
      problem_id: 165,
      session_id: 30, // Level 3, Session 8
      title: 'Flexible Sensor Recording',
      description: 'Learn how a single method can perform different actions based on the parameters provided.',
      difficulty: 'Medium',
      question: `Create Sensor class with __init__(name) and record(duration=None). Print with prefix based on name length: len>=6+even='Alpha:', len>=6+odd='Beta:', len<6+even='Gamma:', len<6+odd='Delta:'. If duration is None, print '[prefix] [name] Recording data indefinitely.', else print '[prefix] [name] Recording data for [duration] seconds.'. Call record() twice.`,

      compiler_comment: '# Write your code here\n',
      sample_input: 'Thermal',
      sample_output: 'Beta: Thermal Recording data indefinitely.\nBeta: Thermal Recording data for 10 seconds.',

      age_group: '11-14',
      level_number: 3,
      difficulty_level: 2,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['method overloading', 'default parameters', 'optional arguments', 'flexible methods', 'OOP', 'conditional logic', 'nested conditionals', 'modulo operator'],
        estimated_time_minutes: 15
      },

      // Session-level content
      session_title: 'Session 8: Mastering Inheritance - Beginner',

      // Case-specific content
      case_number: 3,
      case_title: 'Method Overloading – Same Name, Different Job',
      case_overview: `Method overloading allows one method to perform different actions based on parameters. Using default values enables flexible behavior with a single method name.`,
      case_explanation: `Create Sensor with __init__(name) and record(duration=None). Use nested if-else to check name len>=6 or <6, then even/odd. Prefixes: len>=6+even='Alpha:', len>=6+odd='Beta:', len<6+even='Gamma:', len<6+odd='Delta:'. If duration is None, print indefinite message; else print with duration. Call record() twice.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 165 if it exists
    await problemsCollection.deleteOne({ problem_id: 165 });
    await testCasesCollection.deleteMany({ problem_id: 165 });

    // Insert problem 165
    const problemResult = await problemsCollection.insertOne(problem165);
    console.log('Problem 165 inserted');

    // Test cases for Problem 165
    const testCases = [
      // Visible test case
      {
        test_case_id: 1651,
        problem_id: 165,
        input: 'Camera',
        expected_output: 'Alpha: Camera Recording data indefinitely.\nAlpha: Camera Recording data for 10 seconds.', // len=6, even, >=6
        is_hidden: false,
        weight: 20
      },
      // Hidden test cases
      {
        test_case_id: 1652,
        problem_id: 165,
        input: 'Thermal',
        expected_output: 'Beta: Thermal Recording data indefinitely.\nBeta: Thermal Recording data for 10 seconds.', // len=7, odd, >=6
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 1653,
        problem_id: 165,
        input: 'Temp',
        expected_output: 'Gamma: Temp Recording data indefinitely.\nGamma: Temp Recording data for 10 seconds.', // len=4, even, <6
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 1654,
        problem_id: 165,
        input: 'Ion',
        expected_output: 'Delta: Ion Recording data indefinitely.\nDelta: Ion Recording data for 10 seconds.', // len=3, odd, <6
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 1655,
        problem_id: 165,
        input: 'Gyro',
        expected_output: 'Gamma: Gyro Recording data indefinitely.\nGamma: Gyro Recording data for 10 seconds.', // len=4, even, <6
        is_hidden: true,
        weight: 20
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 165`);

    console.log('\n✅ Problem 165 (Level 3, Session 8, Case 3: Method Overloading) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem165()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
