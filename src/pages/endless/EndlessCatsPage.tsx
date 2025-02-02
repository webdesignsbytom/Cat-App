import React, { useState, useRef, useEffect } from 'react';
import { IonPage } from '@ionic/react';
import Hls from 'hls.js';
// Api
import client from '../../api/client';
// Constants
import { BUTTON_TIMER } from '../../utils/contstants/Constants';
// Interfaces
import { VideoItem, VideoPlaylistItem, VideoStatus } from '../../interfaces';
// Components
import MainButtonsComponent from '../../components/buttons/MainButtonsComponent';

const EndlessCatsPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [muted, setMuted] = useState(false);
  const [catVideoArray, setCatVideoArray] = useState<VideoItem[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoListState, setVideoListState] = useState<VideoPlaylistItem>({
    id: 'endless-cats',
    videoListData: {},
    currentVideoIndex: 0,
    videoList: [], // This will be populated with Video objects
  });

  
  useEffect(() => {
    const fetchVideoList = async () => {
      try {
        const response = await fetch('https://stream.cat-app.app/get-video-list');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('>>> Data ', data);
        if (data.length === 0) {
          console.error('No videos available.');
        } else {
          // Map the data to Video objects, assuming the response contains fields needed for Video interface
          const videos: VideoItem[] = data.map((videoData: any) => ({
            id: videoData.id,
            label: videoData.label,
            name: videoData.name,
            videoStatus: VideoStatus.APPROVED, // Assuming all videos are approved for simplicity
            path: videoData.path,
            size: videoData.size,
            duration: videoData.duration,
            codec: videoData.codec,
            isDelete: videoData.isDelete,
            createdAt: new Date(videoData.createdAt),
            updatedAt: videoData.updatedAt ? new Date(videoData.updatedAt) : undefined,
          }));
          
          setVideoListState({
            id: videoListState.id,
            videoListData: data, // Assuming catVideo data is in the same response
            currentVideoIndex: 0,
            videoList: videos,
          });

          loadNextVideo(videos, 0); // Load the first video
        }
      } catch (error) {
        console.error('Error fetching video list:', error);
      }
    };

    fetchVideoList();
  }, []);

  const loadNextVideo = (videoList: VideoItem[], index: number) => {
    if (videoList.length === 0) {
      console.error('No videos available.');
      return;
    }

    const fullPath = videoList[index].path;
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
    const nextIndex = (videoListState.currentVideoIndex + 1) % videoListState.videoList.length;
    setVideoListState((prevState) => ({
      ...prevState,
      currentVideoIndex: nextIndex,
    }));
    loadNextVideo(videoListState.videoList, nextIndex);
  };

  const handleScreenTap = () => {
    if (buttonsVisible) return;

    setButtonsVisible(true);
  };

  const goBack = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? catVideoArray.length - 1 : prevIndex - 1
    );
  };

  const goForward = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === catVideoArray.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleMute = () => {
    setMuted((prevMuted) => !prevMuted);
  };

  const likeVideo = () => {
    console.log('Video liked');
  };

  return (
    <IonPage onClick={handleScreenTap}>
      <div className="video-container">
        <video
          ref={videoRef}
          autoPlay
          muted={muted}
          id="video-player"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onEnded={handleVideoEnded}
          onError={(e) => console.error('Error loading video:', e)}
        ></video>

        {buttonsVisible && (
          <MainButtonsComponent
            onGoBack={goBack}
            onGoForward={goForward}
            onToggleMute={toggleMute}
            onLike={likeVideo}
            isMuted={muted}
            disabledForward={true}
            disabledBack={true}
          />
        )}
      </div>
    </IonPage>
  );
};

export default EndlessCatsPage