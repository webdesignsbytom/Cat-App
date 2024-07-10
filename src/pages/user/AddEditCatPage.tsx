import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IonPage, IonToast } from '@ionic/react';
// Images
import WhiteCat1 from '../../assets/images/background/small_cat_white_1.png';
// Icons
import { FaRegImage } from 'react-icons/fa6';
// Interfaces
import { OwnedCat, blankCat } from '../../utils/app/AppInterface';
// Constants
import {
  EDIT_USER_CAT_URL,
  MYCATS_URL,
  NEW_USER_CAT_URL,
  TOAST_TIMER,
} from '../../utils/contstants/Constants';
// Context
import { useUser } from '../../context/UserContext';
// Api
import client from '../../api/client';

const AddEditCatPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ cat: OwnedCat }>();
  const { user } = useUser();

  const [cat, setCat] = useState(location.state?.cat || blankCat);
  const [uploadCatImage, setUploadCatImage] = useState<File | null>(null);
  const [catPicture, setCatPicture] = useState<string | ArrayBuffer | null>(
    cat.image || null
  );

  // Messages
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Update cat state
  const updateCatState = (key: keyof OwnedCat, value: any) => {
    setCat((prevCat) => ({ ...prevCat, [key]: value }));
  };

  // Upload image
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setUploadCatImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCatPicture(reader.result);
        updateCatState('image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCat = (e: any) => {
    e.preventDefault()

    if (cat.id) {
      handleUpdateCat()
    } else {
      saveNewCat()
    }
  }
  // Save cat data
  const saveNewCat = async () => {
    console.log('OOOOOOOOOOOOOOOo');
    if (user)
      client
        .post(`${NEW_USER_CAT_URL}/${user.id}`, cat, true)
        .then((res) => {
          console.log('res.data', res.data);
          setCat(res.data.data.newCat)
          setToastMessage('Cat profile saved successfully');
          setShowToast(true);
        })

        .catch((err) => {
          console.error('Unable to save cat data', err);
          setToastMessage('An error occurred');
          setShowToast(true);
        });
  };

  // Update cat data
  const handleUpdateCat = async () => {
    if (user)
      client
        .patch(`${EDIT_USER_CAT_URL}/${user.id}/${cat.id}`, cat, true)
        .then((res) => {
          console.log('res.data', res.data);
          setCat(res.data.data.cat)
          setToastMessage('Cat profile saved successfully');
          setShowToast(true);
        })

        .catch((err) => {
          console.error('Unable to save cat data', err);
          setToastMessage('An error occurred');
          setShowToast(true);
        });
  };

  const navigateTo = (path: string) => {
    history.push(path);
  };

  return (
    <IonPage>
      <div className='grid grid-rows-reg h-full w-full bg-white overflow-hidden'>
        <header className='grid grid-cols-rev py-4 px-4 border-solid border-b-2 border-gray-600'>
          <div className='grid items-center w-full'>
            <h1 className='text-2xl font-semibold'>My Cats</h1>
          </div>
          <div className='grid items-center'>
            <img src={WhiteCat1} alt='White cat' className='w-12 h-auto' />
          </div>
        </header>

        <main className='grid grid-rows-2 overflow-hidden'>
          <section className='grid h-full w-full overflow-hidden py-4'>
            {catPicture ? (
              <img
                src={catPicture as string}
                alt={cat.name}
                className='w-full h-full object-contain'
              />
            ) : (
              <div className='flex items-center justify-center w-full h-full bg-gray-200'>
                <FaRegImage className='text-gray-500 text-6xl' />
              </div>
            )}
          </section>

          <section className='grid h-full w-full pt-4 pb-6'>
            <form className='grid gap-2 h-full w-full px-4 py-4'>
              <div className='grid grid-cols-reg gap-4 items-center'>
                <label htmlFor='catName'>Cat Name</label>
                <div className='grid justify-end'>
                  <input
                    type='text'
                    id='catName'
                    value={cat.name}
                    className='outline outline-1 outline-gray-600 shadow-md rounded-lg px-1 py-1 h-fit w-full max-w-[200px]'
                    onChange={(e) => updateCatState('name', e.target.value)}
                  />
                </div>
              </div>
              <div className='grid grid-cols-reg gap-4 items-center'>
                <label htmlFor='catDob'>Cat Date of Birth</label>
                <div className='grid justify-end'>
                  <input
                    type='date'
                    id='catDob'
                    value={new Date(cat.dob).toISOString().split('T')[0]}
                    className='outline outline-1 outline-gray-600 shadow-md rounded-lg px-1 py-1 h-fit w-full max-w-[200px]'
                    onChange={(e) => updateCatState('dob', new Date(e.target.value))}
                  />
                </div>
              </div>
              <div className='grid grid-cols-reg gap-4 items-center'>
                <label htmlFor='catBreed'>Cat Breed</label>
                <div className='grid justify-end'>
                  <input
                    type='text'
                    id='catBreed'
                    value={cat.breed}
                    className='outline outline-1 outline-gray-600 shadow-md rounded-lg px-1 py-1 h-fit w-full max-w-[200px]'
                    onChange={(e) => updateCatState('breed', e.target.value)}
                  />
                </div>
              </div>
              <div className='grid grid-cols-reg gap-4 items-center'>
                <label htmlFor='favouriteFood'>Favourite Food</label>
                <div className='grid justify-end'>
                  <input
                    type='text'
                    id='favouriteFood'
                    value={cat.favouriteFood}
                    className='outline outline-1 outline-gray-600 shadow-md rounded-lg px-1 py-1 h-fit w-full max-w-[200px]'
                    onChange={(e) => updateCatState('favouriteFood', e.target.value)}
                  />
                </div>
              </div>
              <div className='grid grid-cols-reg gap-4 items-center'>
                <label htmlFor='uploadCatImage'>Cat Image</label>
                <div className='grid justify-end'>
                  <input
                    type='file'
                    id='uploadCatImage'
                    accept='image/*'
                    className='outline outline-1 outline-gray-600 shadow-md rounded-lg px-1 py-1 h-fit w-full max-w-[200px]'
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              <section className='grid grid-cols-2 gap-2 w-full h-full items-end'>
                <div>
                  <button
                    onClick={() => navigateTo(MYCATS_URL)}
                    className='px-2 py-2 rounded-lg w-full h-[52px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
                  >
                    Back
                  </button>
                </div>
                <div>
                  <button
                    onClick={(e) => handleSaveCat(e)}
                    className='px-2 py-2 rounded-lg w-full h-[52px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
                  >
                    Save
                  </button>
                </div>
              </section>
            </form>
          </section>
        </main>
        {/* Popup messages */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={TOAST_TIMER}
        />
      </div>
    </IonPage>
  );
};

export default AddEditCatPage;
