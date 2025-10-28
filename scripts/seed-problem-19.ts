import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem19() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 19: Session 4, Case 4 - Combining All Operators
    const problem19 = {
      problem_id: 19,
      session_id: 4,
      title: 'Combining All Operators',
      description: 'Learn to combine arithmetic, assignment, and logical operators to build smarter programs that compute, update, and make decisions.',
      difficulty: 'Intro',
      example_code: '# Combine all operators to solve complex problems\n# Your code here:\n',
      sample_input: '',
      sample_output: 'Food sufficient for mission? True',
      age_group: '11-14',
      level_number: 1,
      metadata: {
        concepts: ['arithmetic operators', 'assignment operators', 'logical operators', 'comparisons', 'decision making', 'combining operators'],
        space_theme: true,
        estimated_time_minutes: 12,
        test_protocol: 'Students should create days_remaining=10, use -= to subtract 1, create food_packs=25, use >= comparison to check if food_packs >= days_remaining, and print "Food sufficient for mission? True"'
      },

      // Session-level content
      session_title: 'Session 4: Understanding Operators in Python',
      session_introduction: `Operators are unique symbols in Python that let you work with variables and values. Like buttons on a mission control panel, they are vital tools that support the thought, calculation, and decision-making processes of your programs. Operators are essential, whether they are determining a rover's speed, updating the fuel left on a mission, or making sure all systems are prepared for launch. Logical operators enable your program to make decisions based on conditions; assignment operators allow you to store and update values; and arithmetic operators assist you in performing calculations such as addition and subtraction. You can take control of your code's flow and your mission by becoming proficient with these operators.`,

      // Case-specific content
      case_number: 4,
      case_title: 'Combining All Operators',
      case_overview: `Now that you understand arithmetic, assignment, and logical operators separately, it's time to use them together. Real missions often involve calculating values (like speed or fuel), updating those values as things change, and making decisions based on conditions. By combining all three, you can build smarter programs that not only compute and update data but also decide what actions to take — just like real mission control systems.`,
      case_code: `# Sample Example:
battery_level = 100
battery_level -= 20
backup_power = 30
power_sufficient = (battery_level + backup_power) > 100
print("Power backup ready?", power_sufficient)

# Now you try:
# Create days_remaining with value 10
# Use -= to subtract 1 from days_remaining
# Create food_packs with value 25
# Check if food_packs >= days_remaining
# Store result in enough_food
# Print "Food sufficient for mission? [enough_food]"`,
      case_explanation: `Combining Operators:
● Arithmetic: Perform calculations (+, -, *, /, %)
● Assignment: Update values (=, +=, -=, *=, /=)
● Comparison: Compare values (>, <, >=, <=, ==, !=)
● Logical: Combine conditions (and, or, not)

Hints:
● Start with arithmetic/assignment to calculate values
● Use comparison operators to evaluate conditions
● Comparison results give True or False
● >= means "greater than or equal to"
● Format: "Food sufficient for mission? [enough_food]"`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Test cases for Problem 19
    const testCases19 = [
      {
        problem_id: 19,
        test_case_id: 1,
        input: '',
        expected_output: 'Food sufficient for mission? True',
        is_hidden: false,
        weight: 1.0,
        created_at: new Date()
      }
    ];

    // Upsert problem 19
    const problemResult = await problemsCollection.updateOne(
      { problem_id: 19 },
      { $set: problem19 },
      { upsert: true }
    );

    console.log('Problem 19 upserted:', problemResult.upsertedId || 'Updated existing');

    // Delete existing test cases for problem 19
    await testCasesCollection.deleteMany({ problem_id: 19 });

    // Insert test cases
    const testCasesResult = await testCasesCollection.insertMany(testCases19);
    console.log('Test cases inserted:', testCasesResult.insertedCount);

    console.log('\n✅ Problem 19 (Session 4, Case 4: Combining All Operators) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem19()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
