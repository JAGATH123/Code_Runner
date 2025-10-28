import { NextResponse } from 'next/server';
import { DataService } from '@/lib/data-service';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const problemId = parseInt(id, 10);
    
    if (isNaN(problemId)) {
      return NextResponse.json({ error: 'Invalid problem ID' }, { status: 400 });
    }

    const testCases = await DataService.getVisibleTestCasesForProblem(problemId);
    return NextResponse.json(testCases);
  } catch (error) {
    console.error('Error fetching test cases:', error);
    return NextResponse.json(
      { error: 'Failed to fetch test cases' },
      { status: 500 }
    );
  }
}