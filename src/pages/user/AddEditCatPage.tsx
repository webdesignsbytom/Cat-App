import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IonPage } from '@ionic/react';
// Images
import WhiteCat1 from '../../assets/images/background/small_cat_white_1.png';

const AddEditCatPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{
    cat: { name: string; age: number; image: string };
  }>();
  const cat = location.state?.cat || { name: '', age: 0, image: '' };

  const [catName, setCatName] = useState(cat.name || '');
  const [catAge, setCatAge] = useState(cat.age ? cat.age.toString() : '');
  const [catBreed, setCatBreed] = useState('');
  const [catImage, setCatImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    cat.image || null
  );
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCatImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCat = async () => {
    if (catImage) {
      const formData = new FormData();
      formData.append('catName', catName);
      formData.append('catAge', catAge);
      formData.append('catBreed', catBreed);
      formData.append('catImage', catImage);

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
      console.log({ catName, catAge, catBreed });
      history.push('/my-cats');
    }
  };

  return (
    <IonPage>
      <div className='grid grid-rows-reg h-full w-full bg-white'>
      <header className='grid grid-cols-rev py-4 px-4 border-solid border-b-2 border-gray-600'>
          <div className='w-full'>
            <h1 className='text-2xl font-semibold'>My Cats</h1>
          </div>
          <div>
            <img src={WhiteCat1} alt="White cat" className='w-12 h-auto' />
          </div>
        </header>

        <main className='grid py-4'>
          <div>
            <label>Cat Name</label>
            <input
              type='text'
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
            />
          </div>
          <div>
            <label>Cat Age</label>
            <input
              type='number'
              value={catAge}
              onChange={(e) => setCatAge(e.target.value)}
            />
          </div>
          <div>
            <label>Cat Breed</label>
            <input
              type='text'
              value={catBreed}
              onChange={(e) => setCatBreed(e.target.value)}
            />
          </div>
          <div>
            <label>Cat Image</label>
            <input type='file' accept='image/*' onChange={handleImageUpload} />
          </div>
        </main>
      </div>
    </IonPage>
  );
};

export default AddEditCatPage;
