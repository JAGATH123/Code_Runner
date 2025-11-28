import { NextRequest, NextResponse } from 'next/server';
import { getCollection, COLLECTIONS } from '@/lib/database/mongodb';

export const dynamic = 'force-dynamic';

interface StoredProgress {
  userId: string;
  completedProblems: string[];
  completedLevels: {
    '11-14': number[];
    '15-18': number[];
  };
  currentLevel: {
    '11-14': number;
    '15-18': number;
  };
  lastUpdated: Date;
}

// GET /api/progress?userId=xxx - Get user's progress
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId') || 'guest';

    const progressCollection = await getCollection(COLLECTIONS.USER_PROGRESS);
    const progress = await progressCollection.findOne({ userId }) as StoredProgress | null;

    if (!progress) {
      // Return default progress if none found
      return NextResponse.json({
        completedProblems: [],
        completedLevels: {
          '11-14': [],
          '15-18': []
        },
        currentLevel: {
          '11-14': 1,
          '15-18': 1
        }
      });
    }

    return NextResponse.json({
      completedProblems: progress.completedProblems,
      completedLevels: progress.completedLevels,
      currentLevel: progress.currentLevel,
      lastUpdated: progress.lastUpdated
    });

  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}

// POST /api/progress - Update user's progress
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId = 'guest',
      completedProblems,
      completedLevels,
      currentLevel
    } = body;

    if (!completedProblems || !completedLevels || !currentLevel) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const progressCollection = await getCollection(COLLECTIONS.USER_PROGRESS);

    const progressData: StoredProgress = {
      userId,
      completedProblems: Array.isArray(completedProblems) ? completedProblems : Array.from(completedProblems),
      completedLevels: {
        '11-14': Array.isArray(completedLevels['11-14']) ? completedLevels['11-14'] : Array.from(completedLevels['11-14']),
        '15-18': Array.isArray(completedLevels['15-18']) ? completedLevels['15-18'] : Array.from(completedLevels['15-18'])
      },
      currentLevel,
      lastUpdated: new Date()
    };

    await progressCollection.updateOne(
      { userId },
      { $set: progressData },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Progress saved successfully'
    });

  } catch (error) {
    console.error('Error saving progress:', error);
    return NextResponse.json(
      { error: 'Failed to save progress' },
      { status: 500 }
    );
  }
}
