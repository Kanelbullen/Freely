import { getServerSession } from 'next-auth';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';
import ProfileClient from './ProfileClient';

export default async function ProfilePage() {
    const session = await getServerSession();

    if (!session) {
        redirect('/login');
    }

    const user = await sql`
        SELECT username, email, streamkey
        FROM users
        WHERE email = ${session.user?.email}
    `;

    const userData = user.rows[0];

    return (
        <ProfileClient
            username={userData.username}
            email={userData.email}
            streamKey={userData.streamkey}
        />
    );
}