// src/components/game/GameMenuComponent.tsx
import { IonPage } from '@ionic/react';
import React from 'react';
// Interface
import { GameModalDisplayProps } from './CatInterface';

const GameModalDisplay: React.FC<GameModalDisplayProps> = ({
  modalTitle,
  modalContent,
  onClose,
}) => {
  return (
    <IonPage>
      <section className='grid absolute w-full h-full overflow-hidden'>
        <div className='grid grid-rows-a1a px-2 py-2 overflow-hidden mx-auto my-auto w-[90%] h-[90%] bg-white border-2 border-black border-solid rounded-lg'>
          <header className='grid h-full'>
            <div className='text-center'>
              <h3 className='text-xl font-semibold text-main-colour'>
                {modalTitle}
              </h3>
            </div>
          </header>

          <article className='grid items-center justify-center'>
            <div>
              <p className='text-3xl text-main-colour font-extrabold'>{modalContent}</p>
            </div>
          </article>

          <section className='grid items-end'>
            <button
              onClick={onClose}
              className='bg-main-colour text-white p-2 h-fit w-full rounded-lg shadow-md active:scale-95 active:bg-main-colour-alt'
            >
              Close
            </button>
          </section>
        </div>
      </section>
    </IonPage>
  );
};

export default GameModalDisplay;
