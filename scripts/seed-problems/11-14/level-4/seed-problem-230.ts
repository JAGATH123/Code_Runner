import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem230() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 230: Level 4, Session 9, Case 1 - Creating a Graphical Window
    const problem230 = {
      problem_id: 230,
      session_id: 42, // Level 4, Session 9
      title: 'Creating a Graphical Window',
      description: 'Learn to initialize a Pygame window with custom size, title, and background color.',
      difficulty: 'Easy',
      question: `Create a Pygame window with size 800x500 pixels. Set its title to "Control Interface" and apply a dark background color (RGB: 10, 10, 40). Initialize Pygame, create the window, set the caption, fill the background, and update the display. Print "Window created successfully" when done.`,

      compiler_comment: '',
      sample_input: '',
      sample_output: 'Window created successfully',

      age_group: '11-14',
      level_number: 4,
      difficulty_level: 1,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['pygame.init()', 'set_mode()', 'set_caption()', 'fill()', 'display.update()', 'window creation'],
        estimated_time_minutes: 10
      },

      // Session-level content
      session_title: 'Session 9: Pygame Basics and Visual Representation',

      // Case-specific content
      case_number: 1,
      case_title: 'Creating a Graphical Window',
      case_overview: `Initialize a Pygame window with custom size, title, and background color. This creates the canvas for drawing graphics.`,
      case_explanation: `Use pygame.init() to start Pygame, set_mode() for window size, set_caption() for title, fill() for background, and display.update() to show changes.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 230 if it exists
    await problemsCollection.deleteOne({ problem_id: 230 });
    await testCasesCollection.deleteMany({ problem_id: 230 });

    // Insert problem 230
    const problemResult = await problemsCollection.insertOne(problem230);
    console.log('Problem 230 inserted');

    // Test cases for Problem 230 - Pygame problems only need 2 test cases (no input variation)
    const testCases = [
      // Visible test case
      {
        test_case_id: 2301,
        problem_id: 230,
        input: '',
        expected_output: 'Window created successfully',
        is_hidden: false,
        weight: 50
      },
      // Hidden test case
      {
        test_case_id: 2302,
        problem_id: 230,
        input: '',
        expected_output: 'Window created successfully',
        is_hidden: true,
        weight: 50
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 230`);

    console.log('\n✅ Problem 230 (Level 4, Session 9, Case 1: Creating Window) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem230()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
