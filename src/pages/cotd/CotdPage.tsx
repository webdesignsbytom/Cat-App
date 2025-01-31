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

const CotdPage: React.FC = () => {
  // State to manage the current video index
  const [videoIndex, setVideoIndex] = useState<number>(0);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [muted, setMuted] = useState(false);
  const [disabledForward, setDisabledForward] = useState(false);
  const [disabledBack, setDisabledBack] = useState(true);

  // Fetch the playlist from the Playlist context
  const { cotdPlaylist } = usePlaylist();
  const { user } = useUser();
  const videos = cotdPlaylist?.videos || []; // Retrieve videos from the playlist context

  // Update video when videoIndex changes
  useEffect(() => {
    const video = document.getElementById(
      'video-player'
    ) as HTMLVideoElement | null;
    const videoSrc = 'https://stream.cat-app.app/get-video';

    if (!video) return; // Exit if video element is not found

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }
  }, [videoIndex, videos]);

  // Timer to hide buttons after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonsVisible(false);
    }, BUTTON_TIMER);

    return () => clearTimeout(timer);
  }, [buttonsVisible]);

  const handleScreenTap = () => {
    if (!buttonsVisible) {
      setButtonsVisible(true);
    }
  };

  const likeVideo = () => {
    console.log('Video liked');
  };

  // Handle next video
  const requestNextVideo = () => {
    if (videoIndex < videos.length - 1) {
      setVideoIndex(videoIndex + 1);
    }
  };

  // Handle previous video
  const requestPreviousVideo = () => {
    if (videoIndex > 0) {
      setVideoIndex(videoIndex - 1);
    }
  };

  return (
    <IonPage onClick={handleScreenTap}>
      <div className='video-container'>
        <video
          autoPlay
          muted
          id='video-player'
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => console.error('Error loading video:', e)}
        ></video>

        {/* Display video data if the user role is "admin" or "developer" */}
        {(user?.role === 'ADMIN' || user?.role === 'DEVELOPER') &&
          videos.length > 0 && (
            <VideoDataComponent video={videos[videoIndex]} />
          )}

        {/* Button component */}
        {buttonsVisible && (
          <MainButtonsComponent
            onGoBack={requestPreviousVideo}
            onGoForward={requestNextVideo}
            onToggleMute={requestNextVideo}
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
