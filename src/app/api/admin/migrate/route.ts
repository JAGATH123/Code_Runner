import { NextRequest, NextResponse } from 'next/server';
import { migrateDataToMongoDB } from '@/lib/migrate-data';

export async function POST(request: NextRequest) {
  try {
    const { force } = await request.json();

    console.log('Starting MongoDB migration...');
    
    await migrateDataToMongoDB();
    
    return NextResponse.json({
      success: true,
      message: 'Migration completed successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Migration failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Migration failed', 
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Migration endpoint ready',
    usage: 'Send POST request to start migration',
    status: 'ready'
  });
}