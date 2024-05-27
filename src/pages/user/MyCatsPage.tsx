import React, { useState } from 'react';
import {
  IonPage,
} from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
// Data
import { UserCats } from '../../utils/temp/TempData';
// Images
import BlueCat1 from '../../assets/images/background/small_cat_blue_1.png';

const MyCatsPage: React.FC = () => {
  const history = useHistory();
  const [userCats, setUserCats] = useState(UserCats);

  const handleAddEditCat = (cat: { name: string, age: number, image: string }) => {
    history.push({
      pathname: '/add-edit-cat',
      state: { cat }
    });
  };

  const totalBoxes = 16;
  const catsToShow = [...userCats];

  // Fill the array to ensure there are 16 items
  while (catsToShow.length < totalBoxes) {
    catsToShow.push({ name: '', age: 0, image: '' });
  }

  return (
    <IonPage>
      <div className='grid grid-rows-reg w-full h-full bg-white py-4'>
        <header className='grid grid-cols-rev py-4 px-4 border-solid border-b-2 border-gray-600'>
          <div className='w-full'>
            <h1 className='text-2xl font-semibold'>My Cats</h1>
          </div>
          <div>
            <img src={BlueCat1} alt="Blue cat" className='w-12 h-auto' />
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
                    <img src={cat.image} alt={cat.name} className='w-full h-full aspect-square' />
                  ) : (
                    <div>{index + 1}</div>
                  )}
                </article>
              );
            })}
          </div>
        </main>
      </div>
    </IonPage>
  );
};

export default MyCatsPage;
