import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem12() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 12: Session 3, Case 2 - Converting Input to Numbers
    const problem12 = {
      problem_id: 12,
      session_id: 3,
      title: 'Converting Input to Numbers',
      description: 'Learn to convert string input to numbers for calculations using int() or float().',
      question: `Get the user's age using input().
Convert it to an integer using int().
Add 1 to the age.
Print "Next year, you will be " followed by the result.`,
      difficulty: 'Intro',
      example_code: '# Write your code here\n',
      sample_input: '15',
      sample_output: 'Next year, you will be 16',
      age_group: '11-14',
      level_number: 1,
      metadata: {
        concepts: ['input() function', 'type conversion', 'int()', 'arithmetic operations', 'string to integer'],
        space_theme: true,
        estimated_time_minutes: 10,
        test_protocol: 'Students should get user age using input(), convert to integer using int(), and print next year age'
      },

      // Session-level content
      session_title: 'Session 3: Input Function and Type Conversions',
      session_introduction: `In Python, the input() function allows your program to listen to the user and collect information. Everything you type using input() is treated as a string. But often, we need to convert this input into numbers for calculations this is where type conversion helps.`,

      // Case-specific content
      case_number: 2,
      case_title: 'Converting Input to Numbers',
      case_overview: `To perform calculations, convert strings to numbers using int() or float().`,
      case_code: `# input() always returns a string
# To do math, convert to a number using int() or float()

# Example 1: Converting to integer
age_str = input()          # Gets "15" as a string
age_num = int(age_str)     # Converts to integer 15
next_age = age_num + 1     # Now we can do math: 16
print(next_age)

# Example 2: Shorter way
rockets = input()
rockets = int(rockets)     # Convert string to integer
total = rockets * 2        # Do math
print("Total:", total)

# Example 3: All in one line
distance = int(input())    # Get input and convert immediately
print("Double distance:", distance * 2)

# Remember:
# - input() returns a string
# - int() converts string to whole number
# - Then you can use +, -, *, / operators`,
      case_explanation: `**Type Conversion:**

● input() returns a string (text)
● Use int() to convert string to integer
● Then you can perform math operations
● Example: age = int(input())

**Input Format:**
One line containing an integer (the age)

**Output Format:**
Print "Next year, you will be " followed by age + 1`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Test cases for Problem 12
    const testCases12 = [
      {
        problem_id: 12,
        test_case_id: 1,
        input: '15',
        expected_output: 'Next year, you will be 16',
        is_hidden: false,
        weight: 1.0,
        created_at: new Date()
      },
      {
        problem_id: 12,
        test_case_id: 2,
        input: '10',
        expected_output: 'Next year, you will be 11',
        is_hidden: true,
        weight: 1.0,
        created_at: new Date()
      },
      {
        problem_id: 12,
        test_case_id: 3,
        input: '25',
        expected_output: 'Next year, you will be 26',
        is_hidden: true,
        weight: 1.0,
        created_at: new Date()
      }
    ];

    // Upsert problem 12
    const problemResult = await problemsCollection.updateOne(
      { problem_id: 12 },
      { $set: problem12 },
      { upsert: true }
    );

    console.log('Problem 12 upserted:', problemResult.upsertedId || 'Updated existing');

    // Delete existing test cases for problem 12
    await testCasesCollection.deleteMany({ problem_id: 12 });

    // Insert test cases
    const testCasesResult = await testCasesCollection.insertMany(testCases12);
    console.log('Test cases inserted:', testCasesResult.insertedCount);

    console.log('\n✅ Problem 12 (Session 3, Case 2: Converting Input to Numbers) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem12()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
