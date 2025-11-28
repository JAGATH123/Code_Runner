import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

export async function GET() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db(MONGODB_DB);
    const problemsCollection = db.collection('problems');

    // Fetch Code Convergence Ultimate Challenge (problem_id: 999)
    const problem = await problemsCollection.findOne({ problem_id: 999 });

    if (!problem) {
      return NextResponse.json(
        { error: 'Code Convergence Ultimate Challenge not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(problem);
  } catch (error) {
    console.error('Error fetching Code Convergence Ultimate:', error);
    return NextResponse.json(
      { error: 'Failed to fetch problem' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
