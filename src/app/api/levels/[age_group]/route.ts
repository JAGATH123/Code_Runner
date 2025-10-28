import { NextResponse } from 'next/server';
import { DataService } from '@/lib/data-service';

export async function GET(
  request: Request,
  { params }: { params: { age_group: string } }
) {
  try {
    const { age_group } = await params;
    const levels = await DataService.getLevelsByAgeGroup(age_group);
    
    if (!levels || levels.length === 0) {
      return NextResponse.json({ error: 'No levels found' }, { status: 404 });
    }
    
    return NextResponse.json({ levels });
  } catch (error) {
    console.error('Error fetching levels:', error);
    return NextResponse.json({ error: 'Failed to fetch levels' }, { status: 500 });
  }
}