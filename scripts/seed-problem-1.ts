import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem1() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 1: Case 1 - Simple Output Message
    const problem1 = {
      problem_id: 1,
      session_id: 1,
      title: 'Simple Output Message',
      description: 'Learn to use the print() function to display messages in Python.',
      question: `Print the text: Welcome to the Python Space Program!`,
      difficulty: 'Intro',
      example_code: '# Write your code here\n',
      sample_input: '',
      sample_output: 'Welcome to the Python Space Program!',
      age_group: '11-14',
      level_number: 1,
      metadata: {
        concepts: ['print() function', 'string output', 'basic syntax'],
        space_theme: true,
        estimated_time_minutes: 5
      },

      // Session-level content
      session_title: 'Session 1: Understanding Output & Displaying Messages in Python',
      session_introduction: `Welcome to your first step in Python programming! The print() function is the most basic and essential tool you'll use. It allows your program to communicate by displaying text messages on the screen. Think of it as giving your program a voice — whether you're displaying a welcome message, announcing mission status, or sharing important information with users. Every Python journey begins with learning how to make your program "speak" using print()!`,

      // Case-specific content
      case_number: 1,
      case_title: 'Simple Output Message',
      case_overview: `Learn how to use the print() function to display text messages on the screen. This is the foundation of all Python programming!`,
      case_code: `# Here is a sample line of code that prints text:
print("Hello, World!")

# You can also store text in a variable and print it:
my_message = "Hello, World!"
print(my_message)

# The above code will print: Hello, World!

# Now it's your turn! Use print() to display the required message.`,
      case_explanation: `**How print() works:**

● The print() function displays text on the screen
● Text must be wrapped in quotes: "like this"
● The message inside the quotes will appear exactly as written

**Input Format:**
You do not need to read any input for this challenge.

**Output Format:**
Print the exact message shown in the question.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Test cases for Problem 1 - Simple for intro level
    const testCases1 = [
      {
        problem_id: 1,
        test_case_id: 1,
        input: '',
        expected_output: 'Welcome to the Python Space Program!',
        is_hidden: false,
        weight: 1.0,
        created_at: new Date()
      }
    ];

    // Upsert problem 1
    const problemResult = await problemsCollection.updateOne(
      { problem_id: 1 },
      { $set: problem1 },
      { upsert: true }
    );

    console.log('Problem 1 upserted:', problemResult.upsertedId || 'Updated existing');

    // Delete existing test cases for problem 1
    await testCasesCollection.deleteMany({ problem_id: 1 });

    // Insert test cases
    const testCasesResult = await testCasesCollection.insertMany(testCases1);
    console.log('Test cases inserted:', testCasesResult.insertedCount);

    console.log('\n✅ Problem 1 (Case 1: Simple Output Message) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem1()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
