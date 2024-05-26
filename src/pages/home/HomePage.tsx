// src/pages/Home.tsx
import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/react';
// Logo
import CatAppLogo from '../../assets/images/logos/CAT APP-01.svg';

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <main className='grid bg-yellow-200'>
        <section className='grid bg-green-300'>
          <img
            src={CatAppLogo}
            alt='Cat App logo'
            className='w-[150px] h-[150px]'
          />
        </section>

        <section className='grid bg-pink-400'>
            <section className='bg-blue-500 grid gap-4 px-2'>
              <div>
                <button className='px-2 py-1 rounded-xl w-full bg-orange-400 text-white text-xl'>COTD</button>
              </div>
              <div>
                <button className='px-2 py-1 rounded-xl w-full bg-orange-400 text-white text-xl'>Endless Cats</button>
              </div>
              <div>
                <button className='px-2 py-1 rounded-xl w-full bg-orange-400 text-white text-xl'>Therapy Mode</button>
              </div>
            </section>
        </section>
      </main>
    </IonPage>
  );
};

export default HomePage;
