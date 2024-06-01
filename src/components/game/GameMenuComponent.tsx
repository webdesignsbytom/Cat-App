import { IonPage } from '@ionic/react';
import React, { useState } from 'react';
// Interface
import { GameMenuComponentProps, Item } from './CatInterface';

const GameMenuComponent: React.FC<GameMenuComponentProps> = ({
  menuTitle,
  bank,
  items,
  onClose,
  onBuyItem,
}) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    onBuyItem(item);
  };

  return (
    <IonPage>
      <section className='grid absolute w-full h-full overflow-hidden'>
        <div className='grid grid-rows-a1a px-2 py-2 overflow-hidden mx-auto my-auto w-[90%] h-[90%] bg-blue-100 border-2 border-black border-solid rounded-lg'>
          <header className='grid grid-cols-2 h-full justify-between px-2'>
            <div className='grid justify-start w-full'>
              <h3 className='text-xl font-semibold text-main-colour'>
                {menuTitle}
              </h3>
            </div>
            <div className='grid w-full justify-end'>
              <h4 className='text-xl font-semibold text-main-colour'>Bank: {bank}</h4>
            </div>
          </header>

          <section className='grid h-full w-full overflow-hidden py-4'>
            <div className='grid grid-cols-3 gap-x-2 gap-y-2 overflow-y-auto overflow-hidden'>
              {/* Owned items */}
              {items.map((item, index) => (
                <article
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className={`grid bg-slate-50 shadow-lg border-2 border-black border-solid rounded-lg p-2 active:scale-95 active:brightness-110 no__highlights`}
                >
                  <div className='grid grid-rows-2 gap-2 w-full h-full'>
                    <div className='grid w-full h-full justify-center items-center'>
                      <span
                        className={`text-5xl ${
                          selectedItem === item ? 'enlarged-image' : ''
                        }`}
                      >
                        {item.imageUrl}
                      </span>
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

          <section className='grid items-end overflow-hidden'>
            <button
              onClick={onClose}
              className='bg-main-colour text-white text-xl font-semibold p-2 h-fit w-full rounded-lg shadow-xl active:scale-95 active:bg-main-colour-alt'
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
