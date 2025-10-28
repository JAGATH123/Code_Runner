
// User Profile Types
export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  joinDate: Date;
  lastActive: Date;
  rank: 'NOVICE' | 'ADVANCED' | 'EXPERT' | 'MASTER';
  level: number;
  experience: number;
  streak: {
    current: number;
    longest: number;
    lastSubmissionDate: Date;
  };
  stats: {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    totalSubmissions: number;
    acceptanceRate: number;
  };
  contestRating: number;
  achievements: Achievement[];
  skills: Skill[];
  recentActivity: ActivityEntry[];
  submissionCalendar: SubmissionDay[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
  category: 'SOLVING' | 'STREAK' | 'SPEED' | 'MASTERY' | 'MILESTONE';
}

export interface Skill {
  name: string;
  level: number;
  problemCount: number;
  category: 'LANGUAGE' | 'ALGORITHM' | 'DATA_STRUCTURE' | 'CONCEPT';
}

export interface ActivityEntry {
  id: string;
  type: 'SOLVED' | 'ATTEMPTED' | 'ACHIEVEMENT' | 'STREAK';
  problemId?: number;
  problemTitle?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  timestamp: Date;
  status: 'SUCCESS' | 'PARTIAL' | 'FAILED';
}

export interface SubmissionDay {
  date: string; // YYYY-MM-DD format
  count: number;
  problems: number[];
}

export interface Problem {
  problem_id: number;
  session_id: number;
  title: string;
  description: string;
  question?: string; // The main question/task for the student
  objectives?: string; // markdown
  concepts?: string; // markdown bullet list
  difficulty: 'Intro' | 'Easy' | 'Medium' | 'Hard';
  estimated_minutes?: number;
  example_code: string;
  sample_input: string;
  sample_output: string;

  // Session-level content (for educational problems)
  session_title?: string;
  session_introduction?: string; // Full introduction text for the session

  // Case-specific content (for educational problems with multiple cases)
  case_number?: number;
  case_title?: string;
  case_overview?: string; // Brief overview of what this case demonstrates
  case_code?: string; // The specific code example for this case
  case_explanation?: string; // Detailed explanation of the case code

  // Additional metadata
  age_group?: '11-14' | '15-18';
  level_number?: number;
}

export interface Session {
  session_id: number;
  level_id: number;
  session_number: number;
  title: string;
  description: string;
  introduction_content?: string; // Introduction content for sessions
  problems: Problem[];
}

export interface Level {
  level_id: number;
  level_number: number;
  title: string;
  age_group: '11-14' | '15-18';
  description?: string;
  sessions: Session[];
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  status: 'Success' | 'Error' | 'Timeout' | 'Running' | 'Submitting' | '';
  executionTime: number | null;
  plots?: string[]; // Array of base64-encoded plot images
}

export interface SubmissionResult {
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Error';
  passed: number;
  total: number;
  results?: Array<{
    input: string;
    expected: string;
    actual: string;
    passed: boolean;
    error?: string;
  }>;
}

export interface TestCase {
  input: string;
  expected_output: string;
}
