'use client';
// /* eslint-disable react/no-unescaped-entities */
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
        <div className="flex flex-col justify-center items-center mx-auto w-full p-6 bg-gray-800 text-white min-h-screen pt-20">
            <div className="max-w-5xl w-full">
                <h1 className="text-4xl font-bold mb-6">Your Profile</h1>
                <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                    <div className="flex-1">
                        <div className="mb-4">
                            <span className="font-semibold">Username:</span>
                            <span className="ml-2">{username}</span>
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Email:</span>
                            <span className="ml-2">{email}</span>
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Stream Key:</span>
                            <span className="ml-2">{streamKey}</span>
                        </div>
                    </div>

                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-4">How to Connect to the Streaming Service</h2>
                        <p className="mb-4">
                            Use the following details to connect to your streaming service:
                        </p>
                        <div className="mb-4">
                            <strong>Stream URL:</strong> <span className="ml-2">rtmp://livestream.netbase.se/live</span>
                        </div>
                        <div className="mb-4">
                            <strong>Stream Key:</strong> <span className="ml-2">{streamKey}</span>
                        </div>
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
                            width="100%"
                            height="auto"
                            playing={true}
                            className="react-player"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileClient;
