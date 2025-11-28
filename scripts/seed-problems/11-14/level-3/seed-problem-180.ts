import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem180() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 180: Level 3, Session 10, Case 6 - Adaptive AI Systems (Final Task)
    const problem180 = {
      problem_id: 180,
      session_id: 32, // Level 3, Session 10
      title: 'Adaptive AI Systems – Evolving Intelligence Through Polymorphism',
      description: 'A massive storm spike is distorting communication signals across deep space. AI assistants must dynamically adapt their responses based on mission context while maintaining a unified interface. Your mission is to engineer an adaptive AI Command Unit that demonstrates complete polymorphic behavior: function overriding for context-aware responses, operator overloading for resource management (+, *, -, /), and polymorphic iteration showing how different AI types work together through shared interfaces.',
      difficulty: 'Hard',
      question: `The Nova Network is experiencing storm-induced message distortion. Can you build an adaptive AI system that demonstrates polymorphism through context-aware responses, resource operations using overloaded operators, and unified handling of diverse AI types?

Your system must showcase: specialized AI units with overridden response methods, operator overloading for combining processing power and resource management, and polymorphic behavior where different AI types respond uniquely through a common interface.`,

      compiler_comment: '# Write your code here\n',
      sample_input: 'Explorer\n100\nRescue\n80\n150',
      sample_output: 'ExplorerAI responding: Scanning unknown territories.\nRescueAI responding: Initiating emergency protocols.\nCombined AI unit with 180 power\nBoosted AI unit with 300 power\nDamaged AI unit with 50 power\nShared AI unit with 50.0 power',

      age_group: '11-14',
      level_number: 3,
      difficulty_level: 3,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['polymorphism', 'function overriding', 'operator overloading', '__add__', '__mul__', '__sub__', '__truediv__', 'common interface', 'dynamic behavior', 'OOP'],
        estimated_time_minutes: 30
      },

      // Session-level content
      session_title: 'Session 10: Polymorphism',

      // Case-specific content
      case_number: 6,
      case_title: 'Adaptive AI Systems – Evolving Intelligence Through Polymorphism',
      case_overview: `This final mission demonstrates complete polymorphic architecture: function overriding for specialized AI behaviors, operator overloading (+, *, -, /) for resource management, and polymorphic iteration where diverse AI types share common interfaces while maintaining unique implementations.`,
      case_explanation: `Build base AIAssistant with name, processing_power, and respond(). Create ExplorerAI and RescueAI overriding respond() with context-specific messages. Overload + (__add__) to combine power, * (__mul__) for boost, - (__sub__) for damage, / (__truediv__) for sharing. Read 5 inputs: AI1 type, power1, AI2 type, power2, boost value. Create specialized AIs, demonstrate operations, show polymorphic responses.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 180 if it exists
    await problemsCollection.deleteOne({ problem_id: 180 });
    await testCasesCollection.deleteMany({ problem_id: 180 });

    // Insert problem 180
    const problemResult = await problemsCollection.insertOne(problem180);
    console.log('Problem 180 inserted');

    // Test cases for Problem 180 (7 test cases for final task)
    const testCases = [
      // Visible test case
      {
        test_case_id: 1801,
        problem_id: 180,
        input: 'Explorer\n100\nRescue\n80\n150',
        expected_output: 'ExplorerAI responding: Scanning unknown territories.\nRescueAI responding: Initiating emergency protocols.\nCombined AI unit with 180 power\nBoosted AI unit with 300 power\nDamaged AI unit with 50 power\nShared AI unit with 50.0 power',
        is_hidden: false,
        weight: 15
      },
      // Hidden test cases
      {
        test_case_id: 1802,
        problem_id: 180,
        input: 'Explorer\n120\nRescue\n90\n200',
        expected_output: 'ExplorerAI responding: Scanning unknown territories.\nRescueAI responding: Initiating emergency protocols.\nCombined AI unit with 210 power\nBoosted AI unit with 400 power\nDamaged AI unit with 20 power\nShared AI unit with 45.0 power',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 1803,
        problem_id: 180,
        input: 'Explorer\n150\nRescue\n100\n250',
        expected_output: 'ExplorerAI responding: Scanning unknown territories.\nRescueAI responding: Initiating emergency protocols.\nCombined AI unit with 250 power\nBoosted AI unit with 500 power\nDamaged AI unit with 50 power\nShared AI unit with 50.0 power',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 1804,
        problem_id: 180,
        input: 'Explorer\n80\nRescue\n70\n100',
        expected_output: 'ExplorerAI responding: Scanning unknown territories.\nRescueAI responding: Initiating emergency protocols.\nCombined AI unit with 150 power\nBoosted AI unit with 200 power\nDamaged AI unit with 10 power\nShared AI unit with 35.0 power',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 1805,
        problem_id: 180,
        input: 'Explorer\n110\nRescue\n95\n180',
        expected_output: 'ExplorerAI responding: Scanning unknown territories.\nRescueAI responding: Initiating emergency protocols.\nCombined AI unit with 205 power\nBoosted AI unit with 360 power\nDamaged AI unit with 15 power\nShared AI unit with 47.5 power',
        is_hidden: true,
        weight: 10
      },
      {
        test_case_id: 1806,
        problem_id: 180,
        input: 'Explorer\n130\nRescue\n110\n220',
        expected_output: 'ExplorerAI responding: Scanning unknown territories.\nRescueAI responding: Initiating emergency protocols.\nCombined AI unit with 240 power\nBoosted AI unit with 440 power\nDamaged AI unit with 20 power\nShared AI unit with 55.0 power',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 1807,
        problem_id: 180,
        input: 'Explorer\n90\nRescue\n85\n120',
        expected_output: 'ExplorerAI responding: Scanning unknown territories.\nRescueAI responding: Initiating emergency protocols.\nCombined AI unit with 175 power\nBoosted AI unit with 240 power\nDamaged AI unit with 5 power\nShared AI unit with 42.5 power',
        is_hidden: true,
        weight: 15
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 180`);

    console.log('\n✅ Problem 180 (Level 3, Session 10, Case 6: Adaptive AI Systems - FINAL TASK) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem180()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
