'use client';

import React from 'react';
import ReactPlayer from 'react-player';

const Home: React.FC = () => {
  return (
      <div style={{ textAlign: 'center' }}>
          <h1>LiveStream</h1>
          <ReactPlayer
              url="https://snackboxuf.se/hls/mystream.m3u8"
              controls
              playing
              width="100%"
              height="auto"
          />
      </div>
  );
};

export default Home;