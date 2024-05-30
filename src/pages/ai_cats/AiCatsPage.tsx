import React, { useEffect, useState } from 'react';
import { IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
// Components
import MainButtonsComponent from '../../components/buttons/MainButtonsComponent';
// Icons
import {
  FaBackward,
  FaForward,
  FaHome,
  FaVolumeMute,
  FaVolumeUp,
} from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { CatImage, arrayOfCatImages } from './CatImages';

const AiCatsPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images] = useState<CatImage[]>(arrayOfCatImages);
  const [muted, setMuted] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(true);

  const history = useHistory();

  useEffect(() => {
    // Timer to hide buttons after 5 seconds
    const timer = setTimeout(() => {
      setButtonsVisible(false);
    }, 5000);

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

  const navigateHome = () => {
    history.push('/menu');
  };

  const likeImage = () => {};

  const playCatHistorySlideShow = () => {};

  const toggleMute = () => {
    setMuted(!muted);
  };

  const handleScreenTap = () => {
    if (buttonsVisible) return;

    setButtonsVisible(true);
  };

  return (
    <IonPage onClick={handleScreenTap}>
      <div className='relative h-full w-full bg-white'>
        <img
          src={images[currentIndex].imageUrl}
          alt={images[currentIndex].name}
          className='w-full h-full object-cover'
        />

        {buttonsVisible && (
          <section className='absolute bottom-0 grid gap-4 w-full h-fit px-6 py-10'>
            <section className='grid justify-center'>
              <div>
                <button
                  onClick={playCatHistorySlideShow}
                  className='bg-main-colour text-white py-2 px-4 rounded-lg shadow-md active:scale-95 active:bg-main-colour-alt'
                >
                  <span className='text-lg font-medium'>PLAY SLIDESHOW</span>
                </button>
              </div>
            </section>

            <section className='grid grid-cols-5 w-full h-fit'>
              <div className='grid justify-center items-center'>
                <button
                  onClick={goBack}
                  className='bg-main-colour text-white p-2 rounded-lg shadow-md active:scale-95 active:bg-main-colour-alt'
                >
                  <FaBackward size={30} />
                </button>
              </div>
              <div className='grid justify-center items-center'>
                <button
                  onClick={navigateHome}
                  className='bg-main-colour text-white p-2 rounded-lg shadow-md active:scale-95 active:bg-main-colour-alt'
                >
                  <FaHome size={30} />
                </button>
              </div>
              <div className='grid justify-center items-center'>
                <button
                  onClick={likeImage}
                  className='bg-main-colour text-white p-2 rounded-lg shadow-md active:scale-95 active:bg-main-colour-alt'
                >
                  <FcLike size={30} />
                </button>
              </div>
              <div className='grid justify-center items-center'>
                <button
                  onClick={toggleMute}
                  className='bg-main-colour text-white p-2 rounded-lg shadow-md active:scale-95 active:bg-main-colour-alt'
                >
                  {muted ? (
                    <FaVolumeMute size={30} />
                  ) : (
                    <FaVolumeUp size={30} />
                  )}
                </button>
              </div>
              <div className='grid justify-center items-center'>
                <button
                  onClick={goForward}
                  className='bg-main-colour text-white p-2 rounded-lg shadow-md active:scale-95 active:bg-main-colour-alt'
                >
                  <FaForward size={30} />
                </button>
              </div>
            </section>
          </section>
        )}
      </div>
    </IonPage>
  );
};

export default AiCatsPage;
