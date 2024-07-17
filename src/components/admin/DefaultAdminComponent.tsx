import { useHistory } from 'react-router';
// Images
import BlueCat1 from '../../assets/images/background/small_cat_blue_1.png';
import BlueCat3 from '../../assets/images/background/small_cat_blue_3.png';
import WhiteCat1 from '../../assets/images/background/small_cat_white_1.png';
import WhiteCat2 from '../../assets/images/background/small_cat_white_2.png';
import RedCat1 from '../../assets/images/background/small_cat_red_1.png';
// Interfaces
import { AdminCurrentView } from '../../utils/app/AppInterface';
// Constants
import { HOMEPAGE_URL, TESTPAGE_URL } from '../../utils/contstants/Constants';

const DefaultAdminComponent: React.FC<AdminCurrentView> = ({
  setCurrentView,
}) => {
  const history = useHistory();

  const listOfButtons = [
    {
      title: 'Review Videos',
      view: 'review-videos',
    },
    {
      title: 'Users',
      view: 'users',
    },
    {
      title: 'Events',
      view: 'events',
    },
  ];

  const navigateTo = (path: string) => {
    history.push(path);
  };

  return (
    <section className='relative grid h-full w-full pb-16'>
      <div className='grid w-[65%] grid-rows-rev mx-auto h-full items-center'>
        <section className='grid grid-rows-4 gap-2 w-full h-fit'>
          {listOfButtons.map((button, index) => (
            <div key={index}>
              <button
                className='px-2 py-2 rounded-lg w-full h-[52px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl active:outline-[6px] active:outline-main-colour'
                onClick={() => setCurrentView(button.view)}
              >
                {button.title}
              </button>
            </div>
          ))}
          <button
            className='px-2 py-2 rounded-lg w-full h-[52px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl active:outline-[6px] active:outline-main-colour'
            onClick={() => navigateTo(TESTPAGE_URL)}
          >
            Test Page
          </button>
        </section>

        <section className='mb-10'>
          <div>
            <button
              className='px-2 py-2 rounded-lg w-full h-[48px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
              onClick={() => navigateTo(HOMEPAGE_URL)}
            >
              Back
            </button>
          </div>
        </section>
      </div>

      {/* Background images */}
      <div className='absolute top-0 left-0'>
        <img src={BlueCat1} alt='Blue cat one' className='z-10 w-20 h-auto' />
      </div>
      <div className='absolute bottom-0 left-0'>
        <img src={WhiteCat1} alt='White cat one' className='z-10 w-20 h-auto' />
      </div>
      <div className='absolute top-0 right-0'>
        <img
          src={WhiteCat2}
          alt='White cat two'
          className='z-10 w-20 h-auto pb-6'
        />
      </div>
      <div className='absolute bottom-0 right-0'>
        <img src={RedCat1} alt='Red cat one' className='z-10 w-20 h-auto' />
      </div>
      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2'>
        <img src={BlueCat3} alt='Blue cat three' className='z-10 w-20 h-auto' />
      </div>
    </section>
  );
};

export default DefaultAdminComponent;
