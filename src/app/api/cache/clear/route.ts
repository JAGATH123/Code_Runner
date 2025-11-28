import { NextRequest, NextResponse } from 'next/server';
import { DataService } from '@/lib/database/data-service';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Invalidate all caches
    await DataService.invalidateCache('problem');
    await DataService.invalidateCache('session');
    await DataService.invalidateCache('level');
    await DataService.invalidateCache('progress');

    const stats = DataService.getCacheStats();

    return NextResponse.json({
      success: true,
      message: 'All caches cleared successfully',
      cacheStats: stats
    });

  } catch (error) {
    console.error('Error clearing cache:', error);
    return NextResponse.json(
      { error: 'Failed to clear cache' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const stats = DataService.getCacheStats();

    return NextResponse.json({
      cacheStats: stats
    });

  } catch (error) {
    console.error('Error getting cache stats:', error);
    return NextResponse.json(
      { error: 'Failed to get cache stats' },
      { status: 500 }
    );
  }
}
