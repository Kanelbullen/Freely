'use client';
/* eslint-disable react/no-unescaped-entities */

// import dynamic from 'next/dynamic';
// import './profile.module.css';

// const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });


// interface ProfileClientProps {
//     username: string;
//     email: string;
//     streamKey: string;
// }

// const ProfileClient: React.FC<ProfileClientProps> = ({ username, email, streamKey }) => {
//     return (
//         <div>
//             <h1>{username}'s Profile</h1>
//             <p>Email: {email}</p>
//             <p>Stream Key: {streamKey}</p>
//         </div>
//     );
// };

// export default ProfileClient;

import React from 'react';
import ReactPlayer from 'react-player';

interface ProfileClientProps {
    username: string;
    email: string;
    streamKey: string;
}

const ProfileClient: React.FC<ProfileClientProps> = ({ username, email, streamKey }) => {
    const streamUrl = `https://livestream.netbase.se/hls/${streamKey}.m3u8`;

    return (
        <div className="flex flex-col justify-center items-center mx-auto w-full p-6 bg-gray-800 text-white min-h-screen">
            <div className="max-w-5xl w-full">
                <h1 className="text-4xl font-bold mb-6">Your Profile</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="font-semibold">Username:</span>
                            <span>{username}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="font-semibold">Email:</span>
                            <span>{email}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="font-semibold">Stream Key:</span>
                            <span>{streamKey}</span>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4">How to Connect to the Streaming Service</h2>
                        <p className="mb-4">
                            Use the following details to connect to your streaming service:
                        </p>
                        <ul className="list-disc list-inside mb-4">
                            <li><strong>Stream URL:</strong> rtmp://livestream.netbase.se/live</li>
                            <li><strong>Stream Key:</strong> {streamKey}</li>
                        </ul>
                        <p>
                            Use the above Stream URL and Stream Key in your streaming software (e.g., OBS) to start streaming.
                        </p>
                    </div>
                </div>

                <div className="w-full">
                    <h2 className="text-2xl font-bold mb-4">Stream Preview</h2>
                    <div className="w-full">
                        <ReactPlayer
                            url={streamUrl}
                            controls
                            playing={true}
                            width="auto"
                            height="auto"
                            rounded="45px"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileClient;

