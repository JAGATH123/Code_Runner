import { NextRequest, NextResponse } from 'next/server';
import { DataService } from '@/lib/data-service';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const problemId = parseInt(id, 10);

    if (isNaN(problemId)) {
      return NextResponse.json(
        { error: 'Invalid problem ID' },
        { status: 400 }
      );
    }

    const problem = await DataService.getProblemById(problemId);

    if (!problem) {
      return NextResponse.json(
        { error: 'Problem not found' },
        { status: 404 }
      );
    }

    const testCases = await DataService.getTestCasesForProblem(problemId);
    const visibleTestCases = await DataService.getVisibleTestCasesForProblem(problemId);

    return NextResponse.json({
      problem,
      test_cases: testCases,
      visible_test_cases: visibleTestCases,
      data_source: DataService.getDataSourceInfo()
    });

  } catch (error) {
    console.error('Error fetching problem:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
