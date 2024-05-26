// src/pages/Home.tsx
import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';

/* Icons */
import { ellipse, square, triangle } from 'ionicons/icons';

// Logo
import CatAppLogo from '../../assets/images/logos/CAT APP-01.svg';

const HomePage: React.FC = () => {
  return (
    <IonPage>
       <main className='grid grid-rows-2 w-full h-full bg-yellow-200'>
        {/* Logo section */}
        <section className='grid justify-center items-center bg-red-600'>
          <img
            src={CatAppLogo}
            alt='Cat App logo'
            className='w-full h-full'
          />
        </section>

        <section className='grid h-full w-full bg-pink-400'>
          <div className='grid w-[90%] mx-auto bg-green-300'>
            <section className='grid grid-rows-3 gap-2 w-full h-fit bg-blue-300'>
              <div>
                <button className='px-2 py-2 rounded-xl w-full bg-orange-400 text-white text-xl active:scale-95 active:bg-orange-500'>COTD</button>
              </div>
              <div>
                <button className='px-2 py-2 rounded-xl w-full bg-orange-400 text-white text-xl active:scale-95 active:bg-orange-500'>Endless Cats</button>
              </div>
              <div>
                <button className='px-2 py-2 rounded-xl w-full bg-orange-400 text-white text-xl active:scale-95 active:bg-orange-500'>Therapy Mode</button>
              </div>
            </section>
          </div>
        </section>
      </main>

      <IonTabBar slot='bottom'>
          <IonTabButton tab='home' href='/home'>
            <IonIcon aria-hidden='true' icon={triangle} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab='cotd' href='/cotd'>
            <IonIcon aria-hidden='true' icon={ellipse} />
            <IonLabel>Cat of the Day</IonLabel>
          </IonTabButton>
          <IonTabButton tab='test' href='/test'>
            <IonIcon aria-hidden='true' icon={square} />
            <IonLabel>Test</IonLabel>
          </IonTabButton>
          <IonTabButton tab='test2' href='/test2'>
            <IonIcon aria-hidden='true' icon={ellipse} />
            <IonLabel>Test 2</IonLabel>
          </IonTabButton>
        </IonTabBar>
    </IonPage>
  );
};

export default HomePage;
