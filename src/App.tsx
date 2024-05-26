import { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Pages */
import HomePage from './pages/home/HomePage';
import CotdPage from './pages/cotd/CotdPage';
import EndlessCatsPage from './pages/endless/EndlessCatsPage';
import TherapyModePage from './pages/therapy/TherapyModePage';
import PrivacyPolicyPage from './pages/legal/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/legal/TermsAndConditionsPage';
import AiCatsPage from './pages/ai_cats/AiCatsPage';
import DrawingPage from './pages/drawing/DrawingPage';
import LoginPage from './user/LoginPage';
import RegisterPage from './user/RegisterPage';

/* Icons */
import { ellipse, square, triangle } from 'ionicons/icons';

/* Analytics */
import { trackPage } from './analytics/analytics';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './styles/reset.css';
import './styles/tailwind.css';

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    trackPage(location.pathname);
  }, [location]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path='/home'>
            <HomePage />
          </Route>
          <Route exact path='/cotd'>
            <CotdPage />
          </Route>
          <Route exact path='/endless-cats'>
            <EndlessCatsPage />
          </Route>
          <Route exact path='/therapy-mode'>
            <TherapyModePage />
          </Route>
          <Route exact path='/privacy-policy'>
            <PrivacyPolicyPage />
          </Route>
          <Route exact path='/terms-and-conditions'>
            <TermsAndConditionsPage />
          </Route>
          <Route exact path='/ai-cats'>
            <AiCatsPage />
          </Route>
          <Route exact path='/drawing'>
            <DrawingPage />
          </Route>
          <Route exact path='/login'>
            <LoginPage />
          </Route>
          <Route exact path='/register'>
            <RegisterPage />
          </Route>
          <Route exact path='/'>
            <Redirect to='/home' />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot='bottom'>
          <IonTabButton tab='home' href='/home'>
            <IonIcon aria-hidden='true' icon={triangle} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab='cotd' href='/cotd'>
            <IonIcon aria-hidden='true' icon={ellipse} />
            <IonLabel>Cat of the Day</IonLabel>
          </IonTabButton>
          <IonTabButton tab='test' href='/test'>
            <IonIcon aria-hidden='true' icon={square} />
            <IonLabel>Test</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
