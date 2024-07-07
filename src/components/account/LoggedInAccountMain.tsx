import React from 'react';
import { useHistory } from 'react-router';
// Context
import { useUser } from '../../context/UserContext';

const LoggedInAccountMain: React.FC = () => {
  const { user, logout } = useUser();
  const history = useHistory();

  const handleLogout = () => {
    logout();
  };

  const navigateTo = (path: string) => {
    history.push(path);
  };

  return (
    <div className='grid h-full w-full overflow-hidden'>
      <div className='grid grid-rows-rev gap-4'>
        <section>
          <article>
            <h2 className='text-xl font-semibold'>Welcome, {user?.email}</h2>
            <div>
              <p>
                Name: {user?.profile?.firstName} {user?.profile?.lastName}
              </p>
              <p>Country: {user?.profile?.country}</p>
            </div>
          </article>

          <div>
            <button
              className='px-2 py-2 rounded-lg w-full h-[48px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </section>

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
      </div>
    </div>
  );
};

export default LoggedInAccountMain;
