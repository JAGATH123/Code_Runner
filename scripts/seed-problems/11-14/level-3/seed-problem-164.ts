import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem164() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 164: Level 3, Session 8, Case 2 - Multilevel Inheritance
    const problem164 = {
      problem_id: 164,
      session_id: 30, // Level 3, Session 8
      title: 'Building a Multi-Generation Space Fleet',
      description: 'Explore how inheritance can pass skills down through multiple levels, like a family tree of spacecraft.',
      difficulty: 'Medium',
      question: `Create Vehicle with move(), Rocket(Vehicle) with ignite(), CargoRocket(Rocket) with deliver(). All methods print with prefix based on name length: len>=8+even='Heavy:', len>=8+odd='Super:', len<8+even='Fast:', len<8+odd='Quick:'. Call all three methods.`,

      compiler_comment: '# Write your code here\n',
      sample_input: 'Falcon9',
      sample_output: 'Super: Falcon9 Moving...\nSuper: Falcon9 Rocket engines firing!\nSuper: Falcon9 Delivering satellite payload.',

      age_group: '11-14',
      level_number: 3,
      difficulty_level: 2,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['inheritance', 'multilevel inheritance', 'class hierarchy', 'method chaining', 'OOP', 'conditional logic', 'nested conditionals', 'modulo operator'],
        estimated_time_minutes: 15
      },

      // Session-level content
      session_title: 'Session 8: Mastering Inheritance - Beginner',

      // Case-specific content
      case_number: 2,
      case_title: 'Multilevel Inheritance – Passing Down the Chain',
      case_overview: `Multilevel inheritance creates a hierarchy where each class inherits from another, passing skills down like generations. Each level builds upon the previous without rewriting code.`,
      case_explanation: `Build Vehicle with __init__(name) and move(), Rocket(Vehicle) adds ignite(), CargoRocket(Rocket) adds deliver(). All methods print with conditional prefix. Use nested if-else to check name len>=8 or <8, then even/odd. Prefixes: len>=8+even='Heavy:', len>=8+odd='Super:', len<8+even='Fast:', len<8+odd='Quick:'. Call all three methods.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 164 if it exists
    await problemsCollection.deleteOne({ problem_id: 164 });
    await testCasesCollection.deleteMany({ problem_id: 164 });

    // Insert problem 164
    const problemResult = await problemsCollection.insertOne(problem164);
    console.log('Problem 164 inserted');

    // Test cases for Problem 164
    const testCases = [
      // Visible test case
      {
        test_case_id: 1641,
        problem_id: 164,
        input: 'Starship',
        expected_output: 'Heavy: Starship Moving...\nHeavy: Starship Rocket engines firing!\nHeavy: Starship Delivering satellite payload.', // len=8, even, >=8
        is_hidden: false,
        weight: 20
      },
      // Hidden test cases
      {
        test_case_id: 1642,
        problem_id: 164,
        input: 'Discovery',
        expected_output: 'Super: Discovery Moving...\nSuper: Discovery Rocket engines firing!\nSuper: Discovery Delivering satellite payload.', // len=9, odd, >=8
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 1643,
        problem_id: 164,
        input: 'Soyuz',
        expected_output: 'Quick: Soyuz Moving...\nQuick: Soyuz Rocket engines firing!\nQuick: Soyuz Delivering satellite payload.', // len=5, odd, <8
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 1644,
        problem_id: 164,
        input: 'Falcon',
        expected_output: 'Fast: Falcon Moving...\nFast: Falcon Rocket engines firing!\nFast: Falcon Delivering satellite payload.', // len=6, even, <8
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 1645,
        problem_id: 164,
        input: 'SaturnV',
        expected_output: 'Quick: SaturnV Moving...\nQuick: SaturnV Rocket engines firing!\nQuick: SaturnV Delivering satellite payload.', // len=7, odd, <8
        is_hidden: true,
        weight: 20
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 164`);

    console.log('\n✅ Problem 164 (Level 3, Session 8, Case 2: Multilevel Inheritance) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem164()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
