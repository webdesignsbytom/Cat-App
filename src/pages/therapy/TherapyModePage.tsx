import React, { useEffect, useRef, useState } from 'react';
import { IonPage } from '@ionic/react';
// Components
import MainButtonsComponent from '../../components/buttons/MainButtonsComponent';
// Utils
import { CatVideo, therapyVideos } from '../../utils/video/CatVideoUtils';
// Constants
import { BUTTON_TIMER } from '../../utils/contstants/Constants';

const TherapyModePage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [muted, setMuted] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [catVideoArray, setCatVideoArray] = useState<CatVideo[]>(therapyVideos);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [disabledForward, setDisabledForward] = useState(false);
  const [disabledBack, setDisabledBack] = useState(false);
  
  useEffect(() => {
    // Timer to hide buttons after 5 seconds
    const timer = setTimeout(() => {
      setButtonsVisible(false);
    }, BUTTON_TIMER);

    return () => clearTimeout(timer);
  }, [buttonsVisible]);

  useEffect(() => {
    // Update video source when currentVideoIndex changes
    if (videoRef.current) {
      videoRef.current.src = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
      videoRef.current.load(); // Load the new video
      videoRef.current.play(); // Play the new video
    }
  }, [currentVideoIndex, catVideoArray]);

  const handleScreenTap = () => {
    if (buttonsVisible) return;

    setButtonsVisible(true);
  };

  const goBack = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex === 0 ? catVideoArray.length - 1 : prevIndex - 1));
  };

  const goForward = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex === catVideoArray.length - 1 ? 0 : prevIndex + 1));
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
          <source src={catVideoArray[currentVideoIndex].videoUrl} type='video/mp4' />
          Your browser does not support the video tag.
        </video>

        {buttonsVisible && (
          <MainButtonsComponent
            onGoBack={goBack}
            onGoForward={goForward}
            onToggleMute={toggleMute}
            onLike={likeVideo}
            isMuted={muted}
            disabledForward={disabledForward}
            disabledBack={disabledBack}
          />
        )}
      </div>
    </IonPage>
  );
};

export default TherapyModePage;
