import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem171() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 171: Level 3, Session 9, Case 3 - Method Overriding
    const problem171 = {
      problem_id: 171,
      session_id: 31, // Level 3, Session 9
      title: 'Specialized Thermal Sensor Behavior',
      description: 'Discover how child classes can replace parent methods with customized versions.',
      difficulty: 'Medium',
      question: `Can you create a ThermalSensor that changes the behavior of its parent Sensor class by providing a specialized status message? The child class should override the generic sensor status with thermal-specific information.`,

      compiler_comment: '# Write your code here\n',
      sample_input: '',
      sample_output: 'Thermal sensor activated.',

      age_group: '11-14',
      level_number: 3,
      difficulty_level: 2,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['method overriding', 'inheritance', 'polymorphism', 'specialized behavior', 'OOP'],
        estimated_time_minutes: 15
      },

      // Session-level content
      session_title: 'Session 9: Mastering Inheritance - Advanced',

      // Case-specific content
      case_number: 3,
      case_title: 'Method Overriding',
      case_overview: `Method overriding occurs when a child class defines a method with the same name as the parent class, replacing the parent's behavior with specialized functionality.`,
      case_explanation: `Create Sensor class with status() printing "Sensor is online." Create ThermalSensor inheriting from Sensor, override status() to print "Thermal sensor activated." Create ThermalSensor object and call status().`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 171 if it exists
    await problemsCollection.deleteOne({ problem_id: 171 });
    await testCasesCollection.deleteMany({ problem_id: 171 });

    // Insert problem 171
    const problemResult = await problemsCollection.insertOne(problem171);
    console.log('Problem 171 inserted');

    // Test cases for Problem 171
    const testCases = [
      // Visible test case
      {
        test_case_id: 1711,
        problem_id: 171,
        input: '',
        expected_output: 'Thermal sensor activated.',
        is_hidden: false,
        weight: 20
      },
      // Hidden test cases
      {
        test_case_id: 1712,
        problem_id: 171,
        input: '',
        expected_output: 'Thermal sensor activated.',
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 1713,
        problem_id: 171,
        input: '',
        expected_output: 'Thermal sensor activated.',
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 1714,
        problem_id: 171,
        input: '',
        expected_output: 'Thermal sensor activated.',
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 1715,
        problem_id: 171,
        input: '',
        expected_output: 'Thermal sensor activated.',
        is_hidden: true,
        weight: 20
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 171`);

    console.log('\n✅ Problem 171 (Level 3, Session 9, Case 3: Method Overriding) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem171()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
