import React from 'react';
// Import the Video interface
import { Video } from '../../utils/video/CatVideoUtils';

interface VideoDataComponentProps {
  video: Video; // Pass a single video object as a prop
}

const VideoDataComponent: React.FC<VideoDataComponentProps> = ({ video }) => {
  return (
    <section className='video-info-glass'>
      <h3>Video Info</h3>
      <p>
        <strong>Name:</strong> {video.name}
      </p>
      <p>
        <strong>Label:</strong> {video.label}
      </p>
      <p>
        <strong>Codec:</strong> {video.codec}
      </p>
      <p>
        <strong>Resolution:</strong> {video.width}x{video.height}
      </p>
      <p>
        <strong>Duration:</strong> {video.duration} seconds
      </p>
      <p>
        <strong>Size:</strong> {video.size} bytes
      </p>
    </section>
  );
};

export default VideoDataComponent;
