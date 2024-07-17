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
  const [disabledForward, setDisabledForward] = useState(false);
  const [disabledBack, setDisabledBack] = useState(true);
  // Videos index
  const [videoIndex, setVideoIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonsVisible(false);
    }, BUTTON_TIMER);

    return () => clearTimeout(timer);
  }, [buttonsVisible]);

  const fetchVideo = async (url: string, videoId: number) => {
    client
      .getVideo(`${url}/${videoId}`)
      .then((res) => {
        const videoUrl = URL.createObjectURL(res.data);

        if (videoRef.current) {
          videoRef.current.src = videoUrl;
        }
      })
      .catch((err) => {
        console.error(`Unable to get video ${videoId}`, err);
      });
  };

  useEffect(() => {
    fetchVideo(COTD_VIDEO_URL, videoIndex);
  }, []);

  const requestNextVideo = () => {
    let newId = videoIndex + 1;
    if (videoIndex === 0) {
      setDisabledBack(false)
    }
    setVideoIndex((prevIndex) => prevIndex + 1);
    fetchVideo(COTD_VIDEO_URL, newId);
  };

  const requestPreviousVideo = () => {
    let newId = videoIndex - 1;
    checkForDisabled(newId)
    setVideoIndex((prevIndex) => prevIndex - 1);
    fetchVideo(COTD_VIDEO_URL, newId);
  };

  const checkForDisabled = (videoId: number) => {
    if (videoId - 1 < 0) setDisabledBack(true)
  }

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

        {/* Button component */}
        {buttonsVisible && (
          <MainButtonsComponent
            onGoBack={requestPreviousVideo}
            onGoForward={requestNextVideo}
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

export default CotdPage;
