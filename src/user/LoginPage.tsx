import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonLoading,
  IonToast,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
// Context
import { useUser } from '../context/UserContext';
// Logo
import CatAppLogo from '../assets/images/logos/cat_app_logo_of_cat.svg';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showLoading, setShowLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  // User
  const { login } = useUser();

  const history = useHistory();

  const handleLogin = async () => {
    setShowLoading(true);

    try {
      console.log('email', email);
      console.log('password', password);

      await login(email, password);

      setToastMessage('Login successful');
      setShowToast(true);

      history.push('/home');
    } catch (error: unknown) {
      //
      if (error instanceof Error) {
        setToastMessage(error.message);
      } else {
        setToastMessage('An unknown error occurred');
      }

      setShowToast(true);
    } finally {
      setShowLoading(false);
    }
  };

  const navigateTo = (path: string) => {
    history.push(path);
  };

  return (
    <IonPage>
      <div className='grid w-full h-full overflow-hidden'>
        <div className='grid grid-rows-reg h-full w-full bg-white overflow-hidden'>
          <header className='grid grid-cols-rev py-4 px-4 border-solid border-b-2 border-gray-600'>
            <div className='grid items-center w-full'>
              <h1 className='text-2xl font-semibold'>Login</h1>
            </div>
          </header>

          <main className='grid w-full h-full overflow-hidden'>
            <div className='grid w-full h-full overflow-hidden'>
              {/* Logo section */}
              <section className='grid justify-center items-center p-2'>
                <img
                  src={CatAppLogo}
                  alt='Cat App logo'
                  className='w-full h-full'
                />
              </section>

              {/* Main content */}
              <section className='grid grid-rows-rev w-[75%] mx-auto h-full'>
                <section className='grid h-fit'>
                  <section className='grid gap-4 w-full'>
                    <div className='grid grid-rows-reg gap-1 text-center items-center h-fit w-full'>
                      <label htmlFor='email'>Email</label>
                      <div className='grid'>
                        <input
                          type='text'
                          id='email'
                          value={email}
                          className='outline outline-1 outline-gray-600 shadow-md rounded-lg px-1 py-1 h-fit w-full'
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className='grid grid-rows-reg gap-1 text-center items-center h-fit w-full'>
                      <label htmlFor='password'>Password</label>
                      <div className='grid'>
                        <input
                          type='text'
                          id='password'
                          value={password}
                          className='outline outline-1 outline-gray-600 shadow-md rounded-lg px-1 py-1 h-fit w-full'
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </section>

                  <div className='mt-10'>
                    <button
                      className='px-2 py-2 rounded-lg w-full h-[52px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl active:outline-[6px] active:outline active:outline-main-colour'
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </div>
                </section>

                <section className='grid h-full items-end'>
                  <div className='mb-10'>
                    <button
                      className='px-2 py-2 rounded-lg w-full h-[48px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
                      onClick={() => navigateTo('/account')}
                    >
                      Back
                    </button>
                  </div>
                </section>
              </section>
            </div>
          </main>
        </div>

        <IonLoading isOpen={showLoading} message={'Please wait...'} />
        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />
      </div>
    </IonPage>
  );
};

export default LoginPage;
