import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { sql } from '@vercel/postgres';
import { randomBytes } from 'crypto';

export async function POST(request: Request) {
  try {
    const { username, email, password, password2 } = await request.json();

    // Validation
    if (password !== password2) {
      return NextResponse.json({ field: 'password', message: 'Passwords do not match' }, { status: 400 });
    }

    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email} OR username = ${username}
    `;

    const user = existingUser.rows[0] as { username: string; email: string; }; // Add the actual properties you expect

    if (user) {
      return NextResponse.json({ message: `User with this ${user.email === email ? 'email' : 'username'} already exists.`, field: user.email === email ? 'email' : 'username' }, { status: 400 });
    }

    // Hash the password and generate a stream key
    const hashedPassword = await hash(password, 10);
    const streamKey = randomBytes(16).toString('hex'); // Generate a 32-character stream key

    // Insert the new user into the database
    await sql`
      INSERT INTO users (username, email, password, streamkey)
      VALUES (${username}, ${email}, ${hashedPassword}, ${streamKey})
    `;

    console.log({ username, email, password, password2, streamKey });
    return NextResponse.redirect(new URL('/profile', request.url));
  } catch (e) {
    console.error('Error saving user to database:', e);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
