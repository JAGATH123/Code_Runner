import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem13() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 13: Session 3, Case 3 - Working with Decimals
    const problem13 = {
      problem_id: 13,
      session_id: 3,
      title: 'Working with Decimals',
      description: 'Learn to use float() to handle decimal inputs for precise calculations.',
      question: `Get a distance in kilometers using input().
Convert it to a float (decimal number) using float().
Multiply the distance by 1000 to convert to meters.
Print "Distance in meters is " followed by the result.`,
      difficulty: 'Intro',
      example_code: '# Write your code here\n',
      sample_input: '5.5',
      sample_output: 'Distance in meters is 5500.0',
      age_group: '11-14',
      level_number: 1,
      metadata: {
        concepts: ['input() function', 'type conversion', 'float()', 'decimal numbers', 'arithmetic operations'],
        space_theme: true,
        estimated_time_minutes: 10,
        test_protocol: 'Students should get distance in km using input(), convert to float using float(), and print distance in meters'
      },

      // Session-level content
      session_title: 'Session 3: Input Function and Type Conversions',
      session_introduction: `In Python, the input() function allows your program to listen to the user and collect information. Everything you type using input() is treated as a string. But often, we need to convert this input into numbers for calculations this is where type conversion helps.`,

      // Case-specific content
      case_number: 3,
      case_title: 'Working with Decimals',
      case_overview: `Use float() to handle decimal inputs like distance or fuel levels.`,
      case_code: `# float() converts strings to decimal numbers
# Use it when you need decimal precision

# Example 1: Converting to float
distance_str = input()         # Gets "5.5" as a string
distance_num = float(distance_str)  # Converts to float 5.5
meters = distance_num * 1000   # Math with decimals: 5500.0
print("Result:", meters)

# Example 2: Shorter way
fuel = input()
fuel = float(fuel)            # Convert string to float
total = fuel * 1000           # Do math
print("Fuel in ml:", total)

# Example 3: All in one line
temp = float(input())         # Get input and convert immediately
print("Doubled:", temp * 2)

# Remember:
# - int() converts to whole numbers (no decimals)
# - float() converts to decimal numbers
# - Use float() when precision matters`,
      case_explanation: `**Float Conversion:**

● float() converts string to decimal number
● Use when you need decimal precision
● Example: distance = float(input())
● Then you can do math with decimals

**Input Format:**
One line containing a decimal number (the distance in km)

**Output Format:**
Print "Distance in meters is " followed by distance * 1000`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Test cases for Problem 13
    const testCases13 = [
      {
        problem_id: 13,
        test_case_id: 1,
        input: '5.5',
        expected_output: 'Distance in meters is 5500.0',
        is_hidden: false,
        weight: 1.0,
        created_at: new Date()
      },
      {
        problem_id: 13,
        test_case_id: 2,
        input: '10.2',
        expected_output: 'Distance in meters is 10200.0',
        is_hidden: true,
        weight: 1.0,
        created_at: new Date()
      },
      {
        problem_id: 13,
        test_case_id: 3,
        input: '3.75',
        expected_output: 'Distance in meters is 3750.0',
        is_hidden: true,
        weight: 1.0,
        created_at: new Date()
      }
    ];

    // Upsert problem 13
    const problemResult = await problemsCollection.updateOne(
      { problem_id: 13 },
      { $set: problem13 },
      { upsert: true }
    );

    console.log('Problem 13 upserted:', problemResult.upsertedId || 'Updated existing');

    // Delete existing test cases for problem 13
    await testCasesCollection.deleteMany({ problem_id: 13 });

    // Insert test cases
    const testCasesResult = await testCasesCollection.insertMany(testCases13);
    console.log('Test cases inserted:', testCasesResult.insertedCount);

    console.log('\n✅ Problem 13 (Session 3, Case 3: Working with Decimals) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem13()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
