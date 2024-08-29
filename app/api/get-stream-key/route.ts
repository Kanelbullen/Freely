import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userat = searchParams.get('username');

  if (!userat) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    const { rows } = await sql`SELECT streamkey FROM users WHERE userat = ${userat}`;
    const streamKey = rows[0]?.streamkey;

    if (!streamKey) {
      return NextResponse.json({ error: 'Stream key not found' }, { status: 404 });
    }

    return NextResponse.json({ streamKey });
  } catch (error) {
    console.error('Error fetching stream key:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}