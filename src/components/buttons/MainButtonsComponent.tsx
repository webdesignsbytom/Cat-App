import React from 'react';
import { useHistory } from 'react-router';
import { FaBackward, FaForward, FaVolumeMute, FaHome, FaVolumeUp } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';

interface MainButtonsComponentProps {
  onGoBack: () => void;
  onGoForward: () => void;
  onToggleMute: () => void;
  onLikeVideo: () => void;
  isMuted: boolean;
}

const MainButtonsComponent: React.FC<MainButtonsComponentProps> = ({
  onGoBack,
  onGoForward,
  onToggleMute,
  onLikeVideo,
  isMuted,
}) => {
  const history = useHistory();

  const navigateHome = () => {
    history.push('/home'); // Navigate to the home page
  };

  const buttons = [
    { onClick: onGoBack, icon: <FaBackward size={30} /> },
    { onClick: navigateHome, icon: <FaHome size={30} /> },
    { onClick: onLikeVideo, icon: <FcLike size={30} /> },
    { onClick: onToggleMute, icon: isMuted ? <FaVolumeMute size={30} /> : <FaVolumeUp size={30} /> },
    { onClick: onGoForward, icon: <FaForward size={30} /> },
  ];

  return (
    <section className='absolute bottom-0 grid grid-cols-5 w-full h-fit px-6 py-10'>
      {buttons.map((button, index) => (
        <div key={index} className='grid justify-center items-center'>
          <button
            onClick={button.onClick}
            className='bg-main-colour text-white p-2 rounded-lg shadow-md active:scale-95 active:bg-main-colour-alt'
          >
            {button.icon}
          </button>
        </div>
      ))}
    </section>
  );
};

export default MainButtonsComponent;
