import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage } from '@ionic/react';
// Images
import BlueCat1 from '../../assets/images/background/small_cat_blue_1.png';
import BlueCat2 from '../../assets/images/background/small_cat_blue_2.png';
import BlueCat3 from '../../assets/images/background/small_cat_blue_3.png';
import WhiteCat1 from '../../assets/images/background/small_cat_white_1.png';
import WhiteCat2 from '../../assets/images/background/small_cat_white_2.png';
import RedCat1 from '../../assets/images/background/small_cat_red_1.png';
import YellowCat1 from '../../assets/images/background/small_cat_yellow_1.png';

const MenuPage: React.FC = () => {
  const history = useHistory();
  const [firstListOfButtons] = useState([
    {
      title: 'AI Cats',
      link: '/ai-cats',
    },
    {
      title: 'Drawing',
      link: '/drawing',
    },
    {
      title: 'Catigotchi',
      link: '/catigotchi',
    },
    {
      title: 'My Cats',
      link: '/my-cats',
    },
    {
      title: 'Sponsor',
      link: '/sponsor',
    },
    {
      title: 'Upload',
      link: '/upload-video',
    },
    {
      title: 'Account',
      link: '/account',
    },
  ]);

  const [secondListOfButtons] = useState([
    {
      title: 'Back',
      link: '/home',
    },
  ]);

  const navigateTo = (path: string) => {
    history.push(path);
  };

  return (
    <IonPage>
      <main className='relative grid w-full h-full bg-white'>
        <div className='grid grid-rows-rev w-full h-full py-20'>
          {/* Buttons section */}
          <section className='grid h-full w-full'>
            <div className='grid w-[65%] mx-auto h-full mt-24'>
              <div className='grid grid-rows-4 gap-2 h-fit items-center'>
                {firstListOfButtons.map((button, index) => (
                  <div key={index}>
                    <button
                      className='px-2 py-2 rounded-lg w-full h-[48px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
                      onClick={() => navigateTo(button.link)}
                    >
                      {button.title}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Back button */}
          <section className='relative grid h-full w-full pb-20'>
            <div className='grid w-[65%] mx-auto h-full items-center'>
              <section className='grid gap-2 w-full h-fit'>
                {secondListOfButtons.map((button, index) => (
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
          </section>
        </div>

        {/* Background images top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  */}
        {/* Top */}
        <div className='absolute top-0 left-0'>
          <img
            src={YellowCat1}
            alt='Blue cat one'
            className='z-10 w-20 h-auto'
          />
        </div>

        <div className='absolute top-0 right-0'>
          <img
            src={BlueCat2}
            alt='White cat one'
            className='z-10 w-20 h-auto'
          />
        </div>

        <div className='absolute top-1/2 left-0 transform -translate-y-1/2 mb-2'>
          <img src={BlueCat1} alt='Blue cat one' className='z-10 w-20 h-auto' />
        </div>

        <div className='absolute top-1/2 right-0 transform -translate-y-1/2 pb-2'>
          <img
            src={WhiteCat2}
            alt='White cat two'
            className='z-10 w-20 h-auto'
          />
        </div>

        {/* Left */}
        <div className='absolute bottom-0 left-0'>
          <img
            src={WhiteCat1}
            alt='White cat one'
            className='z-10 w-20 h-auto'
          />
        </div>

        {/* Right */}
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
      </main>
    </IonPage>
  );
};

export default MenuPage;
