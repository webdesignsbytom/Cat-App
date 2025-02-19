import React, { useEffect, useState } from 'react';
import { IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
// Context
import { useUser } from '../../context/UserContext';
// Logo
import CatAppLogo from '../../assets/images/logos/cat_app_logo_of_cat.svg';
// Images
import BlueCat1 from '../../assets/images/background/small_cat_blue_1.png';
import BlueCat3 from '../../assets/images/background/small_cat_blue_3.png';
import WhiteCat1 from '../../assets/images/background/small_cat_white_1.png';
import WhiteCat2 from '../../assets/images/background/small_cat_white_2.png';
import RedCat1 from '../../assets/images/background/small_cat_red_1.png';
// Constants
import {
  COTDPAGE_URL,
  ENDLESSPAGE_URL,
  THERAPYPAGE_URL,
  MENU_URL,
  ADMINPAGE_URL,
  DEVELOPER_ROLE,
  ADMIN_ROLE,
  COTD_PLAYLIST_URL,
} from '../../utils/contstants/Constants';
import client from '../../api/client';
import { usePlaylist } from '../../context/PlaylistContext';

const HomePage: React.FC = () => {
  const history = useHistory();

  const { user } = useUser();
  const { setCotdPlaylist } = usePlaylist();

  // useEffect(() => {
  //   client
  //     .get(COTD_PLAYLIST_URL, false)
  //     .then((res) => {
  //       setCotdPlaylist(res.data.playlist);
  //       console.log('res.data.playlist', res.data.playlist);
  //     })
  //     .catch((err) => {
  //       console.error(`Unable to get playlist`, err);
  //     });
  // }, []);

  const [listOfButtons] = useState([
    {
      title: 'Cat of the Day',
      link: COTDPAGE_URL,
    },
    {
      title: 'Endless Cats',
      link: ENDLESSPAGE_URL,
    },
    {
      title: 'Therapy Mode',
      link: THERAPYPAGE_URL,
    },
    {
      title: 'Menu',
      link: MENU_URL,
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
                    className='px-2 py-2 rounded-lg w-full h-[52px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl active:outline-[6px] active:outline-main-colour'
                    onClick={() => navigateTo(button.link)}
                  >
                    {button.title}
                  </button>
                </div>
              ))}
            </section>

            {/* Conditional Admin Button */}
            {user &&
              (user.role === ADMIN_ROLE || user.role === DEVELOPER_ROLE) && (
                <div className='mt-4'>
                  <button
                    className='px-2 py-2 rounded-lg w-full h-[52px] bg-red-600 text-white text-2xl font-semibold active:scale-95 active:bg-red-700 shadow-xl active:outline-[6px] active:outline-red-600'
                    onClick={() => navigateTo(ADMINPAGE_URL)}
                  >
                    Admin
                  </button>
                </div>
              )}
          </div>

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

export default HomePage;
