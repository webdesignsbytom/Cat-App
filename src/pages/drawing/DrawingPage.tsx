import React, { useRef, useEffect, useState } from 'react';
import { IonPage } from '@ionic/react';

const DrawingPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [colour, setColour] = useState('#000000');
  const [listOfColours, setListOfColours] = useState([
    { name: 'black', hex: '#000000' },
    { name: 'red', hex: '#FF0000' },
    { name: 'green', hex: '#008000' },
    { name: 'yellow', hex: '#FFFF00' },
    { name: 'pink', hex: '#FFC0CB' },
    { name: 'orange', hex: '#FFA500' },
    { name: 'blue', hex: '#0000FF' },
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * 2;
      canvas.height = height * 2;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const context = canvas.getContext('2d');
      if (context) {
        context.scale(2, 2);
        context.lineCap = 'round';
        context.strokeStyle = colour;
        context.lineWidth = 5;
        contextRef.current = context;
      }
    }
  }, [colour]);

  const getMousePos = (canvas: HTMLCanvasElement, event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * 2,
      y: (event.clientY - rect.top) * 2,
    };
  };

  const getTouchPos = (canvas: HTMLCanvasElement, touchEvent: TouchEvent) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (touchEvent.touches[0].clientX - rect.left) * 2,
      y: (touchEvent.touches[0].clientY - rect.top) * 2,
    };
  };

  const startDrawing = (event: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pos = 'touches' in event.nativeEvent
      ? getTouchPos(canvas, event.nativeEvent)
      : getMousePos(canvas, event.nativeEvent as MouseEvent);

    contextRef.current?.beginPath();
    contextRef.current?.moveTo(pos.x, pos.y);
    setDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current?.closePath();
    setDrawing(false);
  };

  const draw = (event: React.TouchEvent | React.MouseEvent) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const pos = 'touches' in event.nativeEvent
      ? getTouchPos(canvas, event.nativeEvent)
      : getMousePos(canvas, event.nativeEvent as MouseEvent);

    contextRef.current?.lineTo(pos.x, pos.y);
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
      <main className='grid grid-rows-reg h-full w-full'>
        <header className='grid grid-cols-rev items-center py-2 px-2 border-solid border-b-2 border-gray-600'>
          <div>Colour Select:</div>
          <div className='grid grid-flow-col gap-2 pr-2 '>
            {listOfColours.map((color, index) => {
              return (
                <div
                  key={index}
                  className='shadow-md cursor-pointer active:scale-110'
                  style={{
                    backgroundColor: color.hex,
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                  }}
                  onClick={() => setColour(color.hex)}
                ></div>
              );
            })}
          </div>
        </header>

        {/* Main Canvas */}
        <section className='w-full h-full overflow-hidden'>
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={finishDrawing}
            onTouchMove={draw}
            className='h-full w-full bg-teal-100'
          />
        </section>
      </main>
    </IonPage>
  );
};

export default DrawingPage;
