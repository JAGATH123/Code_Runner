import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem231() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 231: Level 4, Session 9, Case 2 - Drawing Visual Indicators
    const problem231 = {
      problem_id: 231,
      session_id: 42, // Level 4, Session 9
      title: 'Drawing Visual Indicators',
      description: 'Learn to draw rectangles as visual gauges to represent dynamic values like fuel and oxygen.',
      difficulty: 'Medium',
      question: `Create a Pygame window (800x500) and draw two rectangles to represent fuel and oxygen levels. Set initial fuel to 80 and oxygen to 90. Draw the fuel bar at position (50, 450) with green color (0, 255, 0), width = fuel * 2, height = 20. Draw the oxygen bar at position (50, 480) with blue color (0, 0, 255), width = oxygen * 2, height = 20. Print "Visual indicators drawn" when complete.`,

      compiler_comment: '',
      sample_input: '',
      sample_output: 'Visual indicators drawn',

      age_group: '11-14',
      level_number: 4,
      difficulty_level: 2,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['pygame.draw.rect()', 'visual gauges', 'proportional sizing', 'color rendering'],
        estimated_time_minutes: 12
      },

      // Session-level content
      session_title: 'Session 9: Pygame Basics and Visual Representation',

      // Case-specific content
      case_number: 2,
      case_title: 'Drawing Visual Indicators',
      case_overview: `Draw two rectangles as visual gauges for fuel and oxygen levels. The width of each bar is proportional to its value.`,
      case_explanation: `Use pygame.draw.rect() to draw rectangles. Width is proportional to the value (fuel * 2, oxygen * 2). Green for fuel, blue for oxygen.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 231 if it exists
    await problemsCollection.deleteOne({ problem_id: 231 });
    await testCasesCollection.deleteMany({ problem_id: 231 });

    // Insert problem 231
    const problemResult = await problemsCollection.insertOne(problem231);
    console.log('Problem 231 inserted');

    // Test cases for Problem 231 - Pygame problems only need 2 test cases (no input variation)
    const testCases = [
      // Visible test case
      {
        test_case_id: 2311,
        problem_id: 231,
        input: '',
        expected_output: 'Visual indicators drawn',
        is_hidden: false,
        weight: 50
      },
      // Hidden test case
      {
        test_case_id: 2312,
        problem_id: 231,
        input: '',
        expected_output: 'Visual indicators drawn',
        is_hidden: true,
        weight: 50
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 231`);

    console.log('\n✅ Problem 231 (Level 4, Session 9, Case 2: Drawing Indicators) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem231()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
