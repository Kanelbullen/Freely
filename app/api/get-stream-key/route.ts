import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json({ message: 'Invalid username parameter' }, { status: 400 });
    }

    const { rows } = await sql`SELECT streamkey FROM users WHERE username = ${username}`;
    const streamKey = rows[0]?.streamkey;

    if (streamKey) {
      return NextResponse.json({ streamKey }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Stream key not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching stream key:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
