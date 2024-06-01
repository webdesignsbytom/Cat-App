import React, { useState } from 'react';
import { IonPage } from '@ionic/react';
import { useHistory } from 'react-router';
// Interface
import { SponsorshipData, sponsorData } from '../../utils/app/SponsorData';

const SponsorPage: React.FC = () => {
  const [sponsorInfo, setSponsorInfo] = useState<SponsorshipData>(sponsorData);
  const history = useHistory();

  const visitSponsor = () => {
    window.open('https://www.sponsor-website.com', '_blank');
  };
  const navigateHome = () => {
    history.push('/home'); // Navigate to the home page
  };

  return (
    <IonPage>
      <div
        className='grid h-full w-full overflow-hidden'
        style={{ backgroundColor: sponsorInfo?.backgroundColor }}
      >
        <div className='grid grid-rows-reg h-full w-full overflow-hidden'>
          <header className='grid grid-rows-reg h-fit w-full pt-4'>
            <div className='text-center w-full py-2 px-6'>
              <h1 className='text-3xl font-semibold text-main-colour '>
                {sponsorInfo?.name}
              </h1>
            </div>
            <div className='grid justify-center items-center mt-4'>
              <img
                src={sponsorInfo?.image}
                alt={sponsorInfo?.title}
                className='w-20 h-20 object-contain'
              />
            </div>
          </header>

          <main className='grid h-full w-full overflow-hidden'>
            <div className='grid grid-rows-rev w-[65%] mx-auto h-full overflow-hidden py-4'>
              <section className='grid grid-rows-2 gap-4 h-fit'>
                <div className='grid gap-2'>
                  <p>
                    We are proudly sponsored by{' '}
                    <strong>{sponsorInfo?.name}</strong>. They have been a great
                    supporter of our project and we appreciate their
                    contributions.
                  </p>
                  <p>
                    <strong>{sponsorInfo?.name}</strong> is a leading company in
                    the industry, offering top-notch services and products. To
                    learn more about them and what they offer, click the visit
                    button below.
                  </p>
                </div>
                <div className='grid w-full h-fit pt-6'>
                  <button
                    className='px-2 py-2 rounded-lg w-full h-[52px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl active:outline-[6px] active:outline active:outline-main-colour'
                    onClick={() => visitSponsor()}
                  >
                    Visit Sponsor
                  </button>
                </div>
              </section>

              <section className='grid'>
                <div>
                  <button
                    className='px-2 py-2 rounded-lg w-full h-[52px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl active:outline-[6px] active:outline active:outline-main-colour'
                    onClick={() => navigateHome()}
                  >
                    Back
                  </button>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </IonPage>
  );
};

export default SponsorPage;
