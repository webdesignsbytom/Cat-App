// src/pages/MyCatsPage.tsx
import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon } from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const MyCatsPage: React.FC = () => {
  const history = useHistory();

  const handleAddCat = () => {
    history.push('/add-edit-cat');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Cats</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            {[...Array(6)].map((_, index) => (
              <IonCol key={index} size="4">
                <div className="" onClick={handleAddCat}>
                  <IonIcon icon={addCircleOutline} />
                </div>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MyCatsPage;
