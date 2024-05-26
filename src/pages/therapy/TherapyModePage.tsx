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

const TherapyModePage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(!muted);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Therapy Mode</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <div className="video-container">
          <video ref={videoRef} controls style={{ width: '100%', height: '100%' }}>
            <source src="http://localhost:3000/video" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton onClick={toggleMute}>
              <IonIcon icon={muted ? volumeMute : volumeHigh} />
            </IonFabButton>
          </IonFab>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TherapyModePage;
