import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem2() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 2: Case 2 - Output with Numbers
    const problem2 = {
      problem_id: 2,
      session_id: 1,
      title: 'Output with Numbers',
      description: 'Learn to display both text and numbers using the print() function.',
      question: `Print the text "Rocket speed is" followed by the number 27500 and then "km/h"`,
      difficulty: 'Intro',
      example_code: '# Write your code here\n',
      sample_input: '',
      sample_output: 'Rocket speed is 27500 km/h',
      age_group: '11-14',
      level_number: 1,
      metadata: {
        concepts: ['print() function', 'printing numbers', 'combining text and numbers'],
        space_theme: true,
        estimated_time_minutes: 5
      },

      // Session-level content
      session_title: 'Session 1: Understanding Output & Displaying Messages in Python',
      session_introduction: `Now that you know how to print text, let's level up! Python can display numbers just as easily as text. This is incredibly useful for showing data like rocket speeds, mission countdown timers, distances to planets, or temperature readings. You can even mix text and numbers in the same print() statement to create informative messages. Python automatically handles displaying numbers, making it simple to share numeric information with users.`,

      // Case-specific content
      case_number: 2,
      case_title: 'Output with Numbers',
      case_overview: `Learn to combine text and numbers in a single print statement. This is essential for displaying measurements, statistics, and data.`,
      case_code: `# You can print numbers directly:
print(42)

# You can mix text and numbers using commas:
print("The answer is", 42)

# Python automatically adds spaces between items:
print("Distance:", 384400, "km")

# The above prints: Distance: 384400 km

# Now print the required message with text and numbers!`,
      case_explanation: `**Printing Text and Numbers:**

● Use commas to separate text and numbers: print("text", number, "more text")
● Python automatically adds spaces between comma-separated items
● Numbers don't need quotes - only text needs quotes

**Input Format:**
You do not need to read any input for this challenge.

**Output Format:**
Print the exact message with the number as shown in the question.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Test cases for Problem 2 - Simple for intro level
    const testCases2 = [
      {
        problem_id: 2,
        test_case_id: 1,
        input: '',
        expected_output: 'Rocket speed is 27500 km/h',
        is_hidden: false,
        weight: 1.0,
        created_at: new Date()
      }
    ];

    // Upsert problem 2
    const problemResult = await problemsCollection.updateOne(
      { problem_id: 2 },
      { $set: problem2 },
      { upsert: true }
    );

    console.log('Problem 2 upserted:', problemResult.upsertedId || 'Updated existing');

    // Delete existing test cases for problem 2
    await testCasesCollection.deleteMany({ problem_id: 2 });

    // Insert test cases
    const testCasesResult = await testCasesCollection.insertMany(testCases2);
    console.log('Test cases inserted:', testCasesResult.insertedCount);

    console.log('\n✅ Problem 2 (Case 2: Output with Numbers) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem2()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
