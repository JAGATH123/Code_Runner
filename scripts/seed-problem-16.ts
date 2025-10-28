import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem16() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 16: Session 4, Case 1 - Performing Calculations
    const problem16 = {
      problem_id: 16,
      session_id: 4,
      title: 'Performing Calculations',
      description: 'Learn to use arithmetic operators to perform basic mathematical operations.',
      difficulty: 'Intro',
      example_code: '# Perform calculations using arithmetic operators\n# Your code here:\n',
      sample_input: '',
      sample_output: 'Total fuel: 500',
      age_group: '11-14',
      level_number: 1,
      metadata: {
        concepts: ['arithmetic operators', 'addition', 'subtraction', 'variables', 'calculations'],
        space_theme: true,
        estimated_time_minutes: 10,
        test_protocol: 'Students should create variables fuel_used=150 and fuel_remaining=350, calculate total_fuel by adding them, and print "Total fuel: 500"'
      },

      // Session-level content
      session_title: 'Session 4: Understanding Operators in Python',
      session_introduction: `Operators are unique symbols in Python that let you work with variables and values. Like buttons on a mission control panel, they are vital tools that support the thought, calculation, and decision-making processes of your programs. Operators are essential, whether they are determining a rover's speed, updating the fuel left on a mission, or making sure all systems are prepared for launch. Logical operators enable your program to make decisions based on conditions; assignment operators allow you to store and update values; and arithmetic operators assist you in performing calculations such as addition and subtraction. You can take control of your code's flow and your mission by becoming proficient with these operators.`,

      // Case-specific content
      case_number: 1,
      case_title: 'Performing Calculations',
      case_overview: `Basic mathematical operations like addition, subtraction, multiplication, and division are carried out in Python using arithmetic operators. When working with numbers in real-world situations, such as figuring out how much fuel has been used overall, how fast a rover is on average, or how much distance is left to travel, these operators are incredibly helpful.`,
      case_code: `# Sample Example:
crew_members = 8
backup_crew = 4
total_crew = crew_members + backup_crew
print("Total crew:", total_crew)

# Now you try:
# Create a variable fuel_used with value 150
# Create a variable fuel_remaining with value 350
# Calculate total_fuel by adding fuel_used and fuel_remaining
# Print "Total fuel: [total_fuel]"`,
      case_explanation: `| Operator | Symbol | Example | Meaning |
|----------|--------|---------|---------|
| Add | + | 5 + 3 → 8 | Addition |
| Subtract | - | 10 - 4 → 6 | Subtraction |
| Multiply | * | 6 * 2 → 12 | Multiplication |
| Divide | / | 8 / 2 → 4.0 | Division (float) |
| Modulus | % | 10 % 3 → 1 | Remainder |

Hints:
● Create two variables with the given values
● Use the + operator to add them together
● Store the result in a new variable called total_fuel
● Print using the exact format: "Total fuel: [total_fuel]"`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Test cases for Problem 16
    const testCases16 = [
      {
        problem_id: 16,
        test_case_id: 1,
        input: '',
        expected_output: 'Total fuel: 500',
        is_hidden: false,
        weight: 1.0,
        created_at: new Date()
      }
    ];

    // Upsert problem 16
    const problemResult = await problemsCollection.updateOne(
      { problem_id: 16 },
      { $set: problem16 },
      { upsert: true }
    );

    console.log('Problem 16 upserted:', problemResult.upsertedId || 'Updated existing');

    // Delete existing test cases for problem 16
    await testCasesCollection.deleteMany({ problem_id: 16 });

    // Insert test cases
    const testCasesResult = await testCasesCollection.insertMany(testCases16);
    console.log('Test cases inserted:', testCasesResult.insertedCount);

    console.log('\n✅ Problem 16 (Session 4, Case 1: Performing Calculations) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem16()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
