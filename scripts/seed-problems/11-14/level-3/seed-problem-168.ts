import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem168() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 168: Level 3, Session 8, Case 6 - Generational Intelligence Upgrade (Final Task)
    const problem168 = {
      problem_id: 168,
      session_id: 30, // Level 3, Session 8
      title: 'Generational Intelligence Upgrade – Deep Space AI Evolution',
      description: 'During a critical surge in deep space operations, single-purpose AI units hit their operational limits. The crew must evolve their AI systems into generational families that inherit shared skills while developing specialized capabilities. Your mission is to design an advanced ExplorerAI that demonstrates the full power of inheritance hierarchies, combining diagnostic tools, decision-making intelligence, and adaptive task execution.',
      difficulty: 'Hard',
      question: `The Nova Network requires an evolved AI system capable of exploration, diagnostics, and adaptive mission execution. Can you build a complete ExplorerAI that inherits from multiple generations of AI units?

Your ExplorerAI must demonstrate multilevel inheritance (from AIAssistant through TechAI and MissionAI), perform specialized exploration scanning, and override task execution with intelligent behavior for sample collection missions.`,

      compiler_comment: '# Write your code here\n',
      sample_input: 'Nova\nDeep Space Exploration\nEuropa\nCollect Sample',
      sample_output: 'Running technical diagnostics...\nMaking mission-level decision...\nExplorerAI is scanning Europa for life signs...\nSample collection initiated.',

      age_group: '11-14',
      level_number: 3,
      difficulty_level: 3,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['inheritance', 'multilevel inheritance', 'single inheritance', 'method overriding', 'method overloading', 'class hierarchy', 'specialized behavior', 'OOP'],
        estimated_time_minutes: 30
      },

      // Session-level content
      session_title: 'Session 8: Mastering Inheritance - Beginner',

      // Case-specific content
      case_number: 6,
      case_title: 'Generational Intelligence Upgrade – Deep Space AI Evolution',
      case_overview: `This final mission demonstrates the complete inheritance ecosystem: base AIAssistant with identity, TechAI adding diagnostics, MissionAI adding decisions and flexible task execution, and ExplorerAI with specialized scanning and overridden collection behavior.`,
      case_explanation: `Build AIAssistant base with name/purpose. Create TechAI inheriting with run_diagnostics(). Add MissionAI inheriting TechAI with make_decision() and execute_task(*tasks). Create ExplorerAI inheriting MissionAI, add explore(target), override execute_task() to handle "Collect Sample" specially. Test all inherited and new methods.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 168 if it exists
    await problemsCollection.deleteOne({ problem_id: 168 });
    await testCasesCollection.deleteMany({ problem_id: 168 });

    // Insert problem 168
    const problemResult = await problemsCollection.insertOne(problem168);
    console.log('Problem 168 inserted');

    // Test cases for Problem 168 (7 test cases for final task)
    const testCases = [
      // Visible test case
      {
        test_case_id: 1681,
        problem_id: 168,
        input: 'Nova\nDeep Space Exploration\nEuropa\nCollect Sample',
        expected_output: 'Running technical diagnostics...\nMaking mission-level decision...\nExplorerAI is scanning Europa for life signs...\nSample collection initiated.',
        is_hidden: false,
        weight: 15
      },
      // Hidden test cases
      {
        test_case_id: 1682,
        problem_id: 168,
        input: 'Atlas\nPlanetary Survey\nMars\nAnalyze Terrain',
        expected_output: 'Running technical diagnostics...\nMaking mission-level decision...\nExplorerAI is scanning Mars for life signs...\nExecuting task: Analyze Terrain',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 1683,
        problem_id: 168,
        input: 'Orion\nAsteroid Mining\nCeres\nCollect Sample',
        expected_output: 'Running technical diagnostics...\nMaking mission-level decision...\nExplorerAI is scanning Ceres for life signs...\nSample collection initiated.',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 1684,
        problem_id: 168,
        input: 'Titan\nMoon Research\nEnceladus\nDeploy Sensors',
        expected_output: 'Running technical diagnostics...\nMaking mission-level decision...\nExplorerAI is scanning Enceladus for life signs...\nExecuting task: Deploy Sensors',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 1685,
        problem_id: 168,
        input: 'Voyager\nDeep Space Survey\nTitan\nCollect Sample',
        expected_output: 'Running technical diagnostics...\nMaking mission-level decision...\nExplorerAI is scanning Titan for life signs...\nSample collection initiated.',
        is_hidden: true,
        weight: 10
      },
      {
        test_case_id: 1686,
        problem_id: 168,
        input: 'Phoenix\nExoplanet Study\nProxima b\nRecord Data',
        expected_output: 'Running technical diagnostics...\nMaking mission-level decision...\nExplorerAI is scanning Proxima b for life signs...\nExecuting task: Record Data',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 1687,
        problem_id: 168,
        input: 'Horizon\nCometary Analysis\nHalley\nCollect Sample',
        expected_output: 'Running technical diagnostics...\nMaking mission-level decision...\nExplorerAI is scanning Halley for life signs...\nSample collection initiated.',
        is_hidden: true,
        weight: 15
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 168`);

    console.log('\n✅ Problem 168 (Level 3, Session 8, Case 6: Generational Intelligence Upgrade - FINAL TASK) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem168()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
