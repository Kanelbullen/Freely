// import { getServerSession } from 'next-auth';
// import { sql } from '@vercel/postgres';
// import { authOptions } from '../api/auth/[...nextauth]/route';
// import { redirect } from 'next/navigation';
// import ProfileClient from './ProfileClient';

// const Profile = async () => {
//     const session = await getServerSession(authOptions);

//     if (!session) {
//         // Redirect to login page if not authenticated
//         redirect('/login');
//     }

//     const { rows } = await sql`SELECT username, email, streamkey FROM users WHERE id = ${session.user.id}`;
//     const userData = rows[0];

//     if (!userData) {
//         // Handle case where user data is not found
//         return (
//             <div>
//                 <h1>Profile</h1>
//                 <p>User data not found.</p>
//             </div>
//         );
//     }

//     return <ProfileClient userData={userData} />;
// };

// export default Profile;
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
