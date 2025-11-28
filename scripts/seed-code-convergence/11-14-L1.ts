import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedCodeConvergenceUltimate() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Code Convergence Ultimate Challenge: Space Mission Log (Sessions 11 & 12 Combined)
    const codeConvergenceUltimate = {
      problem_id: 999, // Special ID for Code Convergence Ultimate
      session_id: 11, // Combined sessions 11 & 12
      title: 'Space Mission Log',
      description: `As NOVA-12 departs Earth's sphere, communication with mission control begins to flicker. The team must build Project StarComm—a robust communication channel to maintain the vital link between the ship and home base.

Astra: *"Commander, we're losing signal strength as we exit Earth's orbit. We need to initialize StarComm immediately—integrate all your learned skills: authentication, system checks, countdown sequences, equipment verification, and mission initialization. This is our lifeline to Earth."*

Through light static, a fractured message breaks through from Erevos-7, identifying VORAX-9 as a critical waypoint. The course locks in for the deep-space leg of the journey.

Your mission is to build StarComm v2—the integrated mission control system that combines all Level 1 Python fundamentals.`,

      question: `Commander, build the complete Space Mission Log system!

Your program must integrate all Python fundamentals learned in Level 1:

**Step 1: Get astronaut details**
- Use input() to get astronaut name
- Use input() to get mission title

**Step 2: Energy level check**
- Use input() to get energy level (convert to integer)
- If energy level > 60: print "Mission Start Approved"
- Otherwise: print "Hold Launch"

**Step 3: Launch countdown**
- Print "Launching in..."
- Use a for loop with range(5, 0, -1) to count down from 5 to 1
- Print each countdown number

**Step 4: Equipment verification**
- Create a list called tools with: ["screwdriver", "wrench", "drill"]
- Print "Second tool:" followed by the second tool (index 1)

**Step 5: Mission initialization**
- Define a function called launch_message()
- Inside the function, print "Mission Started Successfully!"
- Call the function

This integrates: variables, input, conditionals, loops, lists, and functions.`,

      difficulty: 'Hard',
      example_code: `# Space Mission Log - Project StarComm
# Your code here
`,
      sample_input: `Commander Aria
Mission VORAX-9
75`,
      sample_output: `Mission Start Approved
Launching in...
5
4
3
2
1
Second tool: wrench
Mission Started Successfully!`,
      age_group: '11-14',
      level_number: 1,

      metadata: {
        concepts: ['variables', 'input', 'conditionals', 'loops', 'lists', 'functions', 'integration'],
        space_theme: true,
        story_linked: true,
        estimated_time_minutes: 35,
        is_final_task: true,
        is_capstone: true,
        is_code_convergence: true
      },

      // Session-level content (Combined Sessions 11 & 12)
      session_title: 'Code Convergence: Project StarComm – Deep Space Communication System',
      session_introduction: `As NOVA-12 departs Earth's sphere, communication flickers. The team builds Project StarComm to maintain the vital link.

**Session 11 & 12 Combined Story Beat:**
StarComm v1 boots and authenticates. Through static, a message from Erevos-7 identifies VORAX-9. The system stabilizes and course locks for the deep-space journey.

**Python Focus:** Integrate all Level 1 skills—print, input, conditionals, lists, loops, and functions into one cohesive program.

**Deliverable:** StarComm v2—a complete mission control system that authenticates users, performs system checks, manages countdowns, verifies equipment, and maintains communication protocols.`,

      // Case-specific content (Code Convergence Ultimate Challenge)
      case_number: 6,
      case_title: 'Space Mission Log - Project StarComm Integration',
      case_explanation: `Combine everything you've learned into one unified system. Step 1: Use input("Enter your name: ") to get astronaut name, then input("Enter mission title: ") for mission title. Step 2: Use int(input("Enter energy level: ")) to get energy level as integer. If energy > 60: print "Mission Start Approved", else: print "Hold Launch". Step 3: Print "Launching in..." then use for loop with range(5, 0, -1) to count down from 5 to 1, printing each number. Step 4: Create tools list: tools = ["screwdriver", "wrench", "drill"]. Print "Second tool:", tools[1]. Step 5: Define function launch_message() that prints "Mission Started Successfully!", then call launch_message(). Functions must be defined before they are called. This tests your complete Level 1 mastery combining variables, input, conditionals, loops, lists, and functions.`
    };

    await problemsCollection.deleteOne({ problem_id: 999 });
    await problemsCollection.insertOne(codeConvergenceUltimate);
    console.log('Code Convergence Ultimate Challenge inserted');

    // Test cases for Code Convergence Ultimate
    const testCasesCC = [
      {
        test_case_id: 'tc_cc_1',
        problem_id: 999,
        input: 'Commander Aria\nMission VORAX-9\n75',
        expected_output: `Mission Start Approved
Launching in...
5
4
3
2
1
Second tool: wrench
Mission Started Successfully!`,
        is_hidden: false,
        weight: 1.0
      },
      {
        test_case_id: 'tc_cc_2',
        problem_id: 999,
        input: 'Captain Nova\nOperation StarComm\n50',
        expected_output: `Hold Launch
Launching in...
5
4
3
2
1
Second tool: wrench
Mission Started Successfully!`,
        is_hidden: true,
        weight: 1.0
      },
      {
        test_case_id: 'tc_cc_3',
        problem_id: 999,
        input: 'Lieutenant Echo\nMission Erevos-7\n95',
        expected_output: `Mission Start Approved
Launching in...
5
4
3
2
1
Second tool: wrench
Mission Started Successfully!`,
        is_hidden: true,
        weight: 1.0
      }
    ];

    await testCasesCollection.deleteMany({ problem_id: 999 });
    await testCasesCollection.insertMany(testCasesCC);
    console.log(`${testCasesCC.length} test cases inserted for Code Convergence Ultimate`);

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await client.close();
  }
}

seedCodeConvergenceUltimate();
