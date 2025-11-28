import { NextRequest, NextResponse } from 'next/server';
import { getCollection, COLLECTIONS } from '@/lib/database/mongodb';

export const dynamic = 'force-dynamic';

// POST /api/progress/complete - Mark problem or level as complete
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId = 'guest',
      type, // 'problem' or 'level'
      problemId,
      ageGroup,
      levelNumber
    } = body;

    if (!type || (type !== 'problem' && type !== 'level')) {
      return NextResponse.json(
        { error: 'Invalid type. Must be "problem" or "level"' },
        { status: 400 }
      );
    }

    const progressCollection = await getCollection(COLLECTIONS.USER_PROGRESS);

    if (type === 'problem') {
      if (!problemId) {
        return NextResponse.json(
          { error: 'problemId is required' },
          { status: 400 }
        );
      }

      // Add problem to completed problems array (if not already there)
      await progressCollection.updateOne(
        { userId },
        {
          $addToSet: { completedProblems: problemId.toString() },
          $set: { lastUpdated: new Date() }
        },
        { upsert: true }
      );

      return NextResponse.json({
        success: true,
        message: `Problem ${problemId} marked as complete`
      });

    } else if (type === 'level') {
      if (!ageGroup || !levelNumber) {
        return NextResponse.json(
          { error: 'ageGroup and levelNumber are required' },
          { status: 400 }
        );
      }

      const fieldName = `completedLevels.${ageGroup}`;
      const currentLevelField = `currentLevel.${ageGroup}`;

      // Add level to completed levels and update current level
      await progressCollection.updateOne(
        { userId },
        {
          $addToSet: { [fieldName]: levelNumber },
          $max: { [currentLevelField]: levelNumber + 1 }, // Unlock next level
          $set: { lastUpdated: new Date() }
        },
        { upsert: true }
      );

      return NextResponse.json({
        success: true,
        message: `Level ${levelNumber} in ${ageGroup} marked as complete`
      });
    }

  } catch (error) {
    console.error('Error marking item as complete:', error);
    return NextResponse.json(
      { error: 'Failed to mark item as complete' },
      { status: 500 }
    );
  }
}
