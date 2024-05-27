import React, { useState } from 'react';
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
// Images
import Image1 from '../../assets/images/Ai/cat_ai_image_1.png';
import Image2 from '../../assets/images/Ai/cat_ai_image_2.png';
import Image3 from '../../assets/images/Ai/cat_ai_image_3.png';
import Image4 from '../../assets/images/Ai/cat_ai_image_4.png';

const AiCatsPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([Image1, Image2, Image3, Image4]);
  const [muted, setMuted] = useState(false);

  const history = useHistory();

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
    history.push('/home'); // Navigate to the home page
  };

  const likeImage = () => {};
  
  const toggleMute = () => {
    if (muted) {
      setMuted(!muted);
    }
  };

  return (
    <IonPage onClick={() => setCurrentIndex(currentIndex)}>
      <div className='relative h-full w-full bg-white'>
        <img
          src={images[currentIndex]}
          alt='cat'
          className='w-full h-full object-cover'
        />

        <section className='absolute bottom-0 grid grid-cols-5 w-full h-fit px-6 py-10'>
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
              {muted ? <FaVolumeMute size={30} /> : <FaVolumeUp size={30} />}
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
      </div>
    </IonPage>
  );
};

export default AiCatsPage;
