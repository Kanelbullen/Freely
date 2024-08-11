'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

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
    <div style={{ paddingTop: '4rem' }}>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <h1>{username}&apos;s stream</h1>
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
