import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
          <h1 className='text-red-500'>Cat APP</h1>
      </IonContent>
    </IonPage>
  );
};

export default Home;
