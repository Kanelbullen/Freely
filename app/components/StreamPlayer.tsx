'use client';

import React from 'react';
import ReactPlayer from 'react-player';

interface StreamPlayerProps {
  streamUrl: string;
}

const StreamPlayer: React.FC<StreamPlayerProps> = ({ streamUrl }) => {
  return (
    <ReactPlayer
      url={streamUrl}
      controls
      width="100%"
      height="auto"
      playing={true}
      className="react-player"
    />
  );
};

export default StreamPlayer;
