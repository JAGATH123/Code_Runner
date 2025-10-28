import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem14() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 14: Session 3, Case 4 - Mixed Input and Conversion
    const problem14 = {
      problem_id: 14,
      session_id: 3,
      title: 'Mixed Input and Conversion',
      description: 'Learn to collect multiple values and convert them as needed for calculations.',
      question: `Get the number of mission days using input().
Convert it to an integer using int().
Calculate total hours by multiplying days by 24.
Print "Mission Duration: " followed by total_hours and " hours".`,
      difficulty: 'Intro',
      example_code: '# Write your code here\n',
      sample_input: '7',
      sample_output: 'Mission Duration: 168 hours',
      age_group: '11-14',
      level_number: 1,
      metadata: {
        concepts: ['input() function', 'type conversion', 'int()', 'inline conversion', 'arithmetic operations'],
        space_theme: true,
        estimated_time_minutes: 10,
        test_protocol: 'Students should get mission days using input(), convert to integer using int(), and print mission duration in hours'
      },

      // Session-level content
      session_title: 'Session 3: Input Function and Type Conversions',
      session_introduction: `In Python, the input() function allows your program to listen to the user and collect information. Everything you type using input() is treated as a string. But often, we need to convert this input into numbers for calculations this is where type conversion helps.`,

      // Case-specific content
      case_number: 4,
      case_title: 'Mixed Input and Conversion',
      case_overview: `Collect multiple values and convert them as needed for calculations.`,
      case_code: `# You can combine input() and conversion in one line
# This makes your code shorter and cleaner

# Example 1: Two-step approach
crew_str = input()
crew_num = int(crew_str)
suits = crew_num * 2
print("Suits needed:", suits)

# Example 2: One-step approach (inline conversion)
crew = int(input())       # Get input and convert immediately
suits = crew * 2
print("Suits needed:", suits)

# Example 3: With float
distance = float(input())  # Get and convert to decimal
doubled = distance * 2
print("Double:", doubled)

# Example 4: Using the result directly
print("Result:", int(input()) * 5)

# The inline approach is cleaner:
# int(input()) instead of input() then int()`,
      case_explanation: `**Inline Conversion:**

● Combine input() and int() in one line
● Syntax: days = int(input())
● This is shorter than doing it in two steps
● Same works with float: price = float(input())

**Input Format:**
One line containing an integer (number of days)

**Output Format:**
Print "Mission Duration: " followed by hours and " hours"`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Test cases for Problem 14
    const testCases14 = [
      {
        problem_id: 14,
        test_case_id: 1,
        input: '7',
        expected_output: 'Mission Duration: 168 hours',
        is_hidden: false,
        weight: 1.0,
        created_at: new Date()
      },
      {
        problem_id: 14,
        test_case_id: 2,
        input: '10',
        expected_output: 'Mission Duration: 240 hours',
        is_hidden: true,
        weight: 1.0,
        created_at: new Date()
      },
      {
        problem_id: 14,
        test_case_id: 3,
        input: '30',
        expected_output: 'Mission Duration: 720 hours',
        is_hidden: true,
        weight: 1.0,
        created_at: new Date()
      }
    ];

    // Upsert problem 14
    const problemResult = await problemsCollection.updateOne(
      { problem_id: 14 },
      { $set: problem14 },
      { upsert: true }
    );

    console.log('Problem 14 upserted:', problemResult.upsertedId || 'Updated existing');

    // Delete existing test cases for problem 14
    await testCasesCollection.deleteMany({ problem_id: 14 });

    // Insert test cases
    const testCasesResult = await testCasesCollection.insertMany(testCases14);
    console.log('Test cases inserted:', testCasesResult.insertedCount);

    console.log('\n✅ Problem 14 (Session 3, Case 4: Mixed Input and Conversion) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem14()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
