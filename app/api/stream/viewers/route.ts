import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getServerSession } from 'next-auth';

export async function POST(request: Request) {
    const session = await getServerSession();

    if (!session || !session.user) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const { streamKey } = await request.json();

    // Check if the user has already been counted for this stream
    const viewerExists = await sql`
        SELECT 1 FROM stream_viewers WHERE user_id = ${session.user.id} AND stream_key = ${streamKey};
    `;

    if (viewerExists.rowCount === 0) {
        // Add the user to the viewer count
        await sql`
            INSERT INTO stream_viewers (user_id, stream_key)
            VALUES (${session.user.id}, ${streamKey});
        `;
    }

    // Count the total viewers for the stream
    const totalViewers = await sql`
        SELECT COUNT(*) FROM stream_viewers WHERE stream_key = ${streamKey};
    `;

    return NextResponse.json({ totalViewers: totalViewers.rows[0].count });
}
