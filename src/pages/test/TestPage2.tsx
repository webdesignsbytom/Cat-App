import React from 'react';
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

const TestPage2: React.FC = () => {
  const history = useHistory();

  const navigateTo = (path: string) => {
    history.push(path);
  };

  return (
    <IonPage>
        <main className='grid grid-rows-2 w-full h-full bg-yellow-200'>
          {/* Logo section */}
          <section className='grid justify-center items-center bg-red-600'>
            <img src={CatAppLogo} alt='Cat App logo' className='w-full h-full' />
          </section>

          <section className='grid h-full w-full bg-pink-400'>
            <div className='grid w-2/3 mx-auto bg-green-300 items-center'>
              <section className='grid grid-rows-3 gap-2 w-full h-fit bg-blue-300'>
                <div>
                  <button
                    className='px-2 py-2 rounded-xl w-full bg-orange-400 text-white text-xl active:scale-95 active:bg-orange-500'
                    onClick={() => navigateTo('/cotd')}
                  >
                    COTD
                  </button>
                </div>
                <div>
                  <button
                    className='px-2 py-2 rounded-xl w-full bg-orange-400 text-white text-xl active:scale-95 active:bg-orange-500'
                    onClick={() => navigateTo('/endless-cats')}
                  >
                    Endless Cats
                  </button>
                </div>
                <div>
                  <button
                    className='px-2 py-2 rounded-xl w-full bg-orange-400 text-white text-xl active:scale-95 active:bg-orange-500'
                    onClick={() => navigateTo('/therapy-mode')}
                  >
                    Therapy Mode
                  </button>
                </div>
              </section>
            </div>
          </section>
        </main>
    </IonPage>
  );
};

export default TestPage2;
