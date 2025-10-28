import { allProblems, allSessions, levels, testCases } from './mock-data';
import { DatabaseService } from './db-service';
import { DBProblem, DBTestCase, DBSession, DBLevel } from './db-types';

export async function migrateDataToMongoDB() {
  console.log('🚀 Starting migration to MongoDB...');
  
  try {
    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await DatabaseService.clearAllData();

    // Convert and insert problems
    console.log('📚 Migrating problems...');
    const dbProblems: DBProblem[] = allProblems.map(problem => ({
      problem_id: problem.problem_id,
      session_id: problem.session_id || 1,
      title: problem.title,
      description: problem.description,
      difficulty: problem.difficulty,
      example_code: problem.example_code,
      sample_input: problem.sample_input,
      sample_output: problem.sample_output,
      age_group: problem.age_group || '11-14',
      level_number: problem.level_number || 1,
      metadata: {
        concepts: extractConcepts(problem.title, problem.description),
        space_theme: true,
        estimated_time_minutes: estimateTimeMinutes(problem.difficulty)
      },
      created_at: new Date(),
      updated_at: new Date()
    }));
    
    await DatabaseService.insertProblems(dbProblems);
    console.log(`✅ Inserted ${dbProblems.length} problems`);

    // Convert and insert test cases
    console.log('🧪 Migrating test cases...');
    const dbTestCases: DBTestCase[] = [];
    let testCaseId = 1;
    
    for (const [problemId, cases] of Object.entries(testCases)) {
      const numericProblemId = parseInt(problemId);
      cases.forEach((testCase, index) => {
        dbTestCases.push({
          problem_id: numericProblemId,
          test_case_id: testCaseId++,
          input: testCase.input,
          expected_output: testCase.expected_output,
          is_hidden: index > 0, // First test case visible, others hidden
          weight: 1,
          created_at: new Date()
        });
      });
    }
    
    await DatabaseService.insertTestCases(dbTestCases);
    console.log(`✅ Inserted ${dbTestCases.length} test cases`);

    // Convert and insert sessions
    console.log('📖 Migrating sessions...');
    const dbSessions: DBSession[] = allSessions.map(session => ({
      session_id: session.session_id,
      level_id: session.level_id,
      session_number: session.session_number,
      title: session.title,
      description: session.description,
      problem_ids: session.problems.map(p => p.problem_id),
      metadata: {
        estimated_time_hours: estimateSessionTimeHours(session.problems.length),
        prerequisites: session.session_number > 1 ? [session.session_id - 1] : []
      },
      created_at: new Date(),
      updated_at: new Date()
    }));
    
    await DatabaseService.insertSessions(dbSessions);
    console.log(`✅ Inserted ${dbSessions.length} sessions`);

    // Convert and insert levels
    console.log('🏆 Migrating levels...');
    const dbLevels: DBLevel[] = levels.map(level => ({
      level_id: level.level_id,
      level_number: level.level_number,
      title: level.title,
      age_group: level.age_group,
      description: level.description,
      session_ids: level.sessions.map(s => s.session_id),
      metadata: {
        total_sessions: level.sessions.length,
        difficulty_progression: ['Intro', 'Easy', 'Medium']
      },
      created_at: new Date(),
      updated_at: new Date()
    }));
    
    await DatabaseService.insertLevels(dbLevels);
    console.log(`✅ Inserted ${dbLevels.length} levels`);

    console.log('🎉 Migration completed successfully!');
    console.log(`
📊 Migration Summary:
   Problems: ${dbProblems.length}
   Test Cases: ${dbTestCases.length} 
   Sessions: ${dbSessions.length}
   Levels: ${dbLevels.length}
`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// Helper functions
function extractConcepts(title: string, description: string): string[] {
  const concepts: string[] = [];
  const text = (title + ' ' + description).toLowerCase();
  
  if (text.includes('print')) concepts.push('print');
  if (text.includes('variable')) concepts.push('variables');
  if (text.includes('input')) concepts.push('input');
  if (text.includes('int(')) concepts.push('type-conversion');
  if (text.includes('float(')) concepts.push('type-conversion');
  if (text.includes('string')) concepts.push('strings');
  if (text.includes('f-string')) concepts.push('f-strings');
  if (text.includes('calculation') || text.includes('math')) concepts.push('arithmetic');
  
  return concepts.length > 0 ? concepts : ['basic-programming'];
}

function estimateTimeMinutes(difficulty: string): number {
  switch (difficulty.toLowerCase()) {
    case 'intro': return 15;
    case 'easy': return 30;
    case 'medium': return 45;
    case 'hard': return 60;
    default: return 30;
  }
}

function estimateSessionTimeHours(numProblems: number): number {
  return Math.ceil((numProblems * 25) / 60); // 25 mins per problem on average
}

// Run migration if called directly
if (require.main === module) {
  migrateDataToMongoDB()
    .then(() => {
      console.log('Migration completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}