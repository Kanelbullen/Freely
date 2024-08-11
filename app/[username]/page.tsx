// import { sql } from '@vercel/postgres';
// import StreamPlayer from '../components/StreamPlayer';

// interface StreamPageProps {
//   params: {
//     username: string;
//   };
// }

// export default async function StreamPage({ params }: StreamPageProps) {
//   const { username } = params;

//   const user = await sql`SELECT * FROM users WHERE username = ${username}`;

//   if (user.rowCount === 0) {
//     return <div>User not found</div>;
//   }

//   const userData = user.rows[0];
//   const streamUrl = `https://livestream.netbase.se/hls/${userData.streamkey}.m3u8`;

//   return (
//     <div className="flex flex-col items-center p-6 pt-20 bg-gray-800 text-white min-h-screen"> {/* Added pt-20 for padding */}
//       <h1 className="text-4xl font-bold mb-6">{username}'s Stream</h1>
//       <div className="w-full max-w-5xl">
//         {streamUrl && <StreamPlayer streamUrl={streamUrl} />}
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

interface StreamPageProps {
  params: {
    username: string;
  };
}

const StreamPage: React.FC<StreamPageProps> = ({ params: { username } }) => {
  const [viewerCount, setViewerCount] = useState(0);
  const [streamKey, setStreamKey] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStreamKey() {
      try {
        const response = await fetch(`/api/get-stream-key?username=${username}`);
        if (response.ok) {
          const data = await response.json();
          setStreamKey(data.streamKey);
        } else {
          console.error('Failed to fetch stream key');
        }
      } catch (error) {
        console.error('Error fetching stream key:', error);
      }
    }

    fetchStreamKey();

    const socket = new WebSocket(`wss://livestream.netbase.se/viewers?username=${username}`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setViewerCount(data.viewerCount || 0);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, [username]);

  return (
    <div style={{ paddingTop: '4rem' }}> {/* Add padding to avoid navbar overlap */}
      <h1>{username}'s stream</h1>
      <p>Viewers: {viewerCount}</p>
      {streamKey ? (
        <ReactPlayer url={`https://livestream.netbase.se/hls/${streamKey}.m3u8`} playing controls />
      ) : (
        <p>Loading stream...</p>
      )}
    </div>
  );
};

export default StreamPage;
