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

// import { getServerSession } from 'next-auth/next';
// import { redirect } from 'next/navigation';
// import ProfileClient from './ProfileClient';

// export default async function ProfilePage() {
//   const session = await getServerSession();

//   if (!session) {
//     // If the user is not logged in, redirect to the sign-in page
//     redirect('/auth/signin');
//   }

//   return (
//     <div className="max-w-2xl mx-auto text-white" style={{ paddingTop: '4rem' }}>
//       <h1 className="text-3xl mb-4">Profile</h1>
//       <ProfileClient username={session.user?.name || ''} />
//     </div>
//   );
// }
