import React, { useState } from 'react';
import { IonPage, IonToast } from '@ionic/react';
import { useHistory } from 'react-router';
// Api
import client from '../../api/client';

const UploadCatVideoPage: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const history = useHistory();

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

    client
      .postVideo('/videos/upload-video', formData, false)
      .then((res) => {
        console.log('res', res.data);
        console.log('res', res.data.message);
        setMessage('Video upload successful.');
        setShowToast(true);
      })

      .catch((err) => {
        console.error('Error uploading file:', err);
        setMessage('Error uploading video.');
        setShowToast(true);
      });

    setShowToast(true);
  };
  const navigateTo = (path: string) => {
    history.push(path);
  };

  return (
    <IonPage>
      <div className='grid h-full w-full bg-white overflow-hidden'>
        <div className='grid grid-rows-reg h-full w-full overflow-hidden'>
          {/* Header */}
          <header className='grid grid-cols-rev py-4 px-4 border-solid border-b-2 border-gray-600'>
            <div className='grid items-center w-full'>
              <h1 className='text-2xl font-semibold'>Upload Cat Videos</h1>
              <h2>
                Your chance to win{' '}
                <span className='font-medium'>'Cat of the Day'</span>
              </h2>
            </div>
          </header>

          <main className='grid overflow-hidden h-full w-full'>
            <div className='grid overflow-hidden items-center h-full w-full p-4'>
              <section className='grid grid-rows-reg h-fit gap-8 w-fit mx-auto items-center'>
                <div className='grid justify-center'>
                  <input
                    type='file'
                    accept='video/*'
                    onChange={handleFileChange}
                    className='text-2xl '
                  />
                </div>
                <div>
                  <button
                    className='px-2 py-2 rounded-lg w-full h-[48px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
                    onClick={handleUpload}
                    disabled={!videoFile}
                  >
                    Upload Video
                  </button>
                </div>
                <section className='mt-10'>
                  <div>
                    <button
                      className='px-2 py-2 rounded-lg w-full h-[48px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
                      onClick={() => navigateTo('/menu')}
                    >
                      Back
                    </button>
                  </div>
                </section>
              </section>
            </div>
          </main>
        </div>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={message}
          duration={2000}
        />
      </div>
    </IonPage>
  );
};

export default UploadCatVideoPage;
