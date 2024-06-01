import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IonPage } from '@ionic/react';
// Images
import WhiteCat1 from '../../assets/images/background/small_cat_white_1.png';
// Icons
import { FaRegImage } from 'react-icons/fa6';
// Interfaces
import { OwnedCat, blankCat } from '../../utils/app/AppInterface';

const AddEditCatPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{
    cat: OwnedCat;
  }>();

  const cat = location.state?.cat || blankCat;

  const [catName, setCatName] = useState(cat.name || '');
  const [catBreed, setCatBreed] = useState(cat.breed || '');
  const [catDob, setCatDob] = useState(cat.dob ? new Date(cat.dob) : new Date());

  const [uploadCatImage, setUploadCatImage] = useState<File | null>(null);
  const [catPicture, setCatPicture] = useState<string | ArrayBuffer | null>(
    cat.image || null
  );

  // Messages
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Upload image
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      setUploadCatImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCatPicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save cat data
  const handleSaveCat = async () => {
    if (uploadCatImage) {
      const formData = new FormData();

      try {
        const response = await fetch('/api/upload-cat', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Cat profile saved:', data);
          setToastMessage('Cat profile saved successfully');
          setShowToast(true);
          history.push('/my-cats');
        } else {
          setToastMessage('Failed to save cat profile');
          setShowToast(true);
        }
      } catch (error) {
        console.error('Error:', error);
        setToastMessage('An error occurred');
        setShowToast(true);
      }
    } else {
      console.log({ catName, catBreed });
      history.push('/my-cats');
    }
  };

  const navigateHome = () => {
    history.push('/my-cats');
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
                    value={catName}
                    className='outline outline-1 outline-gray-600 shadow-md rounded-lg px-1 py-1 h-fit w-full max-w-[200px]'
                    onChange={(e) => setCatName(e.target.value)}
                  />
                </div>
              </div>
              <div className='grid grid-cols-reg gap-4 items-center'>
                <label htmlFor='catDob'>Cat Date of Birth</label>
                <div className='grid justify-end'>
                  <input
                    type='date'
                    id='catDob'
                    value={catDob.toISOString().split('T')[0]}
                    className='outline outline-1 outline-gray-600 shadow-md rounded-lg px-1 py-1 h-fit w-full max-w-[200px]'
                    onChange={(e) => setCatDob(new Date(e.target.value))}
                  />
                </div>
              </div>
              <div className='grid grid-cols-reg gap-4 items-center'>
                <label htmlFor='catBreed'>Cat Breed</label>
                <div className='grid justify-end'>
                  <input
                    type='text'
                    id='catBreed'
                    value={catBreed}
                    className='outline outline-1 outline-gray-600 shadow-md rounded-lg px-1 py-1 h-fit w-full max-w-[200px]'
                    onChange={(e) => setCatBreed(e.target.value)}
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
              <div className='grid grid-cols-reg gap-4'>
                <label>Cotd Wins</label>
                <div className='grid justify-end'>
                  <span className='outline outline-1 outline-gray-600 shadow-md rounded-lg px-1 py-1 h-fit w-full max-w-[200px]'>
                    0
                  </span>
                </div>
              </div>

              <section className='grid grid-cols-2 gap-2 w-full h-full items-end'>
                <div>
                  <button
                    onClick={navigateHome}
                    className='px-2 py-2 rounded-lg w-full h-[52px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
                  >
                    Back
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleSaveCat}
                    className='px-2 py-2 rounded-lg w-full h-[52px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
                  >
                    Save
                  </button>
                </div>
              </section>
            </form>
          </section>
        </main>
      </div>
    </IonPage>
  );
};

export default AddEditCatPage;
