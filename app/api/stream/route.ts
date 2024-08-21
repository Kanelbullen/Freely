
import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/authOptions';

interface StreamInfo {
  name: string;
  description: string;
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user || !session.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    const result = await sql<StreamInfo[]>`
      INSERT INTO streams (name, description, user_id)
      VALUES (${name}, ${description}, ${session.user.id})
      ON CONFLICT (user_id) DO UPDATE
      SET name = ${name}, description = ${description}
      RETURNING *
    `;

    const streamInfo = result.rows[0]; // Use `result.rows` to access the first row

    res.status(200).json(streamInfo);
  } catch (error) {
    console.error('Error creating or updating stream:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username } = req.query;

    if (!username || typeof username !== 'string') {
      return res.status(400).json({ error: 'Username is required and must be a string' });
    }

    const result = await sql<StreamInfo[]>`
      SELECT name, description FROM streams WHERE username = ${username}
    `;

    const streamInfo = result.rows[0]; // Access the first row and handle possible undefined

    if (!streamInfo) {
      return res.status(404).json({ error: 'Stream info not found' });
    }

    res.status(200).json(streamInfo);
  } catch (error) {
    console.error('Error fetching stream info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
