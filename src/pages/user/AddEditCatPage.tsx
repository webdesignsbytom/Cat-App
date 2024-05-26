// src/pages/AddEditCatPage.tsx
import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonImg,
  IonToast,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

const AddEditCatPage: React.FC = () => {
  const [catName, setCatName] = useState('');
  const [catAge, setCatAge] = useState('');
  const [catBreed, setCatBreed] = useState('');
  const [catImage, setCatImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const history = useHistory();

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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add/Edit Cat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Cat Name</IonLabel>
          <IonInput value={catName} onIonChange={(e) => setCatName(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Cat Age</IonLabel>
          <IonInput value={catAge} onIonChange={(e) => setCatAge(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Cat Breed</IonLabel>
          <IonInput value={catBreed} onIonChange={(e) => setCatBreed(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel>Cat Image</IonLabel>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </IonItem>
        {previewImage && (
          <IonImg src={previewImage as string} />
        )}
        <IonButton expand="full" className="ion-margin-top" onClick={handleSaveCat}>
          Save
        </IonButton>
        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default AddEditCatPage;
