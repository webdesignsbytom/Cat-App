import { IonPage } from '@ionic/react';
import React, { useState } from 'react';
// Interface
import { SettingsMenuComponentProps, SettingsOption } from './CatInterface';
// Data
import { gameSettingsOptions } from '../../utils/game/GameSettings';

const SettingsMenuComponent: React.FC<SettingsMenuComponentProps> = ({
  onClose,
  onResetCat,
}) => {
  const [settingsOptionArray, setSettingsOptionArray] = useState<SettingsOption[]>(gameSettingsOptions);
  const [volume, setVolume] = useState<number>(50); // Default volume value

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(event.target.value, 10));
  };

  const handleResetAll = () => {
    setVolume(50); // Reset volume to default
    onResetCat(); // Call the reset cat function
  };

  return (
    <IonPage>
      <section className='grid absolute w-full h-full overflow-hidden'>
        <div className='grid grid-rows-a1a px-2 py-2 overflow-hidden mx-auto my-auto w-[90%] h-[90%] bg-blue-100 border-2 border-black border-solid rounded-lg'>
          <header className='grid grid-cols-2 h-full justify-between px-2'>
            <div className='grid justify-start w-full'>
              <h3 className='text-xl font-semibold text-main-colour'>
                Settings
              </h3>
            </div>
          </header>

          <section className='grid h-full w-full overflow-hidden py-4'>
            <div className='grid grid-cols-3 gap-x-2 gap-y-2 overflow-y-auto overflow-hidden'>
              {settingsOptionArray.map((option, index) => (
                <article
                  key={index}
                  className={`grid bg-slate-50 shadow-lg border-2 border-black border-solid rounded-lg p-2 active:scale-95 active:brightness-110 no__highlights`}
                >
                  <div className='grid grid-rows-2 gap-2 w-full h-full'>
                    <div className='grid w-full h-full justify-center items-center'>
                      <span className='text-xl'>{option.title}</span>
                      {option.name === 'volume' && (
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-full mt-2"
                        />
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className='grid items-end overflow-hidden'>
            <button
              onClick={handleResetAll}
              className='bg-main-colour text-white text-xl font-semibold p-2 h-fit w-full rounded-xl shadow-xl active:scale-95 active:bg-main-colour-alt'
            >
              Reset All
            </button>
            <button
              onClick={onClose}
              className='bg-main-colour text-white text-xl font-semibold p-2 h-fit w-full rounded-xl shadow-xl active:scale-95 active:bg-main-colour-alt mt-2'
            >
              Close
            </button>
          </section>
        </div>
      </section>
    </IonPage>
  );
};

export default SettingsMenuComponent;
