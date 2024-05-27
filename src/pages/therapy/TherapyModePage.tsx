import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage } from '@ionic/react';
import { FaBackward, FaForward, FaHome } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
// Context
import { useVideo } from '../../context/VideoContext';

const TherapyModePage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { videoUrl } = useVideo();
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true; // Start muted
    }
  }, []);

  const handleCanPlay = () => {
    setIsVideoReady(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(!muted);
    }
  };

  const goBack = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10; // Go back 10 seconds
    }
  };

  const goForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10; // Go forward 10 seconds
    }
  };

  const navigateHome = () => {
    history.push('/home');
  };

  return (
    <IonPage>
      <div className='relative h-full w-full'>
        <video
          ref={videoRef}
          autoPlay
          muted={muted}
          preload='auto'
          onCanPlay={handleCanPlay}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src={videoUrl} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
    </IonPage>
  );
};

export default TherapyModePage;
