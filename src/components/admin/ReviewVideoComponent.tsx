import React, { useRef, useState } from 'react';
// Api
import client from '../../api/client';
// Constants
import {
  ADMIN_APPROVE_VIDEO_URL,
  ADMIN_DELETE_VIDEO_URL,
  ADMIN_REVIEW_NEXT_VIDEO_URL,
  ADMIN_REVIEW_PREVIOUS_VIDEO_URL,
  ADMIN_REVIEW_VIDEO_URL,
} from '../../utils/contstants/Constants';

const ReviewVideoComponent: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState('xxx');
  const [muted, setMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const fetchNextVideo = async () => {
    // Mock API call to fetch next video URL
    fetchVideo(ADMIN_REVIEW_VIDEO_URL);
  };

  const handleStart = async () => {
    await fetchNextVideo();
    setStarted(true);
  };

  const fetchVideo = async (url: string) => {
    client
      .getVideoAuth(url)
      .then((res) => {
        console.log('res', res);
        console.log('res.data', res.data);
        console.log('res.data', res.headers);
        const videoUrl = URL.createObjectURL(res.data);

        if (videoRef.current) {
          videoRef.current.src = videoUrl;
        }
      })
      .catch((err) => {
        console.error('Unable to get video', err);
      });
  };

  const requestNextVideo = () => fetchVideo(ADMIN_REVIEW_NEXT_VIDEO_URL);
  const requestPreviousVideo = () =>
    fetchVideo(ADMIN_REVIEW_PREVIOUS_VIDEO_URL);

  const handleDelete = () => {
    client
      .delete(`${ADMIN_DELETE_VIDEO_URL}/${currentVideoId}`)
      .then((res) => {
        console.log('res', res.data);
      })
      .catch((err) => {
        console.error('Unable to delete video', err);
      });
  };

  const handleApprove = () => {
    // Handle approve video logic
    client
      .post(`${ADMIN_APPROVE_VIDEO_URL}/${currentVideoId}`, null)
      .then((res) => {
        console.log('res', res.data);
      })
      .catch((err) => {
        console.error('Unable to approve video', err);
      });
  };

  const handleRestart = () => {
    const videoElement = document.getElementById(
      'video-player'
    ) as HTMLVideoElement;
    if (videoElement) {
      videoElement.currentTime = 0;
      videoElement.play();
    }
  };

  const buttons = [
    {
      label: 'Previous',
      className: 'bg-main-colour',
      onClick: requestPreviousVideo,
    },
    { label: 'Next', className: 'bg-main-colour', onClick: requestNextVideo },
    { label: 'Restart', className: 'bg-main-colour', onClick: handleRestart },
    { label: 'Approve', className: 'bg-green-500', onClick: handleApprove },
    { label: 'Delete', className: 'bg-red-500', onClick: handleDelete },
  ];

  return (
    <div className='grid h-full w-full overflow-hidden'>
      <div className='grid grid-rows-2 h-full overflow-hidden'>
        <section className='grid items-center justify-center bg-gray-200 w-full h-full overflow-hidden'>
          {videoRef ? (
            <video
              ref={videoRef}
              autoPlay
              muted={muted}
              style={{ width: '100%', height: '100%', objectFit: 'cover', padding: '1rem' }}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <p>No video to display</p>
          )}
        </section>
        <div className='grid items-center'>
          {!started ? (
            <section className='grid w-[65%] mx-auto'>
              <button
                className='px-4 py-2 text-white bg-main-colour rounded'
                onClick={handleStart}
              >
                Start
              </button>
            </section>
          ) : (
            // Buttons controls
            <section className='grid w-full h-full px-4 py-4'>
              <section className='grid grid-cols-3 h-fit gap-x-2 gap-y-6'>
                {buttons.map((button, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 text-white rounded ${button.className} h-fit w-full`}
                    onClick={button.onClick}
                  >
                    {button.label}
                  </button>
                ))}
              </section>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewVideoComponent;
