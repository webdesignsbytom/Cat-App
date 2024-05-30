import React, { useEffect, useRef, useState } from 'react';
import { IonPage } from '@ionic/react';
// Context
import { useVideo } from '../../context/VideoContext';
// Components
import MainButtonsComponent from '../../components/buttons/MainButtonsComponent';
// Images
import Video1 from '../../assets/video/cat_video1.mp4';

const TherapyModePage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted; // Start muted
    }
  }, [muted]);

  useEffect(() => {
    // Timer to hide buttons after 5 seconds
    const timer = setTimeout(() => {
      setButtonsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [buttonsVisible]);

  const handleScreenTap = () => {
    if (buttonsVisible) return;

    setButtonsVisible(true);
  };

  const goBack = () => {
    if (videoRef.current) {
    }
  };

  const goForward = () => {
    if (videoRef.current) {
    }
  };

  const toggleMute = () => {
    setMuted((prevMuted) => !prevMuted);
  };

  const likeVideo = () => {
    console.log('Video liked');
  };

  return (
    <IonPage onClick={handleScreenTap}>
      <div className='video-container'>
        <video
          ref={videoRef}
          autoPlay
          muted={muted}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src={Video1} type='video/mp4' />
          Your browser does not support the video tag.
        </video>

        {buttonsVisible && (
          <MainButtonsComponent
            onGoBack={goBack}
            onGoForward={goForward}
            onToggleMute={toggleMute}
            onLike={likeVideo}
            isMuted={muted}
          />
        )}
      </div>
    </IonPage>
  );
};

export default TherapyModePage;
