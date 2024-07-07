import React, { useState } from 'react';
import { IonPage } from '@ionic/react';
// Components
import ReviewVideoComponent from '../../components/admin/ReviewVideoComponent';
import UserDataComponent from '../../components/admin/UserDataComponent';
import EventsComponent from '../../components/admin/EventsComponent';
import DefaultAdminComponent from '../../components/admin/DefaultAdminComponent';


const AdminPage: React.FC = () => {
  const [currentView, setCurrentView] = useState('main');


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
        return <DefaultAdminComponent setCurrentView={setCurrentView} />;
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

          <main className='grid overflow-hidden'>{renderContent()}</main>
        </div>
      </div>
    </IonPage>
  );
};

export default AdminPage;
