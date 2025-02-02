import React, { useState, useRef, useEffect } from 'react';
import { IonPage } from '@ionic/react';
import Hls from 'hls.js';
// Components
import MainButtonsComponent from '../../components/buttons/MainButtonsComponent';
// Api
import client from '../../api/client';
// Videos
// Constants
import { BUTTON_TIMER } from '../../utils/contstants/Constants';

const TherapyModePage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const preloadVideoRef = useRef<HTMLVideoElement>(null);

  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [muted, setMuted] = useState(false);
  const [catVideoArray, setCatVideoArray] = useState<[]>();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoList, setVideoList] = useState<string[]>([]);

  useEffect(() => {
    // Fetch video list from server
    const fetchVideoList = async () => {
      try {
        const response = await fetch('https://stream.cat-app.app/get-video-list');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.length === 0) {
          console.error('No videos available.');
        } else {
          setVideoList(data);
          loadNextVideo(data, 0); // Load the first video
        }
      } catch (error) {
        console.error('Error fetching video list:', error);
      }
    };

    fetchVideoList();
  }, []);

  const loadNextVideo = (videoList: string[], index: number) => {
    if (videoList.length === 0) {
      console.error('No videos available.');
      return;
    }

    const fullPath = videoList[index];
    const pathParts = fullPath.split('/');
    const videoName = pathParts.pop();
    const videoDir = pathParts.join('/');

    console.log(`videoDir: ${videoDir}, videoName: ${videoName}`);

    const nextVideoSrc = `https://stream.cat-app.app/get-videos/${videoDir}/${videoName}`;
    const video = videoRef.current;

    if (video) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(nextVideoSrc);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.muted = muted;
          video.play().catch((error) => console.error('Playback error:', error));
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = nextVideoSrc;
        video.muted = muted;
        video.addEventListener('loadedmetadata', () => {
          video.play().catch((error) => console.error('Playback error:', error));
        });
      }
    }
  };

  const handleVideoEnded = () => {
    const nextIndex = (currentVideoIndex + 1) % videoList.length;
    setCurrentVideoIndex(nextIndex);
    loadNextVideo(videoList, nextIndex);
    preloadNextVideo((nextIndex + 1) % videoList.length);
  };

  const preloadNextVideo = (nextIndex: number) => {
    if (videoList.length === 0) return;
  
    const fullPath = videoList[nextIndex];
    const pathParts = fullPath.split('/');
    const videoName = pathParts.pop();
    const videoDir = pathParts.join('/');
  
    const nextVideoSrc = `https://stream.cat-app.app/get-videos/${videoDir}/${videoName}`;
  
    if (preloadVideoRef.current) {
      preloadVideoRef.current.src = nextVideoSrc;
      preloadVideoRef.current.load();
    }
  };
  
  const handleScreenTap = () => {
    if (buttonsVisible) return;

    setButtonsVisible(true);
  };

  return (
    <IonPage onClick={handleScreenTap}>
      <div className="video-container">
        <video
          ref={videoRef}
          autoPlay
          preload="auto"
          muted={muted}
          id="video-player"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onEnded={handleVideoEnded}
          onError={(e) => console.error('Error loading video:', e)}
        ></video>
      </div>
    </IonPage>
  );
};

export default TherapyModePage