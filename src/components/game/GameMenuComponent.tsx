// src/components/CookieConsent.tsx
import React, { useState } from 'react';
import { IonModal } from '@ionic/react';

const GameMenuComponent: React.FC = () => {
  const [shop, setShop] = useState({
    name: 'Food Store',
    itemsForSale: ['cheese', 'meat', 'gum'],
  });

  const buyItem = (item: string) => { console.log('BUY'); };
  const closeMenu = () => { console.log('Close'); };

  return (
    <section className='grid absolute w-full h-full overflow-hidden'>
      <div className='grid px-2 py-2 overflow-hidden mx-auto my-auto w-3/4 h-3/4 bg-white border-2 border-black border-solid rounded-lg'>
        <header className='grid'>
          {/* Shop name */}
          <div>
            <h3>{shop.name}</h3>
          </div>
        </header>

        {/* Items for sale */}
        <section className='grid grid-cols-4 gap-x-2 gap-y-4'>
          {shop.itemsForSale?.map((item, index) => {
            return (
              <article
                key={index}
                onClick={() => buyItem(item)}
                className='grid bg-yellow-400 shadow-lg border-2 border-black border-solid'
              >
                <div>{item}</div>
                <div>£10</div>
              </article>
            );
          })}
        </section>

        <section className='grid items-end'>
          <button onClick={() => closeMenu()} className='bg-main-colour text-white p-2 h-fit w-full rounded-lg shadow-md active:scale-95 active:bg-main-colour-alt'>Close</button>
        </section>
      </div>
    </section>
  );
};

export default GameMenuComponent;
