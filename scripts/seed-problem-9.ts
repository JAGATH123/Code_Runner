import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem9() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 9: Session 2, Case 4 - Changing Values and Types
    const problem9 = {
      problem_id: 9,
      session_id: 2,
      title: 'Changing Values and Types',
      description: 'Learn how variables can change their values and even their data types during program execution.',
      question: `Create a variable called sample and assign it the string "rock"
Print the sample variable
Then reassign sample to the number 42
Print the sample variable again`,
      difficulty: 'Intro',
      example_code: '# Write your code here\n',
      sample_input: '',
      sample_output: 'rock\n42',
      age_group: '11-14',
      level_number: 1,
      metadata: {
        concepts: ['variable reassignment', 'dynamic typing', 'mutable variables', 'type flexibility'],
        space_theme: true,
        estimated_time_minutes: 8
      },

      // Session-level content
      session_title: 'Session 2: Understanding Variables, Data Types',
      session_introduction: `One of Python's most powerful (and sometimes tricky) features is that variables can change! You can reassign a variable to hold a completely different value, and even switch its data type from text to number or vice versa. This flexibility makes Python easy to work with, but it also means you need to be careful. If you're not tracking what type your variable holds, you might introduce bugs. Let's explore how variables can transform during program execution!`,

      // Case-specific content
      case_number: 4,
      case_title: 'Changing Values and Types',
      case_overview: `Variables can change value during the program. Python also lets you reassign a variable to a different type — but be careful with this flexibility!`,
      case_code: `# Variables can be reassigned to new values
# Python even allows changing the data type!

# Example 1: Changing values (same type)
countdown = 10
print(countdown)       # Prints: 10

countdown = 5
print(countdown)       # Prints: 5

# Example 2: Changing types (string to number)
status = "Launching"
print(status)          # Prints: Launching

status = 100           # Now it's a number!
print(status)          # Prints: 100

# Example 3: Number to string
score = 99
print(score)           # Prints: 99

score = "Perfect!"
print(score)           # Prints: Perfect!

# To reassign: variable_name = new_value
# Python will replace the old value with the new one`,
      case_explanation: `**How Variable Reassignment Works:**

● Use the same syntax as creating a variable: variable_name = new_value
● The old value is replaced with the new value
● Python allows changing data types (dynamic typing)
● This is powerful but requires careful tracking

**Input Format:**
You do not need to read any input for this challenge.

**Output Format:**
Print the variable twice (once before reassignment, once after):
Line 1: rock
Line 2: 42`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Test cases for Problem 9
    const testCases9 = [
      {
        problem_id: 9,
        test_case_id: 1,
        input: '',
        expected_output: 'rock\n42',
        is_hidden: false,
        weight: 1.0,
        created_at: new Date()
      }
    ];

    // Upsert problem 9
    const problemResult = await problemsCollection.updateOne(
      { problem_id: 9 },
      { $set: problem9 },
      { upsert: true }
    );

    console.log('Problem 9 upserted:', problemResult.upsertedId || 'Updated existing');

    // Delete existing test cases for problem 9
    await testCasesCollection.deleteMany({ problem_id: 9 });

    // Insert test cases
    const testCasesResult = await testCasesCollection.insertMany(testCases9);
    console.log('Test cases inserted:', testCasesResult.insertedCount);

    console.log('\n✅ Problem 9 (Session 2, Case 4: Changing Values and Types) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem9()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
