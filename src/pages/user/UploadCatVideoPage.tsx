import React, { useState } from 'react';
import { IonPage, IonToast } from '@ionic/react';
import { useHistory } from 'react-router';
// Api
import client from '../../api/client';
// Images
import BlueCat1 from '../../assets/images/background/small_cat_blue_1.png';
import WhiteCat1 from '../../assets/images/background/small_cat_white_1.png';
// Components
import LoadingSpinner from '../../components/utils/LoadingSpinner';
import { MENU_URL } from '../../utils/contstants/Constants';

const UploadCatVideoPage: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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

    setIsUploading(true);

    const formData = new FormData();
    formData.append('video', videoFile);
    console.log('formdata', formData);

    client
      .postVideo('/videos/upload-video', formData, false)
      .then((res) => {
        console.log('res', res.data);
        console.log('res', res.data.message);
        setMessage('Video upload successful.');
        setShowToast(true);
        setIsUploading(false);
      })

      .catch((err) => {
        console.error('Error uploading file:', err);
        setMessage('Error uploading video.');
        setShowToast(true);
        setIsUploading(false);
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

          <main className='grid relative overflow-hidden h-full w-full bg-main-colour-alt'>
            <div className='grid overflow-hidden items-center h-full w-full '>
              <section className='grid h-full grid-rows-2 gap-8 w-[75%] mx-auto items-center'>
                <div className='grid h-full w-full items-end'>
                  <div className='grid gap-6'>
                    <div className='grid'>
                      <input
                        type='file'
                        accept='video/*'
                        onChange={handleFileChange}
                        className=''
                      />
                    </div>
                    <div>
                      <button
                        className='px-2 py-2 rounded-lg w-full h-[48px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
                        onClick={handleUpload}
                        disabled={!videoFile}
                      >
                        {isUploading ? (
                          <span>
                            <LoadingSpinner />
                          </span>
                        ) : (
                          <span>Upload Video</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <section className='grid h-full items-end'>
                  <div className='mb-10'>
                    <button
                      className='px-2 py-2 rounded-lg w-full h-[48px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
                      onClick={() => navigateTo(MENU_URL)}
                    >
                      Back
                    </button>
                  </div>
                </section>
              </section>
            </div>

            <div className='absolute top-8 left-0 transform'>
              <img
                src={BlueCat1}
                alt='Blue cat one'
                className='z-10 w-20 h-auto'
              />
            </div>
            <div className='absolute top-2 right-0'>
              <img
                src={WhiteCat1}
                alt='White cat one'
                className='z-10 w-24 h-auto'
              />
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
