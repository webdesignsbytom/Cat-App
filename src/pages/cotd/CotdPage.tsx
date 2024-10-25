import React, { useState, useRef, useEffect } from 'react';
import { IonPage } from '@ionic/react';
import Hls from 'hls.js';
// Components
import MainButtonsComponent from '../../components/buttons/MainButtonsComponent';
// Constants
import { BUTTON_TIMER } from '../../utils/contstants/Constants';
import { usePlaylist } from '../../context/PlaylistContext';
import { useUser } from '../../context/UserContext';
import VideoDataComponent from '../../components/admin/VideoDataComponent';
import ReactHlsPlayer from 'react-hls-player';

const CotdPage: React.FC = () => {
  const playerRef = useRef<HTMLVideoElement>(null);
  const [hlsUrl, setHlsUrl] = useState(
    'http://localhost:4100/videos/get-video-stream?bucket=catapp&folder=videos%2Freview&videoName=1729863803132.m3u8'
  );
  const [videoIndex, setVideoIndex] = useState<number>(0);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [muted, setMuted] = useState(false);
  const [disabledForward, setDisabledForward] = useState(false);
  const [disabledBack, setDisabledBack] = useState(true);

  const { cotdPlaylist } = usePlaylist();
  const { user } = useUser();
  const videos = cotdPlaylist?.videos || [];

  useEffect(() => {
    const timer = setTimeout(() => setButtonsVisible(false), BUTTON_TIMER);
    return () => clearTimeout(timer);
  }, [buttonsVisible]);

  const handleScreenTap = () => {
    if (!buttonsVisible) setButtonsVisible(true);
  };

  const toggleMute = () => {}

  const likeVideo = () => console.log('Video liked');

  const requestNextVideo = () => {
    if (videoIndex < videos.length - 1) setVideoIndex(videoIndex + 1);
  };

  const requestPreviousVideo = () => {
    if (videoIndex > 0) setVideoIndex(videoIndex - 1);
  };

  return (
    <IonPage onClick={handleScreenTap}>
      <div className='video-container'>
        <ReactHlsPlayer
          playerRef={playerRef}
          src={hlsUrl}
          autoPlay={true}
          controls={false}
          width='60%'
          height='auto'
        />

        {(user?.role === 'ADMIN' || user?.role === 'DEVELOPER') &&
          videos.length > 0 && (
            <VideoDataComponent video={videos[videoIndex]} />
          )}

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
