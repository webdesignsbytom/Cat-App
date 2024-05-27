import React, { useState } from 'react';
import { IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
// Components
import MainButtonsComponent from '../../components/buttons/MainButtonsComponent';
// Icons
import { FaBackward, FaForward, FaHome } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
// Images
import Image1 from '../../assets/images/background/small_cat_blue_1.png'
import Image2 from '../../assets/images/background/small_cat_blue_2.png'

const AiCatsPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([
    Image1, Image2
  ]);
  const history = useHistory();

  const goBack = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const goForward = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <IonPage onClick={() => setCurrentIndex(currentIndex)}>
      <div className='relative h-full w-full'>
        <img
          src={images[currentIndex]}
          alt="cat"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        <MainButtonsComponent />
      </div>
    </IonPage>
  );
};

export default AiCatsPage;
