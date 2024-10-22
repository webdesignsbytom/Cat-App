import React, { useEffect, useState, useRef } from 'react';
import { IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
// Components
import MainButtonsComponent from '../../components/buttons/MainButtonsComponent';
// Images
import {
  CatImage,
  arrayOfCatImages,
  slideshowImages,
} from '../../utils/images/CatImages';
// Audio
import audioFile from '../../assets/Audio/slideshow/rossini_il_barbiere_di_siviglia_overture.mp3';
// Constants
import { BUTTON_TIMER } from '../../utils/contstants/Constants';

const AiCatsPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<CatImage[]>(arrayOfCatImages);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(true);

  // Audio
  const audioRef = useRef<HTMLAudioElement>(null);

  const history = useHistory();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSlideshow) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex < images.length - 1 ? prevIndex + 1 : 0
        );
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isSlideshow, images.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonsVisible(false);
    }, BUTTON_TIMER);

    return () => clearTimeout(timer);
  }, [buttonsVisible]);

  const goBack = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const goForward = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const likeImage = () => {
    // Handle like image logic here
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  };

  const handleScreenTap = () => {
    if (buttonsVisible) return;
    setButtonsVisible(true);
  };

  const startSlideshow = () => {
    setImages(slideshowImages);
    setCurrentIndex(0);
    setIsSlideshow(true);
  };

  const endSlideshow = () => {
    setImages(arrayOfCatImages);
    setCurrentIndex(0);
    setIsSlideshow(false);
  };

  return (
    <IonPage onClick={handleScreenTap}>
      <div className='relative h-full w-full bg-white'>
        <img
          src={images[currentIndex].imageUrl}
          alt={images[currentIndex].name}
          className='w-full h-full object-cover'
        />

        {isSlideshow && (
          <audio
            ref={audioRef}
            src={audioFile}
            autoPlay
            loop
            muted={isMuted}
            onLoadedMetadata={() => {
              if (audioRef.current) {
                audioRef.current.currentTime = 60; // Start audio from 1 minute (60 seconds)
              }
            }}
          />
        )}

        {buttonsVisible && (
          <section className='absolute bottom-24 grid gap-4 w-full h-fit px-6'>
            <section className='grid justify-center'>
              <div>
                {isSlideshow ? (
                  <button
                    onClick={endSlideshow}
                    className='bg-main-colour text-white py-2 px-4 rounded-lg shadow-lg active:scale-95 active:bg-main-colour-alt'
                  >
                    <span className='text-lg font-medium'>END SLIDESHOW</span>
                  </button>
                ) : (
                  <button
                    onClick={startSlideshow}
                    className='bg-main-colour text-white py-2 px-4 rounded-lg shadow-lg active:scale-95 active:bg-main-colour-alt'
                  >
                    <span className='text-lg font-medium'>PLAY SLIDESHOW</span>
                  </button>
                )}
              </div>
            </section>
          </section>
        )}

        {buttonsVisible && (
          <MainButtonsComponent
            onGoBack={goBack}
            onGoForward={goForward}
            onToggleMute={toggleMute}
            onLike={likeImage}
            isMuted={isMuted}
            disabledForward={true}
            disabledBack={true}
          />
        )}
      </div>
    </IonPage>
  );
};

export default AiCatsPage;
