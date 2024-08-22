'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './StreamPage.module.css'; // Import the CSS module

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

interface StreamPageProps {
  params: {
    username: string;
  };
}

const StreamPage: React.FC<StreamPageProps> = ({ params: { username } }) => {
  const cleanUsername = username.replace('@', '').toLowerCase(); // Remove @ and make lowercase
  const [viewerCount, setViewerCount] = useState(0);
  const [streamKey, setStreamKey] = useState<string | null>(null);
  const [streamInfo, setStreamInfo] = useState<{ name: string; description: string } | null>(null);

  useEffect(() => {
    const fetchStreamKey = async () => {
      try {
        const response = await fetch(`/api/get-stream-key?username=${cleanUsername}`);
        if (response.ok) {
          const data = await response.json();
          setStreamKey(data.streamKey);
        } else {
          console.error('Error fetching stream key:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching stream key:', error);
      }
    };

    const fetchStreamInfo = async () => {
      try {
        const response = await fetch(`/api/get-stream-info?username=${cleanUsername}`);
        if (response.ok) {
          const data = await response.json();
          setStreamInfo(data.streamInfo);
        } else {
          console.error('Error fetching stream info:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching stream info:', error);
      }
    };

    fetchStreamKey();
    fetchStreamInfo();

    const socket = new WebSocket(`wss://livestream.freely-streaming.com/viewers?username=${cleanUsername}`);

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
  }, [cleanUsername]);

  return (
    <div className={styles.streamPageContainer}>
      <div className={styles.streamPlayerContainer}>
        {streamKey ? (
          <ReactPlayer
            url={`https://livestream.freely-streaming.com/hls/${streamKey}.m3u8`}
            playing
            controls
            width="100%"
            height="100%"
            className={styles.streamPlayer}
          />
        ) : (
          <div className={styles.loading}>Loading stream...</div>
        )}
      </div>
      <div className={styles.streamInfoContainer}>
        <h1 className={styles.streamTitle}>{streamInfo ? streamInfo.name : `${cleanUsername}'s stream`}</h1>
        <p className={styles.viewerCount}>Viewers: {viewerCount}</p>
        {streamInfo && <p className={styles.streamDescription}>{streamInfo.description}</p>}
      </div>
    </div>
  );
};

export default StreamPage;


// 'use client';

// import React, { useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';
// import styles from './StreamPage.module.css'; // Import the CSS module

// const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

// interface StreamPageProps {
//   params: {
//     username: string;
//   };
// }

// const StreamPage: React.FC<StreamPageProps> = ({ params: { username } }) => {
//   const [viewerCount, setViewerCount] = useState(0);
//   const [streamKey, setStreamKey] = useState<string | null>(null);
//   const [streamInfo, setStreamInfo] = useState<{ name: string; description: string } | null>(null);

//   useEffect(() => {
//     const fetchStreamKey = async () => {
//       try {
//         const response = await fetch(`/api/get-stream-key?username=${username}`);
//         if (response.ok) {
//           const data = await response.json();
//           setStreamKey(data.streamKey);
//         } else {
//           console.error('Error fetching stream key:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error fetching stream key:', error);
//       }
//     };

//     const fetchStreamInfo = async () => {
//       try {
//         const response = await fetch(`/api/get-stream-info?username=${username}`);
//         if (response.ok) {
//           const data = await response.json();
//           setStreamInfo(data.streamInfo);
//         } else {
//           console.error('Error fetching stream info:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error fetching stream info:', error);
//       }
//     };

//     fetchStreamKey();
//     fetchStreamInfo();

//     const socket = new WebSocket(`wss://livestream.freely-streaming.com/viewers?username=${username}`);

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       setViewerCount(data.viewerCount || 0);
//     };

//     socket.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     return () => {
//       socket.close();
//     };
//   }, [username]);

//   return (
//     <div className={styles.streamPageContainer}>
//       <div className={styles.streamPlayerContainer}>
//         {streamKey ? (
//           <ReactPlayer
//             url={`https://livestream.freely-streaming.com/hls/${streamKey}.m3u8`}
//             playing
//             controls
//             width="100%"
//             height="100%"
//             className={styles.streamPlayer}
//           />
//         ) : (
//           <div className={styles.loading}>Loading stream...</div>
//         )}
//       </div>
//       <div className={styles.streamInfoContainer}>
//         <h1 className={styles.streamTitle}>{streamInfo ? streamInfo.name : `${username}'s stream`}</h1>
//         <p className={styles.viewerCount}>Viewers: {viewerCount}</p>
//         {streamInfo && <p className={styles.streamDescription}>{streamInfo.description}</p>}
//       </div>
//     </div>
//   );
// };

// export default StreamPage;

