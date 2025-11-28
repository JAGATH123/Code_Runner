import { NextResponse } from 'next/server';

export async function GET() {
  // Return test cases for Code Convergence Ultimate Challenge
  const testCases = [
    {
      test_case_id: 'cc_test_1',
      problem_id: 'code_convergence_ultimate',
      input: 'Alex Carter\nMars Colony Alpha\n75',
      expected_output: `Enter astronaut name: Alex Carter
Enter mission title: Mars Colony Alpha
Enter current energy level (0-100): 75

--- MISSION LOG ---
Astronaut: Alex Carter
Mission Title: Mars Colony Alpha
Energy Level: 75
Status: Mission Start Approved.

Initiating Countdown:
5
4
3
2
1
Liftoff check complete.

Mission Tools Loaded: ['Thermal Scanner', 'Oxygen Kit', 'Repair Drone', 'Radiation Shield']
Important Tool Check: Oxygen Kit (second tool)

Mission Started Successfully!`,
      is_hidden: false,
      weight: 1.0
    },
    {
      test_case_id: 'cc_test_2',
      problem_id: 'code_convergence_ultimate',
      input: 'Luna Smith\nJupiter Exploration\n90',
      expected_output: `Enter astronaut name: Luna Smith
Enter mission title: Jupiter Exploration
Enter current energy level (0-100): 90

--- MISSION LOG ---
Astronaut: Luna Smith
Mission Title: Jupiter Exploration
Energy Level: 90
Status: Mission Start Approved.

Initiating Countdown:
5
4
3
2
1
Liftoff check complete.

Mission Tools Loaded: ['Thermal Scanner', 'Oxygen Kit', 'Repair Drone', 'Radiation Shield']
Important Tool Check: Oxygen Kit (second tool)

Mission Started Successfully!`,
      is_hidden: true,
      weight: 1.0
    },
    {
      test_case_id: 'cc_test_3',
      problem_id: 'code_convergence_ultimate',
      input: 'Nova Chen\nSaturn Survey\n45',
      expected_output: `Enter astronaut name: Nova Chen
Enter mission title: Saturn Survey
Enter current energy level (0-100): 45

--- MISSION LOG ---
Astronaut: Nova Chen
Mission Title: Saturn Survey
Energy Level: 45
Status: Hold Launch.

Initiating Countdown:
5
4
3
2
1
Liftoff check complete.

Mission Tools Loaded: ['Thermal Scanner', 'Oxygen Kit', 'Repair Drone', 'Radiation Shield']
Important Tool Check: Oxygen Kit (second tool)

Mission Started Successfully!`,
      is_hidden: true,
      weight: 1.0
    },
    {
      test_case_id: 'cc_test_4',
      problem_id: 'code_convergence_ultimate',
      input: 'Zara Johnson\nDeep Space Probe\n61',
      expected_output: `Enter astronaut name: Zara Johnson
Enter mission title: Deep Space Probe
Enter current energy level (0-100): 61

--- MISSION LOG ---
Astronaut: Zara Johnson
Mission Title: Deep Space Probe
Energy Level: 61
Status: Mission Start Approved.

Initiating Countdown:
5
4
3
2
1
Liftoff check complete.

Mission Tools Loaded: ['Thermal Scanner', 'Oxygen Kit', 'Repair Drone', 'Radiation Shield']
Important Tool Check: Oxygen Kit (second tool)

Mission Started Successfully!`,
      is_hidden: true,
      weight: 1.0
    }
  ];

  return NextResponse.json(testCases);
}
