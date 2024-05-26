// src/pages/PetCatPage.tsx
import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonLabel,
  IonProgressBar,
  IonGrid,
  IonRow,
  IonCol,
  IonToast,
} from '@ionic/react';

const PetCatPage: React.FC = () => {
  const [hunger, setHunger] = useState(100);
  const [happiness, setHappiness] = useState(100);
  const [health, setHealth] = useState(100);
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Update the cat's status based on real-world time
  useEffect(() => {
    const lastCheck = localStorage.getItem('lastCheck');
    const now = new Date().getTime();
    
    if (lastCheck) {
      const elapsedTime = (now - parseInt(lastCheck)) / 1000; // Time in seconds
      const hungerDecrease = Math.floor(elapsedTime / 60); // Decrease hunger by 1 every minute
      const happinessDecrease = Math.floor(elapsedTime / 120); // Decrease happiness by 1 every 2 minutes
      const healthDecrease = Math.floor(elapsedTime / 180); // Decrease health by 1 every 3 minutes

      setHunger(prev => Math.max(prev - hungerDecrease, 0));
      setHappiness(prev => Math.max(prev - happinessDecrease, 0));
      setHealth(prev => Math.max(prev - healthDecrease, 0));
    }

    localStorage.setItem('lastCheck', now.toString());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      localStorage.setItem('lastCheck', now.toString());
    }, 60000); // Update the last check time every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (hunger === 0 || happiness === 0) {
      setHealth(prev => Math.max(prev - 2, 0));
    }
  }, [hunger, happiness]);

  const feedCat = () => {
    setHunger(prev => Math.min(prev + 20, 100));
    setMessage('You fed your cat!');
    setShowToast(true);
  };

  const playWithCat = () => {
    setHappiness(prev => Math.min(prev + 20, 100));
    setMessage('You played with your cat!');
    setShowToast(true);
  };

  const giveMedicine = () => {
    setHealth(prev => Math.min(prev + 20, 100));
    setMessage('You gave your cat medicine!');
    setShowToast(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pet Cat Tamagotchi</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonLabel>Hunger</IonLabel>
              <IonProgressBar value={hunger / 100}></IonProgressBar>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>Happiness</IonLabel>
              <IonProgressBar value={happiness / 100}></IonProgressBar>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>Health</IonLabel>
              <IonProgressBar value={health / 100}></IonProgressBar>
            </IonCol>
          </IonRow>
        </IonGrid>
        <div className="button-container">
          <IonButton expand="full" onClick={feedCat}>
            Feed
          </IonButton>
          <IonButton expand="full" onClick={playWithCat}>
            Play
          </IonButton>
          <IonButton expand="full" onClick={giveMedicine}>
            Give Medicine
          </IonButton>
        </div>
        <IonToast
          isOpen={showToast}
          message={message}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default PetCatPage;
