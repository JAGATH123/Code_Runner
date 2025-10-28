import { NextResponse } from 'next/server';
import { DataService } from '@/lib/data-service';
import { SubmissionExecutor } from '@/lib/submission-executor';
import type { SubmissionResult } from '@/lib/types';

type TestCase = { input: string; expected_output: string };

// Real Python submission endpoint using Docker sandbox
export async function POST(request: Request) {
  try {
    const { problemId, code, language } = await request.json();

    if (language !== 'python') {
      return NextResponse.json({ error: 'Only Python is supported' }, { status: 400 });
    }

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const cases: TestCase[] = await DataService.getTestCasesForProblem(problemId);

    if (!cases) {
      return NextResponse.json({ error: 'Problem or test cases not found' }, { status: 404 });
    }

    // Execute code against all test cases
    const summary = await SubmissionExecutor.executeSubmission(code, cases);

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Submission execution error:', error);
    return NextResponse.json({ 
      error: 'An unexpected error occurred during submission evaluation.',
      summary: {
        status: 'Wrong Answer',
        passed: 0,
        total: 0
      } as SubmissionResult
    }, { status: 500 });
  }
}
