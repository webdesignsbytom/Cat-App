import React from 'react';
import { CatMood } from '../game/CatInterface';
import { IonPage } from '@ionic/react';

interface DevButtonsMenuProps {
  menuTitle: string;
  onClose: () => void;
  onChangeMood: (mood: CatMood) => void;
}

const DevButtonsMenuComponent: React.FC<DevButtonsMenuProps> = ({
  menuTitle,
  onClose,
  onChangeMood,
}) => {
  const moods = Object.values(CatMood);

  return (
    <IonPage>
      <section className='grid absolute w-full h-full overflow-hidden'>
        <div className='grid grid-rows-a1a px-2 py-2 overflow-hidden mx-auto my-auto w-[90%] h-[90%] bg-white border-2 border-black border-solid rounded-lg'>
          <header className='grid h-full'>
            <div className='text-center'>
              <h3 className='text-xl font-semibold text-main-colour'>
                {menuTitle}
              </h3>
            </div>
          </header>

          <section className='grid w-full h-full'>
            <div className='grid grid-rows-reg h-full w-full overflow-hidden'>
              <div>
                <h3>Change Cat Mood</h3>
              </div>
              <div className='grid grid-cols-2 gap-2 h-fit w-full overflow-y-auto px-2 py-2 '>
                {moods.map((mood) => (
                  <button
                    key={mood}
                    onClick={() => onChangeMood(mood)}
                    className='px-2 py-2 rounded-lg w-full h-[52px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl active:outline-[6px] active:outline active:outline-main-colour'
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>
          </section>

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

export default DevButtonsMenuComponent;
