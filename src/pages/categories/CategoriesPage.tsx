import React, { useRef, useEffect, useState } from 'react';
import { IonPage } from '@ionic/react';

const CategoriesPage: React.FC = () => {
  const [categoriesArray, setCategoriesArray] = useState([
    { name: 'black', hex: '#000000' },
    { name: 'red', hex: '#FF0000' },
    { name: 'green', hex: '#008000' },
    { name: 'yellow', hex: '#FFFF00' },
    { name: 'pink', hex: '#FFC0CB' },
    { name: 'orange', hex: '#FFA500' },
    { name: 'blue', hex: '#0000FF' },
  ]);

  return (
    <IonPage>
      <div className='grid grid-rows-reg h-full w-full'>
        <header className='grid grid-cols-rev items-center py-2 px-2 border-solid border-b-2 border-gray-600'>
          <div>Select by category</div>
        </header>

        <main className='grid '>
          <div className='grid grid-cols-3 gap-2 pr-2 '>
            {categoriesArray.map((cat, index) => {
              return (
                <div
                  key={index}
                  className='bg-main-colour text-white p-2 h-fit w-full rounded-lg shadow-md active:scale-95 active:bg-main-colour-alt'

                >
                  <button>{cat.name}</button>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </IonPage>
  );
};

export default CategoriesPage;
