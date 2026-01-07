import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedProblem54() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Problem 54: Session 4, Final Task - Mission Logic System
    const problem54 = {
      problem_id: 54,
      session_id: 4,
      title: 'Mission Logic System',
      description: `NOVA-12's control panels glow with readiness. The ship is almost ready for its first flight in decades.

Astra: "Final step, Cadets. The ship needs a Launch Authorization System—automated logic that verifies ALL safety conditions before ignition. One failed check means mission abort. Let's build it."

Create the Mission Logic System that validates launch readiness.`,

      question: `Commander, it's time to build the automated Mission Logic System!

Your program should:
1. Ask for initial fuel_level (integer)
2. Ask for oxygen_level (integer)
3. Create a boolean variable: \`engine_ready = True\`
4. Simulate pre-ignition fuel consumption by reducing fuel_level by 25 using the \`-=\` operator
5. Check if ALL three conditions are met:
   - \`fuel_level > 50\` (minimum safe fuel after pre-ignition)
   - \`oxygen_level > 60\` (minimum crew life support)
   - \`engine_ready == True\` (engine systems operational)
6. If all conditions are True, print: \`"Launch approved"\`
7. If any condition is False, print: \`"Launch denied"\``,

      difficulty: 'Easy',
      example_code: `# Your code here
`,

      sample_input: `100
80`,
      sample_output: `Launch approved`,

      age_group: '11-14',
      level_number: 1,

      objectives: `- Use \`input()\` to collect system status data
- Apply the \`-=\` compound assignment operator
- Use comparison operators (\`>\`) to evaluate conditions
- Combine multiple conditions with the \`and\` logical operator
- Make decisions using \`if/else\` statements
- Output appropriate authorization messages`,

      concepts: `- Arithmetic Operators: Using \`-=\` for efficient value reduction
- Comparison Operators: Checking if values meet safety thresholds (\`>\`)
- Logical Operators: Combining multiple conditions with \`and\`
- Boolean Logic: Working with True/False values for system status
- Conditional Statements: Making decisions based on multiple criteria
- Mission-Critical Logic: Understanding how real systems validate safety conditions`,

      metadata: {
        concepts: ['arithmetic operators', 'comparison operators', 'logical operators', 'booleans', 'conditionals', 'compound assignment', 'if-else statements'],
        space_theme: true,
        story_linked: true,
        estimated_time_minutes: 25,
        is_final_task: true
      },
      // Case-specific content (Final Task)
      case_number: 6,
      case_title: 'Mission Logic System - Launch Authorization Gateway',
      // case_overview removed for final tasks (Case 6)
      case_code: `# Get system status
fuel_level = int(input())
oxygen_level = int(input())
engine_ready = True

# Simulate pre-ignition fuel consumption
fuel_level -= 25

# Check all launch conditions
if fuel_level > 50 and oxygen_level > 60 and engine_ready:
    print("Launch approved")
else:
    print("Launch denied")`,
      case_explanation: `How to Approach This Problem:
1. Get Initial Fuel Level:
   - Use \`int(input())\` to read fuel level
2. Get Oxygen Level:
   - Use \`int(input())\` to read oxygen percentage
3. Set Engine Status:
   - Create boolean: \`engine_ready = True\`
4. Simulate Pre-Ignition Consumption:
   - Use compound assignment: \`fuel_level -= 25\`
   - This is equivalent to: \`fuel_level = fuel_level - 25\`
5. Evaluate Launch Conditions:
   - Check three conditions using \`and\`:
     - \`fuel_level > 50\` - Ensures enough fuel remains after consumption
     - \`oxygen_level > 60\` - Ensures adequate life support
     - \`engine_ready\` - Confirms engine systems are operational
   - ALL conditions must be True for launch approval
6. Output Authorization:
   - If all conditions are True: print \`"Launch approved"\`
   - If any condition is False: print \`"Launch denied"\``,
      created_at: new Date(),
      updated_at: new Date()
    };

    // Upsert problem 54
    const problemResult = await problemsCollection.updateOne(
      { problem_id: 54 },
      { $set: problem54 },
      { upsert: true }
    );

    console.log('Problem 54 upserted:', problemResult.upsertedId || 'Updated existing');

    // Test cases for Problem 54
    const testCases54 = [
      // Visible test case - all conditions met
      {
        problem_id: 54,
        test_case_id: 1,
        input: '100\n80',
        expected_output: 'Launch approved',
        is_hidden: false,
        is_sample: true,
        weight: 1.0,
        created_at: new Date()
      },
      // Hidden test case - all conditions met (edge case)
      {
        problem_id: 54,
        test_case_id: 2,
        input: '76\n61',
        expected_output: 'Launch approved',
        is_hidden: true,
        weight: 1.0,
        created_at: new Date()
      },
      // Hidden test case - fuel too low after reduction
      {
        problem_id: 54,
        test_case_id: 3,
        input: '70\n80',
        expected_output: 'Launch denied',
        is_hidden: true,
        weight: 1.0,
        created_at: new Date()
      },
      // Hidden test case - oxygen too low
      {
        problem_id: 54,
        test_case_id: 4,
        input: '100\n50',
        expected_output: 'Launch denied',
        is_hidden: true,
        weight: 1.0,
        created_at: new Date()
      },
      // Hidden test case - both fuel and oxygen fail
      {
        problem_id: 54,
        test_case_id: 5,
        input: '60\n55',
        expected_output: 'Launch denied',
        is_hidden: true,
        weight: 1.0,
        created_at: new Date()
      }
    ];

    // Delete existing test cases for problem 54
    await testCasesCollection.deleteMany({ problem_id: 54 });

    // Insert test cases
    const testCasesResult = await testCasesCollection.insertMany(testCases54);
    console.log(`${testCasesResult.insertedCount} test cases inserted for Problem 54`);

    console.log('\n✅ Problem 54 (Session 4, Final Task: Mission Logic System) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedProblem54()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
