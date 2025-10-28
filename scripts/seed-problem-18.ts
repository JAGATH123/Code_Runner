import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem18() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 18: Session 4, Case 3 - Logical Operators
    const problem18 = {
      problem_id: 18,
      session_id: 4,
      title: 'Logical Operators',
      description: 'Learn to use logical operators (and, or, not) to make decisions based on multiple conditions.',
      difficulty: 'Intro',
      example_code: '# Use logical operators to evaluate conditions\n# Your code here:\n',
      sample_input: '',
      sample_output: 'Mission Ready? True',
      age_group: '11-14',
      level_number: 1,
      metadata: {
        concepts: ['logical operators', 'boolean logic', 'and', 'or', 'not', 'conditions', 'decision making'],
        space_theme: true,
        estimated_time_minutes: 12,
        test_protocol: 'Students should create systems_ready=True, fuel_level=80, use and operator to check both conditions, and print "Mission Ready? True"'
      },

      // Session-level content
      session_title: 'Session 4: Understanding Operators in Python',
      session_introduction: `Operators are unique symbols in Python that let you work with variables and values. Like buttons on a mission control panel, they are vital tools that support the thought, calculation, and decision-making processes of your programs. Operators are essential, whether they are determining a rover's speed, updating the fuel left on a mission, or making sure all systems are prepared for launch. Logical operators enable your program to make decisions based on conditions; assignment operators allow you to store and update values; and arithmetic operators assist you in performing calculations such as addition and subtraction. You can take control of your code's flow and your mission by becoming proficient with these operators.`,

      // Case-specific content
      case_number: 3,
      case_title: 'Logical Operators',
      case_overview: `Python logical operators are crucial for code decision-making. Like a real mission control system determining whether it's safe to launch, they enable your program to assess various conditions and decide whether particular actions should be taken. And, or, and not are the three primary logical operators. To determine what comes next, these aid in combining and comparing Boolean expressions (True or False values).`,
      case_code: `# Sample Example:
oxygen_ready = True
temperature = 25
safe_environment = oxygen_ready and temperature < 30
print("Safe to proceed?", safe_environment)

# Now you try:
# Create a variable systems_ready with value True
# Create a variable fuel_level with value 80
# Use 'and' to check: systems_ready and fuel_level > 50
# Store the result in mission_go
# Print "Mission Ready? [mission_go]"`,
      case_explanation: `| Operator | Symbol | Description |
|----------|--------|-------------|
| AND | and | True if both conditions are true |
| OR | or | True if any one is true |
| NOT | not | Inverts the result |

Hints:
● Logical operators work with boolean values (True/False)
● 'and' requires BOTH conditions to be true
● 'or' requires AT LEAST ONE condition to be true
● 'not' flips True to False and False to True
● You can combine comparisons: fuel_level > 50
● Format: "Mission Ready? [mission_go]"`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Test cases for Problem 18
    const testCases18 = [
      {
        problem_id: 18,
        test_case_id: 1,
        input: '',
        expected_output: 'Mission Ready? True',
        is_hidden: false,
        weight: 1.0,
        created_at: new Date()
      }
    ];

    // Upsert problem 18
    const problemResult = await problemsCollection.updateOne(
      { problem_id: 18 },
      { $set: problem18 },
      { upsert: true }
    );

    console.log('Problem 18 upserted:', problemResult.upsertedId || 'Updated existing');

    // Delete existing test cases for problem 18
    await testCasesCollection.deleteMany({ problem_id: 18 });

    // Insert test cases
    const testCasesResult = await testCasesCollection.insertMany(testCases18);
    console.log('Test cases inserted:', testCasesResult.insertedCount);

    console.log('\n✅ Problem 18 (Session 4, Case 3: Logical Operators) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem18()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
