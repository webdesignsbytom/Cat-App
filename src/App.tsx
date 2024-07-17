import { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
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
import MenuPage from './pages/menu/MenuPage';
import MyCatsPage from './pages/user/MyCatsPage';
import SponsorPage from './pages/sponsor/SponsorPage';
import AddEditCatPage from './pages/user/AddEditCatPage';
import CatigotchiPage from './pages/catigotchi/CatigotchiPage';
import UploadCatVideoPage from './pages/user/UploadCatVideoPage';
import UserAccountPage from './pages/user/UserAccountPage';

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

/* Dark Mode */
import '@ionic/react/css/palettes/dark.system.css';

/* Style */
import './styles/reset.css';
import './styles/tailwind.css';
import './styles/video_player.css';
import './styles/animations.css';

/* Constants */
import {
  ACCOUNTPAGE_URL,
  COTDPAGE_URL,
  ENDLESSPAGE_URL,
  HOMEPAGE_URL,
  LOGINPAGE_URL,
  SPONSORPAGE_URL,
  THERAPYPAGE_URL,
  PRIVACYPOLICY_URL,
  TERMSANDCONDITIONS_URL,
  AICATS_URL,
  DRAWING_URL,
  CATIGOTCHI_URL,
  MYCATS_URL,
  ADDEDITCAT_URL,
  UPLOADVIDEO_URL,
  MENU_URL,
  REGISTERPAGE_URL,
  ADMINPAGE_URL,
  TESTPAGE_URL,
} from './utils/contstants/Constants';
import AdminPage from './pages/admin/AdminPage';
import TestPage from './pages/test/TestPage';

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    trackPage(location.pathname);
  }, [location]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path={HOMEPAGE_URL}>
            <HomePage />
          </Route>
          <Route exact path={COTDPAGE_URL}>
            <CotdPage />
          </Route>
          <Route exact path={ENDLESSPAGE_URL}>
            <EndlessCatsPage />
          </Route>
          <Route exact path={THERAPYPAGE_URL}>
            <TherapyModePage />
          </Route>
          <Route exact path={PRIVACYPOLICY_URL}>
            <PrivacyPolicyPage />
          </Route>
          <Route exact path={TERMSANDCONDITIONS_URL}>
            <TermsAndConditionsPage />
          </Route>
          <Route exact path={AICATS_URL}>
            <AiCatsPage />
          </Route>
          <Route exact path={DRAWING_URL}>
            <DrawingPage />
          </Route>
          <Route exact path={CATIGOTCHI_URL}>
            <CatigotchiPage />
          </Route>
          <Route exact path={MYCATS_URL}>
            <MyCatsPage />
          </Route>
          <Route exact path={ADDEDITCAT_URL}>
            <AddEditCatPage />
          </Route>
          <Route exact path={UPLOADVIDEO_URL}>
            <UploadCatVideoPage />
          </Route>
          <Route exact path={MENU_URL}>
            <MenuPage />
          </Route>
          <Route exact path={SPONSORPAGE_URL}>
            <SponsorPage />
          </Route>
          <Route exact path={LOGINPAGE_URL}>
            <LoginPage />
          </Route>
          <Route exact path={REGISTERPAGE_URL}>
            <RegisterPage />
          </Route>
          <Route exact path={ACCOUNTPAGE_URL}>
            <UserAccountPage />
          </Route>
          <Route exact path={ADMINPAGE_URL}>
            <AdminPage />
          </Route>
          <Route exact path={TESTPAGE_URL}>
            <TestPage />
          </Route>
          <Route exact path='/'>
            <Redirect to={HOMEPAGE_URL} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
