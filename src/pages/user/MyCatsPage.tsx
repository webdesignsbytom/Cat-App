import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage } from '@ionic/react';
// Data
import { UserCats } from '../../utils/temp/TempData';
import { OwnedCat, blankCat } from '../../utils/app/AppInterface';
// Images
import BlueCat1 from '../../assets/images/background/small_cat_blue_1.png';

const MyCatsPage: React.FC = () => {
  const history = useHistory();
  const [userCats, setUserCats] = useState<OwnedCat[]>(UserCats);

  const handleAddEditCat = (cat: OwnedCat) => {
    history.push({
      pathname: '/add-edit-cat',
      state: { cat },
    });
  };
  const totalBoxes = 8;
  const catsToShow = [...userCats];

  // Fill the array to ensure there are 16 items
  while (catsToShow.length < totalBoxes) {
    catsToShow.push(blankCat);
  }

  const navigateTo = (path: string) => {
    history.push(path);
  };

  return (
    <IonPage>
      <div className='grid grid-rows-reg w-full h-full bg-white'>
        <header className='grid grid-cols-rev py-4 px-4 border-solid border-b-2 border-gray-600'>
          <div className='grid items-center w-full'>
            <h1 className='text-2xl font-semibold'>My Cats</h1>
          </div>
          <div className='grid items-center'>
            <img src={BlueCat1} alt='White cat' className='w-12 h-auto' />
          </div>
        </header>

        <main className='grid px-2 py-2'>
          <div className='grid grid-rows-4 grid-cols-4 gap-x-2 gap-y-4'>
            {catsToShow.map((cat, index) => {
              return (
                <article
                  key={index}
                  onClick={() => handleAddEditCat(cat)}
                  className='border-solid border-2 border-gray-600'
                >
                  {cat.name ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className='w-full h-full aspect-square object-cover'
                    />
                  ) : (
                    <div>{index + 1}</div>
                  )}
                </article>
              );
            })}
          </div>

          <div className='grid items-center h-full w-full px-4'>
            <button
              className='px-2 py-2 rounded-lg w-full h-[52px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
              onClick={() => navigateTo('/menu')}
            >
              Back
            </button>
          </div>
        </main>
      </div>
    </IonPage>
  );
};

export default MyCatsPage;
