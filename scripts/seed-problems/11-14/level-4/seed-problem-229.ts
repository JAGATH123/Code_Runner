import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem229() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 229: Level 4, Session 8, Case 6 - Galactic Data Command Center
    const problem229 = {
      problem_id: 229,
      session_id: 41, // Level 4, Session 8
      title: 'Galactic Data Command Center – Navigating the Cosmic Archives',
      description: 'Build a comprehensive file management system using OS module and exception handling for mission-critical operations.',
      difficulty: 'Hard',
      question: `Design the Galactic Data Command Center—a secure system to manage mission files, diagnostics, and data logs using the OS module and exception handling.

Create a folder named "Command_Center" using os.mkdir() if it doesn't exist (check with os.path.exists()). Print "Command Center created." or "Folder already exists."

Inside Command_Center, create a file named "diagnostics.txt" and use writelines() to write three system updates: "Engine check complete\\n", "Fuel levels optimal\\n", "Navigation system aligned\\n". Print "Mission entries added."

Use try-except to safely read and print the content of "Command_Center/diagnostics.txt". If FileNotFoundError occurs, print "File not found."

Rename "diagnostics.txt" to "diagnostics_archive.txt" using os.rename() with try-except error handling. Print "File renamed successfully."

Append the text "Emergency alert activated\\n" to "diagnostics_archive.txt". Print "Update saved!"

Try to delete "Command_Center/temp_log.txt" using os.remove() with try-except. If successful, print "Temp log deleted." If FileNotFoundError, print "Temp log not found."`,

      compiler_comment: '# Write your code here\n',
      sample_input: '',
      sample_output: 'Command Center created.\nMission entries added.\nEngine check complete\nFuel levels optimal\nNavigation system aligned\nFile renamed successfully.\nUpdate saved!\nTemp log not found.',

      age_group: '11-14',
      level_number: 4,
      difficulty_level: 3,
      max_score: 100,

      metadata: {
        space_theme: true,
        concepts: ['OS module', 'file operations', 'exception handling', 'os.mkdir()', 'os.rename()', 'os.remove()', 'comprehensive system', 'FileNotFoundError', 'FileExistsError'],
        estimated_time_minutes: 35
      },

      // Session-level content
      session_title: 'Session 8: OS Module and File Handling with Exception Handling',

      // Case-specific content
      case_number: 6,
      case_title: 'Galactic Data Command Center – Navigating the Cosmic Archives',
      case_overview: `Cadets become Mission Data Managers, designing the Galactic Data Command Center—a secure system to manage mission files, diagnostics, and data logs. The task is to perform comprehensive file and folder operations using the OS module while protecting the mission with robust exception handling.`,
      case_explanation: `Implement a complete file management system combining all OS module operations: folder creation with os.mkdir(), file writing with writelines(), safe reading with try-except, file renaming with os.rename(), appending updates, and safe deletion with os.remove(). This demonstrates mastery of OS module integration with exception handling for production-ready file management.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing problem 229 if it exists
    await problemsCollection.deleteOne({ problem_id: 229 });
    await testCasesCollection.deleteMany({ problem_id: 229 });

    // Insert problem 229
    const problemResult = await problemsCollection.insertOne(problem229);
    console.log('Problem 229 inserted');

    // Test cases for Problem 229 (7 test cases)
    const testCases = [
      // Visible test case
      {
        test_case_id: 2291,
        problem_id: 229,
        input: '',
        expected_output: 'Command Center created.\nMission entries added.\nEngine check complete\nFuel levels optimal\nNavigation system aligned\nFile renamed successfully.\nUpdate saved!\nTemp log not found.',
        is_hidden: false,
        weight: 15
      },
      // Hidden test cases
      {
        test_case_id: 2292,
        problem_id: 229,
        input: '',
        expected_output: 'Command Center created.\nMission entries added.\nEngine check complete\nFuel levels optimal\nNavigation system aligned\nFile renamed successfully.\nUpdate saved!\nTemp log not found.',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 2293,
        problem_id: 229,
        input: '',
        expected_output: 'Command Center created.\nMission entries added.\nEngine check complete\nFuel levels optimal\nNavigation system aligned\nFile renamed successfully.\nUpdate saved!\nTemp log not found.',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 2294,
        problem_id: 229,
        input: '',
        expected_output: 'Command Center created.\nMission entries added.\nEngine check complete\nFuel levels optimal\nNavigation system aligned\nFile renamed successfully.\nUpdate saved!\nTemp log not found.',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 2295,
        problem_id: 229,
        input: '',
        expected_output: 'Command Center created.\nMission entries added.\nEngine check complete\nFuel levels optimal\nNavigation system aligned\nFile renamed successfully.\nUpdate saved!\nTemp log not found.',
        is_hidden: true,
        weight: 10
      },
      {
        test_case_id: 2296,
        problem_id: 229,
        input: '',
        expected_output: 'Command Center created.\nMission entries added.\nEngine check complete\nFuel levels optimal\nNavigation system aligned\nFile renamed successfully.\nUpdate saved!\nTemp log not found.',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 2297,
        problem_id: 229,
        input: '',
        expected_output: 'Command Center created.\nMission entries added.\nEngine check complete\nFuel levels optimal\nNavigation system aligned\nFile renamed successfully.\nUpdate saved!\nTemp log not found.',
        is_hidden: true,
        weight: 15
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Problem 229`);

    console.log('\n✅ Problem 229 (Level 4, Session 8, Case 6: Galactic Data Command Center) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem229()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
