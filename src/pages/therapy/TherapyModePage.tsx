import React, { useState, useRef, useEffect } from 'react';
import { IonPage } from '@ionic/react';
import Hls from 'hls.js';

const TherapyModePage: React.FC = () => {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const hlsRef1 = useRef<Hls | null>(null);
  const hlsRef2 = useRef<Hls | null>(null);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoList, setVideoList] = useState<string[]>([]);
  const [activeVideo, setActiveVideo] = useState<'video1' | 'video2'>('video1');

  useEffect(() => {
    const fetchVideoList = async () => {
      try {
        const response = await fetch('https://stream.cat-app.app/get-video-list');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        if (data.length === 0) return console.error('No videos available.');

        console.log('📄 Video list fetched:', data);
        setVideoList(data);
      } catch (error) {
        console.error('Error fetching video list:', error);
      }
    };

    fetchVideoList();
  }, []);

  useEffect(() => {
    if (videoList.length > 0) {
      console.log('🎬 Loading first video');
      loadVideo(0, 'video1');
      preloadVideo(1, 'video2');
    }
  }, [videoList]); // Runs only when videoList changes

  const getVideoUrl = (index: number) => {
    if (videoList.length === 0) return '';
    const fullPath = videoList[index];
    const pathParts = fullPath.split('/');
    const videoName = pathParts.pop();
    const videoDir = pathParts.join('/');
    return `https://stream.cat-app.app/get-videos/${videoDir}/${videoName}`;
  };

  const loadVideo = (index: number, player: 'video1' | 'video2') => {
    const videoUrl = getVideoUrl(index);
    console.log(`🔍 Loading video ${index}: ${videoUrl}`);

    const videoElement = player === 'video1' ? videoRef1.current : videoRef2.current;
    const hlsInstance = player === 'video1' ? hlsRef1 : hlsRef2;

    if (!videoElement) return console.error(`❌ No video element for ${player}`);

    // Destroy old HLS instance before loading new one
    if (hlsInstance.current) {
      hlsInstance.current.destroy();
      hlsInstance.current = null;
    }

    if (Hls.isSupported()) {
      hlsInstance.current = new Hls();
      hlsInstance.current.loadSource(videoUrl);
      hlsInstance.current.attachMedia(videoElement);

      hlsInstance.current.on(Hls.Events.ERROR, (_, data) => {
        console.error(`🚨 HLS Error: ${data.type}`, data);
      });

      hlsInstance.current.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log(`✅ Video ready: ${videoUrl}`);
        videoElement.play().catch(err => console.error('Playback error:', err));
      });
    } else {
      console.warn('⚠ HLS not supported, using direct video playback');
      videoElement.src = videoUrl;
      videoElement.load();
      videoElement.play().catch(err => console.error('Playback error:', err));
    }
  };

  const preloadVideo = (index: number, player: 'video1' | 'video2') => {
    const videoUrl = getVideoUrl(index);
    console.log(`🔄 Preloading video ${index} on ${player}: ${videoUrl}`);

    const videoElement = player === 'video1' ? videoRef1.current : videoRef2.current;
    const hlsInstance = player === 'video1' ? hlsRef1 : hlsRef2;

    if (!videoElement) return;

    // Destroy old HLS instance before preloading
    if (hlsInstance.current) {
      hlsInstance.current.destroy();
      hlsInstance.current = null;
    }

    if (Hls.isSupported()) {
      hlsInstance.current = new Hls();
      hlsInstance.current.loadSource(videoUrl);
      hlsInstance.current.attachMedia(videoElement);
    } else {
      videoElement.src = videoUrl;
      videoElement.load();
    }
  };

  const handleVideoEnded = () => {
    const nextIndex = (currentVideoIndex + 1) % videoList.length;
    setCurrentVideoIndex(nextIndex);

    const newActiveVideo = activeVideo === 'video1' ? 'video2' : 'video1';
    setActiveVideo(newActiveVideo);

    // Load new video in the now active player
    loadVideo(nextIndex, newActiveVideo);

    // Preload next video in the hidden player
    const preloadTarget = newActiveVideo === 'video1' ? 'video2' : 'video1';
    preloadVideo((nextIndex + 1) % videoList.length, preloadTarget);

    // Ensure playback starts smoothly
    setTimeout(() => {
      const nextVideo = newActiveVideo === 'video1' ? videoRef1.current : videoRef2.current;
      nextVideo?.play().catch(err => console.error('Playback error:', err));
    }, 500);
  };

  return (
    <IonPage>
      <div className="video-container">
        <video
          ref={videoRef1}
          autoPlay
          muted
          playsInline
          className={`video-player ${activeVideo === 'video1' ? 'active' : 'hidden'}`}
          onEnded={handleVideoEnded}
        />
        <video
          ref={videoRef2}
          muted
          playsInline
          className={`video-player ${activeVideo === 'video2' ? 'active' : 'hidden'}`}
          onEnded={handleVideoEnded}
        />
      </div>
      <style>
        {`
          .video-container {
            position: relative;
            width: 100%;
            height: 100%;
          }
          .video-player {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: opacity 0.5s ease-in-out;
          }
          .hidden {
            opacity: 0;
            pointer-events: none;
          }
          .active {
            opacity: 1;
          }
        `}
      </style>
    </IonPage>
  );
};

export default TherapyModePage;
