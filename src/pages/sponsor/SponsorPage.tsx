import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonText,
} from '@ionic/react';

const SponsorPage: React.FC = () => {

  const visitSponsor = () => {
    window.open('https://www.sponsor-website.com', '_blank');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sponsor</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonText>
          <h2>Our Sponsor</h2>
          <p>
            We are proudly sponsored by <strong>Sponsor Name</strong>. 
            They have been a great supporter of our project and we appreciate their contributions.
          </p>
          <p>
            Sponsor Name is a leading company in the industry, offering top-notch services and products.
            To learn more about them and what they offer, click the visit button below.
          </p>
        </IonText>
        <IonButton expand="block" onClick={visitSponsor}>
          Visit Sponsor
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SponsorPage;
