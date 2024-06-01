import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonToast } from '@ionic/react';

const UploadCatVideoPage: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleUpload = async () => {
    if (!videoFile) {
      setMessage('Please select a video file first.');
      setShowToast(true);
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const response = await fetch('YOUR_SERVER_UPLOAD_URL', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Video uploaded successfully!');
      } else {
        setMessage('Failed to upload video.');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      setMessage('An error occurred while uploading the video.');
    }

    setShowToast(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Upload Cat Video</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <IonButton expand="full" onClick={handleUpload} disabled={!videoFile}>
          Upload Video
        </IonButton>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={message}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default UploadCatVideoPage;
