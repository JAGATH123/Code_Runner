import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem10() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 10: Session 2, Case 5 - Getting Input from the User
    const problem10 = {
      problem_id: 10,
      session_id: 2,
      title: 'Getting Input from the User',
      description: 'Learn to use the input() function to collect data from users during program execution.',
      question: `Use input() to get two values from the user:
1. Get the user's name and store it in a variable called astronaut_name
2. Get the mission time in days and store it in a variable called mission_time

Then print two lines:
1. "Welcome, Commander " followed by the astronaut_name
2. "Mission duration is " followed by mission_time and " days"

`,
      difficulty: 'Intro',
      example_code: '# Write your code here\n',
      sample_input: 'Alex\n7',
      sample_output: 'Welcome, Commander Alex\nMission duration is 7 days',
      age_group: '11-14',
      level_number: 1,
      metadata: {
        concepts: ['input() function', 'user input', 'interactive programs', 'string input'],
        space_theme: true,
        estimated_time_minutes: 10
      },

      // Session-level content
      session_title: 'Session 2: Understanding Variables, Data Types',
      session_introduction: `Variables become even more powerful when you can get values from users! The input() function lets your program interact with people by asking questions and receiving answers. This makes your code dynamic and personal — whether you're creating games, collecting data, or building interactive missions. Input makes your programs come alive! Remember: input() always returns text (string), even if the user types a number. Let's learn how to make interactive Python programs!`,

      // Case-specific content
      case_number: 5,
      case_title: 'Getting Input from the User',
      case_overview: `Variables become even more useful when we get values from the user. Python's input() function lets you type something during the program's run — perfect for interactive missions, games, or data collection.`,
      case_code: `# The input() function gets data from the user
# It always returns a string (text)

# Basic syntax:
variable_name = input()

# You can also provide a prompt message:
name = input("What is your name? ")
print("Hello,", name)

# More examples:
planet = input("Enter planet name: ")
print("Destination:", planet)

distance = input("Enter distance in km: ")
print("Travel distance:", distance, "km")

age = input("Enter your age: ")
print("You are", age, "years old")

# Remember:
# - input() returns a string
# - You can print multiple values with commas
# - Example: print("Welcome,", name)`,
      case_explanation: `**How input() works:**

● Syntax: variable = input()
● The program pauses and waits for the user to type something
● The user presses Enter to submit their input
● input() always returns a string (text type)

**Input Format:**
Line 1: The astronaut's name (e.g., Alex)
Line 2: Mission duration in days (e.g., 7)

**Output Format:**
Line 1: Welcome, Commander [name]
Line 2: Mission duration is [days] days`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Test cases for Problem 10
    const testCases10 = [
      {
        problem_id: 10,
        test_case_id: 1,
        input: 'Alex\n7',
        expected_output: 'Welcome, Commander Alex\nMission duration is 7 days',
        is_hidden: false,
        weight: 1.0,
        created_at: new Date()
      }
    ];

    // Upsert problem 10
    const problemResult = await problemsCollection.updateOne(
      { problem_id: 10 },
      { $set: problem10 },
      { upsert: true }
    );

    console.log('Problem 10 upserted:', problemResult.upsertedId || 'Updated existing');

    // Delete existing test cases for problem 10
    await testCasesCollection.deleteMany({ problem_id: 10 });

    // Insert test cases
    const testCasesResult = await testCasesCollection.insertMany(testCases10);
    console.log('Test cases inserted:', testCasesResult.insertedCount);

    console.log('\n✅ Problem 10 (Session 2, Case 5: Getting Input from the User) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem10()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
