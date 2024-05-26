// src/pages/VideoPlayer.tsx
import React, { useState, useRef } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import { volumeMute, volumeHigh, playForward, playBack } from 'ionicons/icons';
// Videos
import Video1 from '../../assets/Video/cat_video1.mp4'

const CotdPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);

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

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <div className="video-container">
          <video ref={videoRef} controls style={{ width: '100%', height: '100%' }}>
            <source src={Video1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton onClick={goBack}>
              <IonIcon icon={playBack} />
            </IonFabButton>
            <IonFabButton onClick={toggleMute}>
              <IonIcon icon={muted ? volumeMute : volumeHigh} />
            </IonFabButton>
            <IonFabButton onClick={goForward}>
              <IonIcon icon={playForward} />
            </IonFabButton>
          </IonFab>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CotdPage;
