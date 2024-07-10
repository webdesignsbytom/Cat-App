import React, { useState, useRef, useEffect } from 'react';
import { IonPage } from '@ionic/react';
// Components
import MainButtonsComponent from '../../components/buttons/MainButtonsComponent';
// Api
import client from '../../api/client';
// Constants
import {
  BUTTON_TIMER,
  COTD_NEXT_VIDEO_URL,
  COTD_PREVIOUS_VIDEO_URL,
  COTD_VIDEO_URL,
} from '../../utils/contstants/Constants';

const CotdPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [muted, setMuted] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonsVisible(false);
    }, BUTTON_TIMER);

    return () => clearTimeout(timer);
  }, [buttonsVisible]);

  const fetchVideo = async (url: string) => {
    client
      .getVideo(url)
      .then((res) => {
        const videoUrl = URL.createObjectURL(res.data);
        setVideoUrl(videoUrl);

        if (videoRef.current) {
          videoRef.current.src = videoUrl;
        }
      })
      .catch((err) => {
        console.error('Unable to get video', err);
      });
  };

  useEffect(() => {
    fetchVideo(COTD_VIDEO_URL);
  }, []);


  const requestNextVideo = () => fetchVideo(COTD_NEXT_VIDEO_URL);
  const requestPreviousVideo = () => fetchVideo(COTD_PREVIOUS_VIDEO_URL);

  const handleScreenTap = () => {
    if (buttonsVisible) return;

    setButtonsVisible(true);
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
          Your browser does not support the video tag.
        </video>
        {buttonsVisible && (
          <MainButtonsComponent
            onGoBack={requestPreviousVideo}
            onGoForward={requestNextVideo}
            onToggleMute={toggleMute}
            onLike={likeVideo}
            isMuted={muted}
            disabled={false}
          />
        )}
      </div>
    </IonPage>
  );
};

export default CotdPage;
