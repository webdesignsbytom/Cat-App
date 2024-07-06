import React, { useState } from 'react';
import { IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
// Interfaces
import { NewUser } from '../utils/User/UserInterfaces';
import { useUser } from '../context/UserContext';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<NewUser>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    country: '',
    agreedToTerms: false,
    agreedToPrivacy: false,
  });
  const [showLoading, setShowLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const history = useHistory();

  const { register } = useUser();
  console.log('agreedToTerms', formData.agreedToTerms);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      setToastMessage('Passwords do not match');
      setShowToast(true);
      return;
    }

    if (!formData.agreedToTerms || !formData.agreedToPrivacy) {
      setToastMessage('You must accept the terms and privacy policy');
      setShowToast(true);
      return;
    }

    setShowLoading(true);

    try {
      await register(formData);

      setToastMessage('Registration successful');
      setShowToast(true);
      history.push('/login');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setToastMessage(error.message);
      } else {
        setToastMessage('An unknown error occurred');
      }
      setShowToast(true);
    } finally {
      setShowLoading(false);
    }
  };

  const inputFields = [
    { id: 'email', type: 'email', label: 'Email' },
    { id: 'firstName', type: 'text', label: 'First Name' },
    { id: 'lastName', type: 'text', label: 'Last Name' },
    { id: 'password', type: 'password', label: 'Password' },
    { id: 'confirmPassword', type: 'password', label: 'Confirm Password' },
    { id: 'country', type: 'text', label: 'Country' },
  ];

  const navigateTo = (path: string) => {
    history.push(path);
  };

  return (
    <IonPage>
      <div className='grid grid-rows-reg h-full w-full bg-white overflow-hidden'>
        <header className='grid grid-cols-rev py-4 px-4 border-solid border-b-2 border-gray-600'>
          <div className='grid items-center w-full'>
            <h1 className='text-2xl font-semibold'>Register</h1>
          </div>
        </header>

        <main className='grid h-full w-full overflow-hidden'>
          <div className='grid h-full w-full overflow-hidden p-4'>
            <section className='grid gap-1 w-[65%] mx-auto'>
              {inputFields.map(({ id, type, label }) => (
                <div
                  key={id}
                  className='grid grid-rows-reg gap-1 text-center items-center'
                >
                  <label htmlFor={id}>{label}</label>
                  <div className='grid justify-center'>
                    <input
                      type={type}
                      id={id}
                      value={(formData as any)[id]} // Type assertion to access formData properties dynamically
                      className='outline outline-1 outline-gray-600 shadow-md rounded-lg px-1 py-1 h-fit w-full max-w-[350px]'
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              ))}
              <div className='grid justify-center mt-2'>
                <div className='grid grid-rows-reg gap-2 items-center'>
                  <label>
                    <input
                      type='checkbox'
                      id='agreedToTerms'
                      checked={formData.agreedToTerms}
                      onChange={handleInputChange}
                    />{' '}
                    Accept Terms
                  </label>
                </div>
                <div className='grid grid-rows-reg gap-2 items-center'>
                  <label>
                    <input
                      type='checkbox'
                      id='agreedToPrivacy'
                      checked={formData.agreedToPrivacy}
                      onChange={handleInputChange}
                    />{' '}
                    Accept Privacy Policy
                  </label>
                </div>
              </div>
              <div className='mt-2'>
                <button
                  className='px-2 py-2 rounded-lg w-full h-[48px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
                  onClick={handleRegister}
                >
                  Register
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

        {showLoading && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white p-4 rounded shadow'>Please wait...</div>
          </div>
        )}
        {showToast && (
          <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-2 rounded'>
            {toastMessage}
          </div>
        )}
      </div>
    </IonPage>
  );
};

export default RegisterPage;
