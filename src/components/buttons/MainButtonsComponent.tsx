import React, { useState } from 'react';
import { useHistory } from 'react-router';
// Icons
import { FaBackward, FaForward, FaVolumeMute, FaHome, FaVolumeUp } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';

interface MainButtonsComponentProps {
  onGoBack: () => void;
  onGoForward: () => void;
  onToggleMute: () => void;
  onLike: () => void;
  isMuted: boolean;
  disabledForward: boolean;
  disabledBack: boolean;
}

const MainButtonsComponent: React.FC<MainButtonsComponentProps> = ({
  onGoBack,
  onGoForward,
  onToggleMute,
  onLike: onLikeVideo,
  isMuted,
  disabledForward,
  disabledBack
}) => {
  const history = useHistory();
  const [likeAnimation, setLikeAnimation] = useState(false);
  const [secondLikeAnimation, setSecondLikeAnimation] = useState(false);
  const [thirdLikeAnimation, setThirdLikeAnimation] = useState(false);

  const navigateHome = () => {
    history.push('/home'); // Navigate to the home page
  };

  const handleLikeClick = () => {
    setLikeAnimation(true);
    setSecondLikeAnimation(true);
    setThirdLikeAnimation(true);
    onLikeVideo();
    setTimeout(() => {
      setLikeAnimation(false);
      setSecondLikeAnimation(false);
      setThirdLikeAnimation(false);
    }, 1000); // duration of the animation
  };

  const buttons = [
    { onClick: onGoBack, icon: <FaBackward size={30} />, className: disabledBack ? 'hidden' : '' },
    { onClick: navigateHome, icon: <FaHome size={30} />, disabled: false },
    { 
      onClick: handleLikeClick, 
      icon: <FcLike size={30} />, 
      disabled: false,
      className: likeAnimation || secondLikeAnimation || thirdLikeAnimation ? 'animate-like' : '' // Only the like button 
    },
    { onClick: onToggleMute, icon: isMuted ? <FaVolumeMute size={30} /> : <FaVolumeUp size={30} />,  disabled: false },
    { onClick: onGoForward, icon: <FaForward size={30} />, className: disabledForward ? 'hidden' : '' },
  ];

  return (
    <section className='absolute bottom-6 grid grid-cols-5 w-full h-fit px-6'>
      {buttons.map((button, index) => (
        <div key={index} className='grid justify-center items-center relative'>
          <button
            onClick={button.onClick}
            className={`bg-main-colour text-white p-2 rounded-lg shadow-lg active:scale-95 active:bg-main-colour-alt active:outline-[8px] active:outline active:outline-main-colour ${button.className ?? ''}`}
          >
            {button.icon}
          </button>
          {button.icon.type === FcLike && likeAnimation && (
            <div className="floating-icon">
              <FcLike size={30} />
            </div>
          )}
          {button.icon.type === FcLike && secondLikeAnimation && (
            <div className="floating-icon-second">
              <FcLike size={30} />
            </div>
          )}
          {button.icon.type === FcLike && thirdLikeAnimation && (
            <div className="floating-icon-third">
              <FcLike size={30} />
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default MainButtonsComponent;
