import React, { useState, useRef, useEffect } from 'react';
import { IonPage } from '@ionic/react';
// Components
import MainButtonsComponent from '../../components/buttons/MainButtonsComponent';
// Constants
import { BUTTON_TIMER } from '../../utils/contstants/Constants';
import { usePlaylist } from '../../context/PlaylistContext';
import { useUser } from '../../context/UserContext';
import VideoDataComponent from '../../components/admin/VideoDataComponent';

const CotdPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

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
    if (videos.length > 0 && videoRef.current) {
      const currentVideo = videos[videoIndex];
      const videoSrc = `https://catapi.cat-app.app/videos/get-video-stream?${currentVideo.path}`;
      videoRef.current.src = videoSrc;
      videoRef.current.load();
      videoRef.current.play();

      // Update forward/backward button states
      setDisabledBack(videoIndex === 0);
      setDisabledForward(videoIndex === videos.length - 1);
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

  const toggleMute = () => {
    setMuted((prevMuted) => !prevMuted);
    if (videoRef.current) {
      videoRef.current.muted = !muted;
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
        {videos.length > 0 ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => console.error('Error loading video:', e)}
          >
            <source
              src={`https://catapi.cat-app.app/videos/get-video-stream?${videos[videoIndex].path}`}
              type='video/mp4'
            />
          </video>
        ) : (
          <p>No videos available</p>
        )}

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
