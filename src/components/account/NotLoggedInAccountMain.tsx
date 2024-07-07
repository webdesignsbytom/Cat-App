import React from 'react';
import { useHistory } from 'react-router';
// Context
import { useUser } from '../../context/UserContext';
// Logo
import CatAppLogo from '../../assets/images/logos/cat_app_logo_of_cat.svg';
import { MENU_URL } from '../../utils/contstants/Constants';

const NotLoggedInAccountMain: React.FC = () => {
  const { user } = useUser();
  const history = useHistory();

  const handleLogin = () => {
    history.push('/login'); // Replace with your login page path
  };

  const handleSignUp = () => {
    history.push('/register'); // Replace with your sign-up page path
  };

  const navigateTo = (path: string) => {
    history.push(path);
  };
  
  return (
    <section className='grid gap-4 w-full items-center'>

      {/* Logo section */}
      <section className='grid justify-center items-center p-2'>
        <img src={CatAppLogo} alt='Cat App logo' className='w-full h-full' />
      </section>

      <div className='grid gap-2 w-[65%] mx-auto items-center h-fit'>
        <div className='grid w-full'>
          <button
            className='px-2 py-2 rounded-lg w-full h-[48px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <div>
          <button
            className='px-2 py-2 rounded-lg w-full h-[48px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
        <section className='mt-10'>
          <div>
            <button
              className='px-2 py-2 rounded-lg w-full h-[48px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
              onClick={() => navigateTo(MENU_URL)}
            >
              Back
            </button>
          </div>
        </section>
      </div>
    </section>
  );
};

export default NotLoggedInAccountMain;
