// src/pages/DrawingPage.tsx
import React, { useRef, useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonToast,
  IonLoading,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';

const DrawingPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [color, setColor] = useState('black');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const context = canvas.getContext('2d');
      if (context) {
        context.scale(2, 2);
        context.lineCap = 'round';
        context.strokeStyle = color;
        context.lineWidth = 5;
        contextRef.current = context;
      }
    }
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
    }
  }, [color]);

  const startDrawing = ({ nativeEvent }: React.TouchEvent | React.MouseEvent) => {
    const { offsetX, offsetY } = nativeEvent as MouseEvent;
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current?.closePath();
    setDrawing(false);
  };

  const draw = ({ nativeEvent }: React.TouchEvent | React.MouseEvent) => {
    if (!drawing) return;
    const { offsetX, offsetY } = nativeEvent as MouseEvent;
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();
  };

  const clearCanvas = () => {
    contextRef.current?.clearRect(0, 0, canvasRef.current?.width!, canvasRef.current?.height!);
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL();
      localStorage.setItem('drawing', dataUrl);
      setToastMessage('Drawing saved locally');
      setShowToast(true);
    }
  };

  const submitDrawing = async () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL();
      setShowLoading(true);
      try {
        const response = await fetch('/api/submit-drawing', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ drawing: dataUrl }),
        });

        if (!response.ok) {
          throw new Error('Failed to submit drawing');
        }

        setToastMessage('Drawing submitted successfully');
        setShowToast(true);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setToastMessage(error.message);
        } else {
          setToastMessage('An unknown error occurred');
        }
        setShowToast(true);
      } finally {
        setShowLoading(false);
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Draw</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel>Color</IonLabel>
          <IonSelect value={color} onIonChange={(e) => setColor(e.detail.value)}>
            <IonSelectOption value="black">Black</IonSelectOption>
            <IonSelectOption value="red">Red</IonSelectOption>
            <IonSelectOption value="green">Green</IonSelectOption>
            <IonSelectOption value="blue">Blue</IonSelectOption>
            <IonSelectOption value="yellow">Yellow</IonSelectOption>
          </IonSelect>
        </IonItem>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          onTouchStart={startDrawing}
          onTouchEnd={finishDrawing}
          onTouchMove={draw}
          className="drawing-canvas"
        />
        <IonButton expand="full" onClick={clearCanvas} className="ion-margin-top">
          Clear
        </IonButton>
        <IonButton expand="full" onClick={saveDrawing} className="ion-margin-top">
          Save
        </IonButton>
        <IonButton expand="full" onClick={submitDrawing} className="ion-margin-top">
          Submit
        </IonButton>
        <IonLoading isOpen={showLoading} message={'Submitting drawing...'} />
        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default DrawingPage;
