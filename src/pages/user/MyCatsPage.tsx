import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage } from '@ionic/react';
// Data
import { UserCats } from '../../utils/temp/TempData';
import { OwnedCat, blankCat } from '../../utils/app/AppInterface';
// Images
import BlueCat1 from '../../assets/images/background/small_cat_blue_1.png';
// Constants
import { ADDEDITCAT_URL, MENU_URL } from '../../utils/contstants/Constants';
import { useUser } from '../../context/UserContext';

const MyCatsPage: React.FC = () => {
  const history = useHistory();
  const [userCats, setUserCats] = useState<OwnedCat[]>();
  const { user } = useUser();

  console.log('AAAAAAA');

  useEffect(() => {
    console.log('XXXX user', user);
    if (user) {
      setUserCats(user.profile?.cats ?? []);
    }
  }, [user]);

  const handleAddEditCat = (cat: OwnedCat) => {
    history.push({
      pathname: ADDEDITCAT_URL,
      state: { cat },
    });
  };

  const totalBoxes = 8;

  // Fill the array to ensure there are 16 items
  if (userCats) {
    while (userCats.length < totalBoxes) {
      userCats.push(blankCat);
    }
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
            {userCats?.map((cat, index) => {
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
              onClick={() => navigateTo(MENU_URL)}
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
