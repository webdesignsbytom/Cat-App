import React from 'react';
import { IonPage } from '@ionic/react';
// Context
import { useUser } from '../../context/UserContext';
// Components
import LoggedInAccountMain from '../../components/account/LoggedInAccountMain';
import NotLoggedInAccountMain from '../../components/account/NotLoggedInAccountMain';

const UserAccountPage: React.FC = () => {
  const { user } = useUser();

  return (
    <IonPage>
      <div className='grid grid-rows-reg h-full w-full bg-white overflow-hidden'>
        <header className='grid grid-cols-rev py-4 px-4 border-solid border-b-2 border-gray-600'>
          <div className='grid items-center w-full'>
            <h1 className='text-2xl font-semibold'>Account</h1>
          </div>
        </header>

        <main className='grid h-full w-full overflow-hidden'>
          {!user ? (
            // No user defined content
            <NotLoggedInAccountMain />
          ) : (
            // Main content
            <LoggedInAccountMain />
          )}
        </main>
      </div>
    </IonPage>
  );
};

export default UserAccountPage;
