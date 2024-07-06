import React from 'react';
import { IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
// Context
import { useUser } from '../../context/UserContext';

const UserAccountPage: React.FC = () => {
  const { token, user, logout } = useUser();
  const history = useHistory();

  const handleLogout = () => {
    logout();
  };

  const handleLogin = () => {
    history.push('/login'); // Replace with your login page path
  };

  const handleSignUp = () => {
    history.push('/signup'); // Replace with your sign-up page path
  };

  return (
    <IonPage>
      <div className='grid grid-rows-reg h-full w-full bg-white overflow-hidden'>
        <header className='grid grid-cols-rev py-4 px-4 border-solid border-b-2 border-gray-600'>
          <div className='grid items-center w-full'>
            <h1 className='text-2xl font-semibold'>Account</h1>
          </div>
        </header>

        <main className='grid p-4'>
          {!user ? (
            // No user defined content 
            <div className='grid gap-4'>
              <div>
                <button
                  className='px-2 py-2 rounded-lg w-full h-[48px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
              <div>
                <button
                  className='px-2 py-2 rounded-lg w-full h-[48px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              </div>
            </div>
          ) : (
            // Main content
            <div className='grid gap-4'>
              <article>
                <h2 className='text-xl font-semibold'>Welcome, {user.email}</h2>
                <div>
                  <p>
                    Name: {user.profile?.firstName} {user.profile?.lastName}
                  </p>
                  <p>Country: {user.profile?.country}</p>
                </div>
              </article>

              <div>
                <button
                  className='px-2 py-2 rounded-lg w-full h-[48px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </IonPage>
  );
};

export default UserAccountPage;
