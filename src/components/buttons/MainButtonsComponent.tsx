// src/pages/VideoPlayer.tsx
import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router';
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
  IonBackButton,
} from '@ionic/react';
import {
  FaBackward,
  FaForward,
  FaVolumeMute,
  FaHome,
  FaVolumeUp,
} from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';

const MainButtonsComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  const history = useHistory();

  const toggleMute = () => {
    if (videoRef.current) {
      setMuted(!muted);
    }
  };

  const goBack = () => {};

  const goForward = () => {};

  const likeVideo = () => {};

  const navigateHome = () => {
    history.push('/home'); // Navigate to the home page
  };

  return (
    <section className='absolute bottom-0 grid grid-cols-5 w-full h-fit px-6 py-10'>
      <div className='grid justify-center items-center'>
        <button
          onClick={goBack}
          className='bg-main-colour text-white p-2 rounded-lg shadow-md active:scale-95 active:bg-main-colour-alt'
        >
          <FaBackward size={30} />
        </button>
      </div>
      <div className='grid justify-center items-center'>
        <button
          onClick={navigateHome}
          className='bg-main-colour text-white p-2 rounded-lg shadow-md active:scale-95 active:bg-main-colour-alt'
        >
          <FaHome size={30} />
        </button>
      </div>
      <div className='grid justify-center items-center'>
        <button
          onClick={likeVideo}
          className='bg-main-colour text-white p-2 rounded-lg shadow-md active:scale-95 active:bg-main-colour-alt'
        >
          <FcLike size={30} />
        </button>
      </div>
      <div className='grid justify-center items-center'>
        <button
          onClick={toggleMute}
          className='bg-main-colour text-white p-2 rounded-lg shadow-md active:scale-95 active:bg-main-colour-alt'
        >
          {muted ? <FaVolumeMute size={30} /> : <FaVolumeUp size={30} />}
        </button>
      </div>
      <div className='grid justify-center items-center'>
        <button
          onClick={goForward}
          className='bg-main-colour text-white p-2 rounded-lg shadow-md active:scale-95 active:bg-main-colour-alt'
        >
          <FaForward size={30} />
        </button>
      </div>
    </section>
  );
};

export default MainButtonsComponent;
