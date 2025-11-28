import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function seedCodeConvergenceL3() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');
    const testCasesCollection = db.collection('test_cases');

    // Code Convergence: Level 3 - Project COSMIC LINK
    const codeConvergence = {
      problem_id: 181,
      session_id: 33, // Level 3, Code Convergence
      title: 'Project COSMIC LINK – Interstellar AI Signal Processor',
      description: 'Welcome to your final mission, Cadets. In Project COSMIC LINK, you will build an intelligent signal processor capable of detecting, decoding, classifying, and responding to mysterious cosmic transmissions. Deep Space Command has intercepted VORAX-9 distress signals, and the COSMIC LINK HUB has been sealed until you can build a system to classify these streams. Using everything you\'ve learned—classes, encapsulation, lists, conditionals, and functional programming—you\'ll simulate a real-world AI system that processes incoming signals, identifies potential threats or allies, and sends alerts when needed. Complete this mission to unlock Level 4: GALACTIC COMMAND.',
      difficulty: 'Hard',
      question: `The Nova Network has detected multiple cosmic transmissions from VORAX-9. Can you engineer a complete signal processing system that demonstrates mastery of all Python fundamentals?

Your system must build Signal objects with proper encapsulation, classify signals using intelligent logic, manage data with lists and loops, and generate alerts using advanced function parameters. This final project combines classes, magic methods, conditionals, loops, and functional programming into one unified application.`,

      compiler_comment: '# Write your code here\n',
      sample_input: 'Alpha-1\n85\nFriendly approach detected\nBeta-2\n60\nUnknown origin signal\nGamma-3\n95\nAllied transmission received',
      sample_output: 'Signal from Alpha-1: Strength 85 - Friendly approach detected\nSignal from Beta-2: Strength 60 - Unknown origin signal\nSignal from Gamma-3: Strength 95 - Allied transmission received\nClassified Alpha-1 as Friendly\nClassified Beta-2 as Unknown\nClassified Gamma-3 as Friendly\nALERT: Signal from Alpha-1 (Friendly)\nALERT: Signal from Gamma-3 (Friendly)\n=== COSMIC LINK SUMMARY ===\nTotal Signals Detected: 3\nFriendly Signals: 2\nUnknown Signals: 1\nCOSMIC LINK LIVE – STREAMS CLASSIFIED',

      age_group: '11-14',
      level_number: 3,
      difficulty_level: 3,
      max_score: 100,

      metadata: {
        space_theme: true,
        is_code_convergence: true,
        concepts: ['classes', 'OOP', 'encapsulation', 'private attributes', 'magic methods', '__str__', '__init__', 'lists', 'loops', 'conditionals', 'functions', '*args', '**kwargs', 'input/output', 'signal processing', 'classification'],
        estimated_time_minutes: 45,
        prerequisites: ['Session 1-10 complete']
      },

      // Session-level content
      session_title: 'Code Convergence: Project COSMIC LINK',

      // Case-specific content
      case_number: 1,
      case_title: 'Project COSMIC LINK – Interstellar AI Signal Processor',
      case_overview: `A comprehensive signal processing system combining classes with __str__, encapsulation with private attributes, classification logic, list management, and alert generation with *args/**kwargs. Demonstrates complete mastery of OOP, data structures, and functional programming.`,
      case_explanation: `Signal class needs __init__ and __str__. SignalClassifier uses private __type with getter/setter. Process 3 signals (source, strength, message), classify by strength > 70, separate into lists. Alert function uses *args. Final summary shows counts and status.`,

      created_at: new Date(),
      updated_at: new Date()
    };

    // Delete existing code convergence problem if it exists
    await problemsCollection.deleteOne({ problem_id: 181 });
    await testCasesCollection.deleteMany({ problem_id: 181 });

    // Insert code convergence problem
    const problemResult = await problemsCollection.insertOne(codeConvergence);
    console.log('Code Convergence L3 inserted');

    // Test cases for Code Convergence L3 (7 test cases)
    const testCases = [
      // Visible test case
      {
        test_case_id: 1811,
        problem_id: 181,
        input: 'Alpha-1\n85\nFriendly approach detected\nBeta-2\n60\nUnknown origin signal\nGamma-3\n95\nAllied transmission received',
        expected_output: 'Signal from Alpha-1: Strength 85 - Friendly approach detected\nSignal from Beta-2: Strength 60 - Unknown origin signal\nSignal from Gamma-3: Strength 95 - Allied transmission received\nClassified Alpha-1 as Friendly\nClassified Beta-2 as Unknown\nClassified Gamma-3 as Friendly\nALERT: Signal from Alpha-1 (Friendly)\nALERT: Signal from Gamma-3 (Friendly)\n=== COSMIC LINK SUMMARY ===\nTotal Signals Detected: 3\nFriendly Signals: 2\nUnknown Signals: 1\nCOSMIC LINK LIVE – STREAMS CLASSIFIED',
        is_hidden: false,
        weight: 15
      },
      // Hidden test cases
      {
        test_case_id: 1812,
        problem_id: 181,
        input: 'Nova-7\n75\nPeaceful contact initiated\nDelta-5\n50\nUnidentified frequency\nOrion-9\n80\nCooperative signal confirmed',
        expected_output: 'Signal from Nova-7: Strength 75 - Peaceful contact initiated\nSignal from Delta-5: Strength 50 - Unidentified frequency\nSignal from Orion-9: Strength 80 - Cooperative signal confirmed\nClassified Nova-7 as Friendly\nClassified Delta-5 as Unknown\nClassified Orion-9 as Friendly\nALERT: Signal from Nova-7 (Friendly)\nALERT: Signal from Orion-9 (Friendly)\n=== COSMIC LINK SUMMARY ===\nTotal Signals Detected: 3\nFriendly Signals: 2\nUnknown Signals: 1\nCOSMIC LINK LIVE – STREAMS CLASSIFIED',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 1813,
        problem_id: 181,
        input: 'Phoenix-3\n90\nAlliance beacon active\nVega-4\n65\nCryptic transmission\nZenith-8\n71\nTrusted source verified',
        expected_output: 'Signal from Phoenix-3: Strength 90 - Alliance beacon active\nSignal from Vega-4: Strength 65 - Cryptic transmission\nSignal from Zenith-8: Strength 71 - Trusted source verified\nClassified Phoenix-3 as Friendly\nClassified Vega-4 as Unknown\nClassified Zenith-8 as Friendly\nALERT: Signal from Phoenix-3 (Friendly)\nALERT: Signal from Zenith-8 (Friendly)\n=== COSMIC LINK SUMMARY ===\nTotal Signals Detected: 3\nFriendly Signals: 2\nUnknown Signals: 1\nCOSMIC LINK LIVE – STREAMS CLASSIFIED',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 1814,
        problem_id: 181,
        input: 'Titan-2\n100\nEmergency aid provided\nSirius-6\n55\nAmbiguous message\nLunar-1\n78\nFriendly forces deployed',
        expected_output: 'Signal from Titan-2: Strength 100 - Emergency aid provided\nSignal from Sirius-6: Strength 55 - Ambiguous message\nSignal from Lunar-1: Strength 78 - Friendly forces deployed\nClassified Titan-2 as Friendly\nClassified Sirius-6 as Unknown\nClassified Lunar-1 as Friendly\nALERT: Signal from Titan-2 (Friendly)\nALERT: Signal from Lunar-1 (Friendly)\n=== COSMIC LINK SUMMARY ===\nTotal Signals Detected: 3\nFriendly Signals: 2\nUnknown Signals: 1\nCOSMIC LINK LIVE – STREAMS CLASSIFIED',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 1815,
        problem_id: 181,
        input: 'Cosmos-5\n82\nDiplomatic channel open\nNebula-3\n45\nWeakened signal detected\nAurora-7\n88\nPeaceful intentions confirmed',
        expected_output: 'Signal from Cosmos-5: Strength 82 - Diplomatic channel open\nSignal from Nebula-3: Strength 45 - Weakened signal detected\nSignal from Aurora-7: Strength 88 - Peaceful intentions confirmed\nClassified Cosmos-5 as Friendly\nClassified Nebula-3 as Unknown\nClassified Aurora-7 as Friendly\nALERT: Signal from Cosmos-5 (Friendly)\nALERT: Signal from Aurora-7 (Friendly)\n=== COSMIC LINK SUMMARY ===\nTotal Signals Detected: 3\nFriendly Signals: 2\nUnknown Signals: 1\nCOSMIC LINK LIVE – STREAMS CLASSIFIED',
        is_hidden: true,
        weight: 10
      },
      {
        test_case_id: 1816,
        problem_id: 181,
        input: 'Polaris-9\n92\nRescue operation confirmed\nEclipse-2\n58\nDistorted communication\nHorizon-6\n74\nCooperative mission active',
        expected_output: 'Signal from Polaris-9: Strength 92 - Rescue operation confirmed\nSignal from Eclipse-2: Strength 58 - Distorted communication\nSignal from Horizon-6: Strength 74 - Cooperative mission active\nClassified Polaris-9 as Friendly\nClassified Eclipse-2 as Unknown\nClassified Horizon-6 as Friendly\nALERT: Signal from Polaris-9 (Friendly)\nALERT: Signal from Horizon-6 (Friendly)\n=== COSMIC LINK SUMMARY ===\nTotal Signals Detected: 3\nFriendly Signals: 2\nUnknown Signals: 1\nCOSMIC LINK LIVE – STREAMS CLASSIFIED',
        is_hidden: true,
        weight: 15
      },
      {
        test_case_id: 1817,
        problem_id: 181,
        input: 'Voyager-4\n98\nMedical assistance transmitted\nComet-8\n62\nUncertain broadcast\nStarlight-1\n76\nAllied support confirmed',
        expected_output: 'Signal from Voyager-4: Strength 98 - Medical assistance transmitted\nSignal from Comet-8: Strength 62 - Uncertain broadcast\nSignal from Starlight-1: Strength 76 - Allied support confirmed\nClassified Voyager-4 as Friendly\nClassified Comet-8 as Unknown\nClassified Starlight-1 as Friendly\nALERT: Signal from Voyager-4 (Friendly)\nALERT: Signal from Starlight-1 (Friendly)\n=== COSMIC LINK SUMMARY ===\nTotal Signals Detected: 3\nFriendly Signals: 2\nUnknown Signals: 1\nCOSMIC LINK LIVE – STREAMS CLASSIFIED',
        is_hidden: true,
        weight: 15
      }
    ];

    // Insert test cases
    await testCasesCollection.insertMany(testCases);
    console.log(`${testCases.length} test cases inserted for Code Convergence L3`);

    console.log('\n✅ Code Convergence L3 (Project COSMIC LINK) seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedCodeConvergenceL3()
  .then(() => {
    console.log('\n🚀 Database seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });
