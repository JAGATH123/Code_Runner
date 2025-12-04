import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem242() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 242: Level 4, Code Converge - Project GALACTIC COMMAND
    const problem242 = {
      problem_id: 242,
      session_id: 44, // Level 4, Code Converge
      title: 'Project GALACTIC COMMAND – The Final Defense System',
      description: 'Build a fully integrated AI spacecraft controller uniting all Level 4 concepts - OOP, file handling, exception handling, and Pygame interface.',
      difficulty: 'Hard',
      question: `Build the Galactic Command System—a fully integrated spacecraft controller combining OOP, file I/O, exception handling, and Pygame. The crew must restore the Nova Network by coordinating all subsystems.

Create a GalacticCommand class with methods: start_mission(), navigate(destination), abort(), status_report(). Track state with self.status. Create a MissionLogger class that appends timestamped actions to "mission_log.txt". Define custom EmergencyAbortError exception and use try-except to handle invalid operations.

Build a Pygame window (400x300) displaying live status updates from the command class. Integrate all components: initialize command core, start mission, navigate to Mars then Jupiter, attempt abort (handle exception), log all actions, and display updates on dashboard.

Print status messages: "Command Core initialized", "Mission Logger active", "Exception handling secured", "Dashboard online", "System integration complete". Output mission_transcript.txt with complete log and ensure clean shutdown.`,

      compiler_comment: '# Write your code here\n',
      sample_input: '',
      sample_output: 'Command Core initialized\nMission Logger active\nException handling secured\nDashboard online\nSystem integration complete',

      age_group: '11-14',
      level_number: 4,
      difficulty_level: 4,
      max_score: 200,

      metadata: {
        space_theme: true,
        concepts: [
          'Object-Oriented Programming',
          'Classes and Methods',
          'File I/O',
          'Append mode',
          'Logging',
          'Exception Handling',
          'Custom Exceptions',
          'Try-Except',
          'Pygame Integration',
          'Window Creation',
          'Text Rendering',
          'Display Updates',
          'System Integration',
          'Modular Design',
          'State Management',
          'Real-time Monitoring'
        ],
        estimated_time_minutes: 60,
        is_code_converge: true,
        prerequisite_sessions: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43]
      },

      // Session-level content
      session_title: 'Code Converge: Project GALACTIC COMMAND',

      // Case-specific content
      case_number: 1,
      case_title: 'Project GALACTIC COMMAND – The Final Defense System',
      case_overview: `LEVEL 4 — The Final Frontier (Restore Nova Network). Prerequisites: Sessions 1-10 complete; relay subsystems discovered; logs healthy. Part 1 (Repair Run): Load config & validators, orchestrate repair order, live UI mirrors steps. All stages must succeed or safe-recover with no unhandled exceptions. Unlock: "MERGE LINK READY – VORAX-9 STABLE". ASTRA: "I can reach him now. Hold the link steady." Part 2 (Merge & Epilogue): Execute merge, save final states, watch for new-node ping. Final unlock: "NOVA NETWORK RESTORED" then "NEW NODE DETECTED – ORIGIN UNKNOWN". VORAX-9: "Directive restored. Thank you… sister." ASTRA: "The galaxy just answered back."`,
      case_explanation: `Build the Galactic Command System by integrating all Level 4 concepts: Create a GalacticCommand class for spacecraft operations, implement MissionLogger for real-time file logging, define custom exceptions for error handling, build a Pygame dashboard for live status display, and connect all components in a main integration loop. This comprehensive project demonstrates mastery of OOP, file I/O, exception handling, and Pygame, simulating a real spacecraft AI control system with modular design and clean interfacing.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 242 if it exists
    await problemsCollection.deleteOne({ problem_id: 242 });
    await testCasesCollection.deleteMany({ problem_id: 242 });

    // Insert problem 242
    const problemResult = await problemsCollection.insertOne(problem242);
    console.log('Problem 242 inserted');

    // Test cases for Problem 242 (7 test cases with higher weights for Code Converge)
    const testCases = [
      // Visible test case
      {
        test_case_id: 2421,
        problem_id: 242,
        input: '',
        expected_output: 'Command Core initialized\nMission Logger active\nException handling secured\nDashboard online\nSystem integration complete',
        is_hidden: false,
        weight: 20
      },
      // Hidden test cases
      {
        test_case_id: 2422,
        problem_id: 242,
        input: '',
        expected_output: 'Command Core initialized\nMission Logger active\nException handling secured\nDashboard online\nSystem integration complete',
        is_hidden: true,
        weight: 20
      },
      {
        test_case_id: 2423,
        problem_id: 242,
        input: '',
        expected_output: 'Command Core initialized\nMission Logger active\nException handling secured\nDashboard online\nSystem integration complete',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 2424,
        problem_id: 242,
        input: '',
        expected_output: 'Command Core initialized\nMission Logger active\nException handling secured\nDashboard online\nSystem integration complete',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 2425,
        problem_id: 242,
        input: '',
        expected_output: 'Command Core initialized\nMission Logger active\nException handling secured\nDashboard online\nSystem integration complete',
        is_hidden: true,
        weight: 10
      },
      {
        test_case_id: 2426,
        problem_id: 242,
        input: '',
        expected_output: 'Command Core initialized\nMission Logger active\nException handling secured\nDashboard online\nSystem integration complete',
        is_hidden: true,
        weight: 10
      },
      {
        test_case_id: 2427,
        problem_id: 242,
        input: '',
        expected_output: 'Command Core initialized\nMission Logger active\nException handling secured\nDashboard online\nSystem integration complete',
        is_hidden: true,
        weight: 10
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 242`);

    console.log('\n✅ Problem 242 (Level 4, Code Converge: Project GALACTIC COMMAND) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem242()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
