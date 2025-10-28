import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem8() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 8: Session 2, Case 3 - Checking Data Types
    const problem8 = {
      problem_id: 8,
      session_id: 2,
      title: 'Checking Data Types',
      description: 'Learn to use the type() function to check what data type a variable holds.',
      question: `Create a variable called gravity with value 9.8
Then use the type() function to check its data type.
Print the result using print(type(gravity))`,
      difficulty: 'Intro',
      example_code: '# Write your code here\n',
      sample_input: '',
      sample_output: "<class 'float'>",
      age_group: '11-14',
      level_number: 1,
      metadata: {
        concepts: ['type() function', 'data types', 'debugging', 'type checking'],
        space_theme: true,
        estimated_time_minutes: 7
      },

      // Session-level content
      session_title: 'Session 2: Understanding Variables, Data Types',
      session_introduction: `Sometimes you need to know exactly what type of data a variable is holding. Is it a number? Text? A decimal? Python provides the type() function to help you find out! This is incredibly useful for debugging your code and understanding how Python is interpreting your data. The type() function reveals the "class" or category of any value, helping you catch errors before they become problems. Let's learn how to inspect our variables!`,

      // Case-specific content
      case_number: 3,
      case_title: 'Checking Data Types',
      case_overview: `Want to know what type a variable is? Use the type() function.`,
      case_code: `# The type() function tells you the data type of a variable
# Examples:

speed = 25000
print(type(speed))        # Prints: <class 'int'>

name = "Astronaut"
print(type(name))         # Prints: <class 'str'>

temperature = -270.15
print(type(temperature))  # Prints: <class 'float'>

active = True
print(type(active))       # Prints: <class 'bool'>

# Syntax: type(variable_name)
# Use it inside print() to see the result

# Now create your variable and check its type!`,
      case_explanation: `**How type() works:**

● The type() function returns the data type of any variable
● Syntax: type(variable_name)
● Always use it inside print() to see the result
● Python shows types as: <class 'type_name'>

**Input Format:**
You do not need to read any input for this challenge.

**Output Format:**
Print the type of the gravity variable (should be <class 'float'>)`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Test cases for Problem 8
    const testCases8 = [
      {
        problem_id: 8,
        test_case_id: 1,
        input: '',
        expected_output: "<class 'float'>",
        is_hidden: false,
        weight: 1.0,
        created_at: new Date()
      }
    ];

    // Upsert problem 8
    const problemResult = await problemsCollection.updateOne(
      { problem_id: 8 },
      { $set: problem8 },
      { upsert: true }
    );

    console.log('Problem 8 upserted:', problemResult.upsertedId || 'Updated existing');

    // Delete existing test cases for problem 8
    await testCasesCollection.deleteMany({ problem_id: 8 });

    // Insert test cases
    const testCasesResult = await testCasesCollection.insertMany(testCases8);
    console.log('Test cases inserted:', testCasesResult.insertedCount);

    console.log('\n✅ Problem 8 (Session 2, Case 3: Checking Data Types) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem8()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
