import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { sql } from '@vercel/postgres';
import { randomBytes } from 'crypto';

export async function POST(request: Request) {
  try {
    const { username, email, password, password2 } = await request.json();

    // Validation
    if (password === password2) {
      const hashedPassword = await hash(password, 10);
      const streamKey = randomBytes(16).toString('hex'); // Generate a 32-character stream key

      await sql`
        INSERT INTO users (username, email, password, streamkey)
        VALUES (${username}, ${email}, ${hashedPassword}, ${streamKey})
      `;

      console.log({ username, email, password, password2, streamKey });
      return NextResponse.redirect(new URL('/profile', request.url));
    } else {
      return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 });
    }
  } catch (e) {
    console.error('Error saving user to database:', e);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
