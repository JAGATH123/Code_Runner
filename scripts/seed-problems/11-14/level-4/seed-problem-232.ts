import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem232() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 232: Level 4, Session 9, Case 3 - Rendering Status Information
    const problem232 = {
      problem_id: 232,
      session_id: 42, // Level 4, Session 9
      title: 'Rendering Status Information',
      description: 'Learn to display text information on screen using Pygame font rendering and blit operations.',
      difficulty: 'Easy',
      question: `Create a Pygame window and display two status metrics using text rendering. Set speed = 1700 and altitude = 22000. Create a font object and render two text strings: "Speed: 1700 km/h" and "Altitude: 22000 m" in white color (255, 255, 255). Display the speed text at position (600, 450) and altitude text at position (600, 480). Print "Status information rendered" when complete.`,

      compiler_comment: '# Write your code here\n',
      sample_input: '',
      sample_output: 'Status information rendered',

      age_group: '11-14',
      level_number: 4,
      difficulty_level: 1,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['pygame.font.Font()', 'render()', 'blit()', 'text display', 'formatted strings'],
        estimated_time_minutes: 10
      },

      // Session-level content
      session_title: 'Session 9: Pygame Basics and Visual Representation',

      // Case-specific content
      case_number: 3,
      case_title: 'Rendering Status Information',
      case_overview: `This case introduces text rendering using Pygame's built-in font system. Cadets will display key status metrics like speed and altitude, simulating how real-time information is often presented in dashboards. This step helps learners understand how to create and place readable, formatted data on the screen during active operation.`,
      case_explanation: `Font() creates a font object. render() converts text into an image surface. blit() displays that image at a given location. Variables are embedded using formatted strings. display.update() shows the final result on screen.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 232 if it exists
    await problemsCollection.deleteOne({ problem_id: 232 });
    await testCasesCollection.deleteMany({ problem_id: 232 });

    // Insert problem 232
    const problemResult = await problemsCollection.insertOne(problem232);
    console.log('Problem 232 inserted');

    // Test cases for Problem 232
    const testCases = [
      // Visible test cases
      {
        test_case_id: 2321,
        problem_id: 232,
        input: '',
        expected_output: 'Status information rendered',
        is_hidden: false,
        weight: 10
      },
      {
        test_case_id: 2322,
        problem_id: 232,
        input: '',
        expected_output: 'Status information rendered',
        is_hidden: false,
        weight: 10
      },
      // Hidden test cases
      {
        test_case_id: 2323,
        problem_id: 232,
        input: '',
        expected_output: 'Status information rendered',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2324,
        problem_id: 232,
        input: '',
        expected_output: 'Status information rendered',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2325,
        problem_id: 232,
        input: '',
        expected_output: 'Status information rendered',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2326,
        problem_id: 232,
        input: '',
        expected_output: 'Status information rendered',
        is_hidden: true,
        weight: 16
      },
      {
        test_case_id: 2327,
        problem_id: 232,
        input: '',
        expected_output: 'Status information rendered',
        is_hidden: true,
        weight: 16
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 232`);

    console.log('\n✅ Problem 232 (Level 4, Session 9, Case 3: Rendering Text) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem232()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
