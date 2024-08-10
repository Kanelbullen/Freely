'use client';
/* eslint-disable react/no-unescaped-entities */

import dynamic from 'next/dynamic';
import './profile.module.css';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });


interface ProfileClientProps {
    username: string;
    email: string;
    streamKey: string;
}

const ProfileClient: React.FC<ProfileClientProps> = ({ username, email, streamKey }) => {
    return (
        <div>
            <h1>{username}'s Profile</h1>
            <p>Email: {email}</p>
            <p>Stream Key: {streamKey}</p>
        </div>
    );
};

export default ProfileClient;
