import { NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/db-service';

export async function GET() {
  try {
    const problems = await DatabaseService.getAllProblems();
    return NextResponse.json(problems);
  } catch (error) {
    console.error('Error fetching problems:', error);
    return NextResponse.json(
      { error: 'Failed to fetch problems' },
      { status: 500 }
    );
  }
}
