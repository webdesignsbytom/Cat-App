// src/components/game/GameMenuComponent.tsx
import { IonCard, IonPage } from '@ionic/react';
import React from 'react';
import { Item } from './CatInterface';

interface GameMenuComponentProps {
  menuTitle: string;
  items: {
    id: number;
    name: string;
    title: string;
    imageUrl: string;
    price: number;
    effect: number;
    quantity: number;
    xp: number;
  }[];
  onClose: () => void;
  onBuyItem: (item: Item) => void;
}

const GameMenuComponent: React.FC<GameMenuComponentProps> = ({
  menuTitle,
  items,
  onClose,
  onBuyItem,
}) => {
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

          <section className='grid h-full w-full overflow-hidden py-4'>
            <div className='grid grid-cols-3 gap-x-2 gap-y-2 overflow-y-auto '>
              {items.map((item, index) => (
                <article
                  key={index}
                  onClick={() => onBuyItem(item)}
                  className='grid shadow-lg border-2 border-black border-solid rounded-lg p-2 active:scale-95 active:brightness-110 no__highlights'
                >
                  <div className='grid grid-rows-2 gap-2 w-full h-full'>
                    <div className='grid w-full h-full justify-center items-center'>
                      <span className='text-5xl'>{item.imageUrl}</span>
                    </div>
                    <div className='grid grid-rows-2 gap-2 py-1 w-full h-full text-center leading-5'>
                      <div className='grid bg-main-colour rounded-lg items-center p-1'>
                        {item.title}
                      </div>
                      <div className='grid bg-main-colour-alt rounded-lg items-center p-1'>
                        £{item.price}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
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

export default GameMenuComponent;
