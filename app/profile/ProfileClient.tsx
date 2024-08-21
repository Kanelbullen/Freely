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


// 'use client';

// import { useState, useEffect } from 'react';

// interface ProfileClientProps {
//   username: string;
// }

// export default function ProfileClient({ username }: ProfileClientProps) {
//   const [streamInfo, setStreamInfo] = useState({ name: '', description: '' });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     if (username) {
//       fetchStreamInfo(username);
//     }
//   }, [username]);

//   const fetchStreamInfo = async (username: string) => {
//     try {
//       const response = await fetch(`/api/get-stream-info?username=${username}`);
//       const data = await response.json();
//       if (response.ok) {
//         setStreamInfo(data.streamInfo);
//       } else {
//         setMessage('Error fetching stream info');
//       }
//     } catch (error) {
//       console.error('Error fetching stream info:', error);
//       setMessage('Error fetching stream info');
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setStreamInfo({
//       ...streamInfo,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       const response = await fetch('/api/stream', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username,
//           name: streamInfo.name,
//           description: streamInfo.description,
//         }),
//       });

//       if (response.ok) {
//         setMessage('Stream info updated successfully!');
//       } else {
//         setMessage('Failed to update stream info');
//       }
//     } catch (error) {
//       console.error('Error updating stream info:', error);
//       setMessage('Failed to update stream info');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="mb-4">
//         <label htmlFor="name" className="block text-lg mb-2">Stream Name:</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={streamInfo.name}
//           onChange={handleInputChange}
//           className="w-full p-2 rounded bg-gray-700"
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="description" className="block text-lg mb-2">Stream Description:</label>
//         <textarea
//           id="description"
//           name="description"
//           value={streamInfo.description}
//           onChange={handleInputChange}
//           className="w-full p-2 rounded bg-gray-700"
//           rows={4}
//         />
//       </div>
//       <button
//         type="submit"
//         className={`w-full p-2 rounded bg-blue-600 hover:bg-blue-700 ${loading ? 'opacity-50' : ''}`}
//         disabled={loading}
//       >
//         {loading ? 'Saving...' : 'Save Changes'}
//       </button>
//       {message && <p className="mt-4 text-center">{message}</p>}
//     </form>
//   );
// }
