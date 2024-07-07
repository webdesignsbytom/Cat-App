import React, { useState } from 'react';
import { IonPage } from '@ionic/react';
// Logo
import CatAppLogo from '../../assets/images/logos/cat_app_logo_of_cat.svg';
// Images
import BlueCat1 from '../../assets/images/background/small_cat_blue_1.png';
import BlueCat3 from '../../assets/images/background/small_cat_blue_3.png';
import WhiteCat1 from '../../assets/images/background/small_cat_white_1.png';
import WhiteCat2 from '../../assets/images/background/small_cat_white_2.png';
import RedCat1 from '../../assets/images/background/small_cat_red_1.png';
import ReviewVideoComponent from '../../components/admin/ReviewVideoComponent';
import UserDataComponent from '../../components/admin/UserDataComponent';
import EventsComponent from '../../components/admin/EventsComponent';

const AdminPage: React.FC = () => {
  const [currentView, setCurrentView] = useState('main');

  const listOfButtons = [
    {
      title: 'Review Videos',
      view: 'review-videos',
    },
    {
      title: 'Users',
      view: 'users',
    },
    {
      title: 'Events',
      view: 'events',
    },
  ];

  const getTitle = () => {
    switch (currentView) {
      case 'review-videos':
        return 'Review Videos';
      case 'users':
        return 'Users';
      case 'events':
        return 'Events';
      default:
        return 'Admin';
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'review-videos':
        return <ReviewVideoComponent />;
      case 'users':
        return <UserDataComponent />;
      case 'events':
        return <EventsComponent />;
      default:
        return (
          <section className='relative grid h-full w-full pb-16'>
            <div className='grid w-[65%] mx-auto h-full items-center'>
              <section className='grid grid-rows-4 gap-2 w-full h-fit'>
                {listOfButtons.map((button, index) => (
                  <div key={index}>
                    <button
                      className='px-2 py-2 rounded-lg w-full h-[52px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl active:outline-[6px] active:outline-main-colour'
                      onClick={() => setCurrentView(button.view)}
                    >
                      {button.title}
                    </button>
                  </div>
                ))}
              </section>
            </div>

            {/* Background images */}
            <div className='absolute top-0 left-0'>
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
            <div className='absolute top-0 right-0'>
              <img
                src={WhiteCat2}
                alt='White cat two'
                className='z-10 w-20 h-auto pb-6'
              />
            </div>
            <div className='absolute bottom-0 right-0'>
              <img
                src={RedCat1}
                alt='Red cat one'
                className='z-10 w-20 h-auto'
              />
            </div>
            <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2'>
              <img
                src={BlueCat3}
                alt='Blue cat three'
                className='z-10 w-20 h-auto'
              />
            </div>
          </section>
        );
    }
  };

  return (
    <IonPage>
      <div className='grid w-full h-full overflow-hidden'>
        <div className='grid grid-rows-reg h-full w-full bg-white overflow-hidden'>
          <header className='grid grid-cols-rev py-4 px-4 border-solid border-b-2 border-gray-600'>
            <div className='grid items-center w-full'>
              <h1 className='text-2xl font-semibold'>{getTitle()}</h1>
            </div>
            {currentView !== 'main' && (
              <button
                className='px-4 py-1 rounded-lg w-full bg-main-colour text-white font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl active:outline-[6px] active:outline-main-colour'
                onClick={() => setCurrentView('main')}
              >
                Back
              </button>
            )}
          </header>

          <main>{renderContent()}</main>
        </div>
      </div>
    </IonPage>
  );
};

export default AdminPage;
