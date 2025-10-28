import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem7() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 7: Session 2, Case 2 - Data Types in Action
    const problem7 = {
      problem_id: 7,
      session_id: 2,
      title: 'Data Types in Action',
      description: 'Learn about different data types in Python: int, float, str, and bool.',
      question: `Create four variables with different data types:
- mission_days = 30 (integer)
- oxygen_level = 98.6 (float)
- rover_name = "Explorer-1" (string)
- mission_active = True (boolean)

Print all four variables, each on a new line.`,
      difficulty: 'Intro',
      example_code: '# Write your code here\n',
      sample_input: '',
      sample_output: '30\n98.6\nExplorer-1\nTrue',
      age_group: '11-14',
      level_number: 1,
      metadata: {
        concepts: ['data types', 'int', 'float', 'str', 'bool', 'variables'],
        space_theme: true,
        estimated_time_minutes: 8
      },

      // Session-level content
      session_title: 'Session 2: Understanding Variables, Data Types',
      session_introduction: `Now let's discover the different types of data Python can work with! Every value has a type — whole numbers (int), decimals (float), text (str), or True/False (bool). Understanding data types helps you choose the right kind of variable for your task. Python is smart enough to figure out the type automatically based on the value you assign. Let's explore how different data types work in action!`,

      // Case-specific content
      case_number: 2,
      case_title: 'Data Types in Action',
      case_overview: `Learn about the four fundamental data types in Python: integers, floats, strings, and booleans.`,
      case_code: `# Python has different data types for different kinds of values:

# Integer (int) - whole numbers
count = 5
age = 25

# Float - decimal numbers
temperature = 36.6
price = 19.99

# String (str) - text in quotes
name = "Alice"
city = "Paris"

# Boolean (bool) - True or False
is_active = True
is_complete = False

# Print them:
print(count)
print(temperature)
print(name)
print(is_active)

# Now create your own variables with different types!`,
      case_explanation: `**Python Data Types:**

● **int (integer)**: Whole numbers like 30, -5, 1000
● **float**: Decimal numbers like 98.6, 3.14, -0.5
● **str (string)**: Text in quotes like "Explorer-1"
● **bool (boolean)**: True or False (capital first letter, no quotes)

**Input Format:**
You do not need to read any input for this challenge.

**Output Format:**
Print each variable on a separate line as shown in the question.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Test cases for Problem 7 - Simple for intro level
    const testCases7 = [
      {
        problem_id: 7,
        test_case_id: 1,
        input: '',
        expected_output: '30\n98.6\nExplorer-1\nTrue',
        is_hidden: false,
        weight: 1.0,
        created_at: new Date()
      }
    ];

    // Upsert problem 7
    const problemResult = await problemsCollection.updateOne(
      { problem_id: 7 },
      { $set: problem7 },
      { upsert: true }
    );

    console.log('Problem 7 upserted:', problemResult.upsertedId || 'Updated existing');

    // Delete existing test cases for problem 7
    await testCasesCollection.deleteMany({ problem_id: 7 });

    // Insert test cases
    const testCasesResult = await testCasesCollection.insertMany(testCases7);
    console.log('Test cases inserted:', testCasesResult.insertedCount);

    console.log('\n✅ Problem 7 (Session 2, Case 2: Data Types in Action) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem7()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
