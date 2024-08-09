'use client';

import dynamic from 'next/dynamic';
import './profile.module.css';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface ProfileClientProps {
    userData: {
        username: string;
        email: string;
        streamkey: string;
    };
}

const ProfileClient: React.FC<ProfileClientProps> = ({ userData }) => {
    const streamUrl = `https://snackboxuf.se/hls/${userData.streamkey}.m3u8`;

    return (
        <div>
            <h1>Profile</h1>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <p>Stream Key: {userData.streamkey}</p>
            <p>Stream Key: {streamUrl}</p>
            <div className="player-wrapper">
                <ReactPlayer
                    url={streamUrl}
                    controls
                    playing
                    width="50%"
                    height="100%"
                />
            </div>
        </div>
    );
};

export default ProfileClient;
