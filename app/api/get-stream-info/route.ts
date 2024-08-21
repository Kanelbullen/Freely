// app/api/get-stream-info/route.ts

// import { NextResponse } from 'next/server';
// import { sql } from '@vercel/postgres';

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const username = searchParams.get('username');

//   if (!username) {
//     return NextResponse.json({ error: 'Username is required' }, { status: 400 });
//   }

//   const userResult = await sql`
//     SELECT id FROM users WHERE username = ${username}
//   `;

//   if (!userResult.rowCount) {
//     return NextResponse.json({ error: 'User not found' }, { status: 404 });
//   }

//   const userId = userResult.rows[0].id;

//   const streamResult = await sql`
//     SELECT name, description FROM streams WHERE user_id = ${userId}
//   `;

//   if (!streamResult.rowCount) {
//     return NextResponse.json({ error: 'Stream not found' }, { status: 404 });
//   }

//   return NextResponse.json(streamResult.rows[0]);
// }

import { NextRequest, NextResponse } from 'next/server';
import { sql, QueryResult, QueryResultRow } from '@vercel/postgres';

interface StreamInfo {
  name: string;
  description: string;
}

export async function GET(req: NextRequest) {
  try {
    // Correctly access the query parameter using searchParams
    const username = req.nextUrl.searchParams.get('username');

    if (!username || typeof username !== 'string') {
      return NextResponse.json({ error: 'Username is required and must be a string' }, { status: 400 });
    }

    const queryResult: QueryResult<QueryResultRow> = await sql`
      SELECT name, description FROM streams WHERE username = ${username}
    `;

    const rows: StreamInfo[] = queryResult.rows.map(row => ({
      name: row.name as string,
      description: row.description as string,
    }));

    const streamInfo = rows[0];

    if (!streamInfo) {
      return NextResponse.json({ error: 'Stream info not found' }, { status: 404 });
    }

    return NextResponse.json({ streamInfo }, { status: 200 });
  } catch (error) {
    console.error('Error fetching stream info:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
