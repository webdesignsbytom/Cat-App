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

  return (
    <IonPage>
      <div className='grid grid-rows-reg h-full w-full bg-white overflow-hidden'>
        <header className='grid grid-cols-rev py-4 px-4 border-solid border-b-2 border-gray-600'>
          <div className='grid items-center w-full'>
            <h1 className='text-2xl font-semibold'>Login</h1>
          </div>
        </header>

        <main className='grid overflow-hidden'>
          <div className='grid grid-rows-reg gap-4 items-center'>
            <label htmlFor='email'>Email</label>
            <div className='grid justify-end'>
              <input
                type='text'
                id='email'
                value={email}
                className='outline outline-1 outline-gray-600 shadow-md rounded-lg px-1 py-1 h-fit w-full max-w-[200px]'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className='grid grid-rows-reg gap-4 items-center'>
            <label htmlFor='password'>Password</label>
            <div className='grid justify-end'>
              <input
                type='text'
                id='password'
                value={password}
                className='outline outline-1 outline-gray-600 shadow-md rounded-lg px-1 py-1 h-fit w-full max-w-[200px]'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              className='px-2 py-2 rounded-lg w-full h-[52px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl active:outline-[6px] active:outline active:outline-main-colour'
              onClick={handleLogin}
            >
              Login
            </button>
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
    </IonPage>
  );
};

export default LoginPage;
