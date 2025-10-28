import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem6() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 6: Session 2, Case 1 - Creating and Assigning Variables
    const problem6 = {
      problem_id: 6,
      session_id: 2,
      title: 'Creating and Assigning Variables',
      description: 'Learn how to create variables and assign different types of values to them in Python.',
      question: `Create two variables:
- planet_name = "Mars"
- temperature = -63

Print both variables, each on a new line.`,
      difficulty: 'Intro',
      example_code: '# Write your code here\n',
      sample_input: '',
      sample_output: 'Mars\n-63',
      age_group: '11-14',
      level_number: 1,
      metadata: {
        concepts: ['variables', 'assignment', 'data types', 'strings', 'integers'],
        space_theme: true,
        estimated_time_minutes: 8
      },

      // Session-level content
      session_title: 'Session 2: Understanding Variables, Data Types',
      session_introduction: `Variables are like labeled boxes where you store values, and data types define what kind of data those boxes hold — numbers, text, True/False values, and more. Understanding how to use and manage these building blocks is key to writing smart, bug-free code. In this session, we'll explore how variables behave, change, and interact in your programs, while connecting the logic to real-world situations and tech like robotics and AI!`,

      // Case-specific content
      case_number: 1,
      case_title: 'Creating and Assigning Variables',
      case_overview: `Learn to create variables and store different types of values. Variables are the foundation of programming!`,
      case_code: `# Variables store values that you can use later
# Examples of creating variables:

rocket_name = "Apollo"     # Text (string) - needs quotes
launch_year = 1969         # Number (integer) - no quotes
fuel_level = 85.5          # Decimal number (float)
is_ready = True            # Boolean (True/False)

# Print variables:
print(rocket_name)
print(launch_year)

# This prints:
# Apollo
# 1969

# Now create your own variables and print them!`,
      case_explanation: `**Creating Variables:**

● Use the = sign to assign a value: variable_name = value
● Text (strings) need quotes: "Mars"
● Numbers don't need quotes: -63 or 85.5
● Variable names should be descriptive (use lowercase with underscores)
● Python automatically detects the data type

**Input Format:**
You do not need to read any input for this challenge.

**Output Format:**
Print each variable on a separate line as shown in the question.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Test cases for Problem 6 - Simple for intro level
    const testCases6 = [
      {
        problem_id: 6,
        test_case_id: 1,
        input: '',
        expected_output: 'Mars\n-63',
        is_hidden: false,
        weight: 1.0,
        created_at: new Date()
      }
    ];

    // Upsert problem 6
    const problemResult = await problemsCollection.updateOne(
      { problem_id: 6 },
      { $set: problem6 },
      { upsert: true }
    );

    console.log('Problem 6 upserted:', problemResult.upsertedId || 'Updated existing');

    // Delete existing test cases for problem 6
    await testCasesCollection.deleteMany({ problem_id: 6 });

    // Insert test cases
    const testCasesResult = await testCasesCollection.insertMany(testCases6);
    console.log('Test cases inserted:', testCasesResult.insertedCount);

    console.log('\n✅ Problem 6 (Session 2, Case 1: Creating and Assigning Variables) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem6()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
