"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const Home: React.FC = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>LiveStream</h1>
      <ReactPlayer
        url="https://snackboxuf.se/hls/laptop.m3u8"
        controls
        playing
        width="50%"
        height="auto"
      />
      <ReactPlayer
        url="https://snackboxuf.se/hls/dator.m3u8"
        controls
        playing
        width="50%"
        height="auto"
      />
    </div>
  );
}

export default Home;