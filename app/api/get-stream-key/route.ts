import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
        return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    try {
        const result = await sql`SELECT streamkey FROM users WHERE username = ${username}`;
        if (result.rowCount === 0) {
            return NextResponse.json({ error: 'Stream key not found' }, { status: 404 });
        }

        const streamKey = result.rows[0].streamkey;
        return NextResponse.json({ streamKey });
    } catch (error) {
        console.error('Error fetching stream key:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
