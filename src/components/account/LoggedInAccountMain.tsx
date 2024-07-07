import React, { useState } from 'react';
import { useHistory } from 'react-router';
// Context
import { useUser } from '../../context/UserContext';
import ConfirmationModal from '../modals/ConfirmationModal';

const LoggedInAccountMain: React.FC = () => {
  const { user, logout } = useUser();
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    logout();
    setShowModal(false);
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  const navigateTo = (path: string) => {
    history.push(path);
  };

  return (
    <div className='grid relative h-full w-full overflow-hidden'>
      <div className='grid grid-rows-rev gap-4'>
        <section className='grid grid-rows-rev h-full w-[65%] mx-auto'>
          <section className='pt-10'>
            <article>
              <div>
                <h2 className='text-xl font-semibold'>
                  Welcome, {user?.email}
                </h2>
              </div>
              <div className='mt-4'>
                <p>
                  Name: {user?.profile?.firstName} {user?.profile?.lastName}
                </p>
                <p>Country: {user?.profile?.country}</p>
              </div>
            </article>
          </section>

          <div className='mb-10'>
            <button
              className='px-2 py-2 rounded-lg w-full h-[48px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </section>

        <section className='grid w-[65%] mx-auto mb-10 '>
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

      {showModal && (
        <ConfirmationModal
          message='Are you sure you want to logout?'
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}
    </div>
  );
};

export default LoggedInAccountMain;
