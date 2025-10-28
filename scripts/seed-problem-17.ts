import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem17() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 17: Session 4, Case 2 - Updating Mission Values
    const problem17 = {
      problem_id: 17,
      session_id: 4,
      title: 'Updating Mission Values',
      description: 'Learn to use assignment operators to update and modify variable values efficiently.',
      difficulty: 'Intro',
      example_code: '# Use assignment operators to update values\n# Your code here:\n',
      sample_input: '',
      sample_output: 'Updated mission duration: 7',
      age_group: '11-14',
      level_number: 1,
      metadata: {
        concepts: ['assignment operators', 'updating values', 'compound assignment', 'variables'],
        space_theme: true,
        estimated_time_minutes: 10,
        test_protocol: 'Students should create variable mission_days=5, use += to add 2, and print "Updated mission duration: 7"'
      },

      // Session-level content
      session_title: 'Session 4: Understanding Operators in Python',
      session_introduction: `Operators are unique symbols in Python that let you work with variables and values. Like buttons on a mission control panel, they are vital tools that support the thought, calculation, and decision-making processes of your programs. Operators are essential, whether they are determining a rover's speed, updating the fuel left on a mission, or making sure all systems are prepared for launch. Logical operators enable your program to make decisions based on conditions; assignment operators allow you to store and update values; and arithmetic operators assist you in performing calculations such as addition and subtraction. You can take control of your code's flow and your mission by becoming proficient with these operators.`,

      // Case-specific content
      case_number: 2,
      case_title: 'Updating Mission Values',
      case_overview: `In addition to storing values in variables, assignment operators in Python allow you to update and change those values while your program executes. The equals sign (=), which gives a variable a value, is the most basic assignment operator. However, Python also offers shortcuts like +=, -=, *=, and others that enable you to quickly alter a variable's value according to its current state.`,
      case_code: `# Sample Example:
battery_level = 100
battery_level -= 15
print("Battery remaining:", battery_level)

# Now you try:
# Create a variable mission_days with value 5
# Use += to add 2 to mission_days
# Print "Updated mission duration: [mission_days]"`,
      case_explanation: `| Operator | Example | Meaning |
|----------|---------|---------|
| = | x = 5 | Assign value |
| += | x += 3 | Add and assign |
| -= | x -= 2 | Subtract and assign |
| *= | x *= 4 | Multiply and assign |
| /= | x /= 2 | Divide and assign |

Hints:
● Create a variable and assign it an initial value
● Use += to add a value to the existing variable
● This is a shortcut for: mission_days = mission_days + 2
● Print using the exact format: "Updated mission duration: [mission_days]"`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Test cases for Problem 17
    const testCases17 = [
      {
        problem_id: 17,
        test_case_id: 1,
        input: '',
        expected_output: 'Updated mission duration: 7',
        is_hidden: false,
        weight: 1.0,
        created_at: new Date()
      }
    ];

    // Upsert problem 17
    const problemResult = await problemsCollection.updateOne(
      { problem_id: 17 },
      { $set: problem17 },
      { upsert: true }
    );

    console.log('Problem 17 upserted:', problemResult.upsertedId || 'Updated existing');

    // Delete existing test cases for problem 17
    await testCasesCollection.deleteMany({ problem_id: 17 });

    // Insert test cases
    const testCasesResult = await testCasesCollection.insertMany(testCases17);
    console.log('Test cases inserted:', testCasesResult.insertedCount);

    console.log('\n✅ Problem 17 (Session 4, Case 2: Updating Mission Values) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem17()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
