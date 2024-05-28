import React, { useState, useRef, useEffect } from 'react';
import { IonPage } from '@ionic/react';
// Components
import MainButtonsComponent from '../../components/buttons/MainButtonsComponent';
// Videos
import Video1 from '../../assets/video/cat_video1.mp4';

const CotdPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [buttonsVisible, setButtonsVisible] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true; // Start muted
    }

    // Timer to hide buttons after 5 seconds
    const timer = setTimeout(() => {
      setButtonsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleScreenTap = () => {
    setButtonsVisible(true);

    // Reset the timer to hide buttons after 5 seconds
    setTimeout(() => {
      setButtonsVisible(false);
    }, 5000);
  };

  return (
    <IonPage onClick={handleScreenTap}>
      <div className='video-container'>
        <video
          ref={videoRef}
          autoPlay
          muted
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src={Video1} type='video/mp4' />
          Your browser does not support the video tag.
        </video>

        {buttonsVisible && <MainButtonsComponent />}
      </div>
    </IonPage>
  );
};

export default CotdPage;
