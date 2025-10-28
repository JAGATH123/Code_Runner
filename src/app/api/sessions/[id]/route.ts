import { NextRequest, NextResponse } from 'next/server';
import { DataService } from '@/lib/data-service';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const sessionId = parseInt(id, 10);

    if (isNaN(sessionId)) {
      return NextResponse.json(
        { error: 'Invalid session ID' },
        { status: 400 }
      );
    }

    const session = await DataService.getSessionById(sessionId);

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      session,
      data_source: DataService.getDataSourceInfo()
    });

  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
