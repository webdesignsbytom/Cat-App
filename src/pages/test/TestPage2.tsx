import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
// Logo
import CatAppLogo from '../../assets/images/logos/CAT APP-01.svg';
// Images
import BlueCat1 from '../../assets/images/background/small_cat_blue_1.png';
import BlueCat3 from '../../assets/images/background/small_cat_blue_3.png';
import WhiteCat1 from '../../assets/images/background/small_cat_white_1.png';
import WhiteCat2 from '../../assets/images/background/small_cat_white_2.png';
import RedCat1 from '../../assets/images/background/small_cat_red_1.png';

const TestPage2: React.FC = () => {
  const history = useHistory();
  const [listOfButtons, setListOfButtons] = useState([
    {
      title: 'Cat of the Day',
      link: '/cotd',
    },
    {
      title: 'Endless Cats',
      link: '/endless-cats',
    },
    {
      title: 'Therapy Mode',
      link: '/therapy-mode',
    },
    {
      title: 'Menu',
      link: '/menu',
    },
  ]);

  const navigateTo = (path: string) => {
    history.push(path);
  };

  return (
    <IonPage>
      <main className='grid grid-rows-2 w-full h-full bg-white py-4'>
        {/* Logo section */}
        <section className='grid justify-center items-center p-2'>
          <img src={CatAppLogo} alt='Cat App logo' className='w-full h-full' />
        </section>

        <section className='relative grid h-full w-full pb-16'>
          <div className='grid w-[65%] mx-auto h-full items-center'>
            <section className='grid grid-rows-4 gap-2 w-full h-fit'>
              {listOfButtons.map((button, index) => (
                <div key={index}>
                  <button
                    className='px-2 py-2 rounded-lg w-full h-[52px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
                    onClick={() => navigateTo(button.link)}
                  >
                    {button.title}
                  </button>
                </div>
              ))}
            </section>
          </div>

          {/* Background images top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  */}
          {/* Left */}
          <div className='absolute top-1/2 left-0 transform -translate-y-1/2 pb-6'>
            <img
              src={BlueCat1}
              alt='Blue cat one'
              className='z-10 w-20 h-auto'
            />
          </div>
          <div className='absolute bottom-0 left-0'>
            <img
              src={WhiteCat1}
              alt='White cat one'
              className='z-10 w-20 h-auto'
            />
          </div>

          {/* Right */}
          <div className='absolute top-1/2 right-0 transform -translate-y-1/2'>
            <img
              src={WhiteCat2}
              alt='White cat two'
              className='z-10 w-20 h-auto pb-6'
            />
          </div>
          <div className='absolute bottom-0 right-0'>
            <img src={RedCat1} alt='Red cat one' className='z-10 w-20 h-auto' />
          </div>

          {/* Bottom */}
          <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2'>
            <img
              src={BlueCat3}
              alt='Blue cat three'
              className='z-10 w-20 h-auto'
            />
          </div>
        </section>
      </main>
    </IonPage>
  );
};

export default TestPage2;
