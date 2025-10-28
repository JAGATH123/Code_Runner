import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem11() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 11: Session 3, Case 1 - Getting Simple Input
    const problem11 = {
      problem_id: 11,
      session_id: 3,
      title: 'Getting Simple Input',
      description: 'Learn to ask the user for input and store it in a variable.',
      question: `Use input() to ask the user for their name.
Store the input in a variable.
Then print "Hello, " followed by the name.`,
      difficulty: 'Intro',
      example_code: '# Write your code here\n',
      sample_input: 'Alice',
      sample_output: 'Hello, Alice',
      age_group: '11-14',
      level_number: 1,
      metadata: {
        concepts: ['input() function', 'user input', 'strings', 'interactive programs', 'print() with variables'],
        space_theme: true,
        estimated_time_minutes: 8,
        test_protocol: 'Students should ask for user name using input() and print "Hello, [name]" where [name] is the user input'
      },

      // Session-level content
      session_title: 'Session 3: Input Function and Type Conversions',
      session_introduction: `In Python, the input() function allows your program to listen to the user and collect information. Everything you type using input() is treated as a string. But often, we need to convert this input into numbers for calculations this is where type conversion helps.`,

      // Case-specific content
      case_number: 1,
      case_title: 'Getting Simple Input',
      case_overview: `Ask the user to enter something and store it in a variable.`,
      case_code: `# The input() function gets data from the user
# It returns a string (text)

# Example 1: Getting a name
astronaut = input()
print("Welcome aboard,", astronaut)

# Example 2: Getting a planet name
planet = input()
print("Destination:", planet)

# Example 3: Getting a number (as a string)
age = input()
print("You are", age, "years old")

# You can use input() without a prompt
# Or with a prompt message: input("message: ")
# For now, let's use input() without a prompt`,
      case_explanation: `**How to get user input:**

● Use input() to get data from the user
● Store it in a variable: name = input()
● Print a greeting with the name

**Input Format:**
One line containing the user's name (e.g., Alice)

**Output Format:**
Print "Hello, " followed by the name (e.g., Hello, Alice)`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Test cases for Problem 11
    const testCases11 = [
      {
        problem_id: 11,
        test_case_id: 1,
        input: 'Alice',
        expected_output: 'Hello, Alice',
        is_hidden: false,
        weight: 1.0,
        created_at: new Date()
      },
      {
        problem_id: 11,
        test_case_id: 2,
        input: 'Bob',
        expected_output: 'Hello, Bob',
        is_hidden: true,
        weight: 1.0,
        created_at: new Date()
      },
      {
        problem_id: 11,
        test_case_id: 3,
        input: 'Charlie',
        expected_output: 'Hello, Charlie',
        is_hidden: true,
        weight: 1.0,
        created_at: new Date()
      }
    ];

    // Upsert problem 11
    const problemResult = await problemsCollection.updateOne(
      { problem_id: 11 },
      { $set: problem11 },
      { upsert: true }
    );

    console.log('Problem 11 upserted:', problemResult.upsertedId || 'Updated existing');

    // Delete existing test cases for problem 11
    await testCasesCollection.deleteMany({ problem_id: 11 });

    // Insert test cases
    const testCasesResult = await testCasesCollection.insertMany(testCases11);
    console.log('Test cases inserted:', testCasesResult.insertedCount);

    console.log('\n✅ Problem 11 (Session 3, Case 1: Getting Simple Input) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem11()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
