import React, { useState, useEffect, useRef } from 'react';
import { IonPage, IonToast } from '@ionic/react';
import GameMenuComponent from '../../components/game/GameMenuComponent';

const CatigotchiPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const [catigotchiStats, setCatigotchiStats] = useState<CatigotchiStats>({
    name: 'PetCat',
    hunger: 200,
    health: 100,
    happiness: 100,
    intelligence: 5,
    playfulness: 5,
    age: 50,
    dob: new Date('2023-01-01')
  });

  // Menus and shops
  const [isFoodMenuOpen, setIsFoodMenuOpen] = useState(false);
  const [isMedicineMenuOpen, setIsMedicineMenuOpen] = useState(false);
  const [isPlayMenuOpen, setIsPlayMenuOpen] = useState(false);

  // Messages
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [drawingColour, setDrawingColour] = useState('red');
  const [minHungerLevel, setMinHungerLevel] = useState(1);

  useEffect(() => {
    const lastCheck = localStorage.getItem('lastCheck');
    const now = new Date().getTime();

    if (lastCheck) {
      const elapsedTime = (now - parseInt(lastCheck)) / 1000; // Time in seconds
      const hungerDecrease = Math.floor(elapsedTime / 60); // Decrease hunger by 1 every minute
      const happinessDecrease = Math.floor(elapsedTime / 120); // Decrease happiness by 1 every 2 minutes
      const healthDecrease = Math.floor(elapsedTime / 180); // Decrease health by 1 every 3 minutes

      setCatigotchiStats((prevStats) => ({
        ...prevStats,
        hunger: Math.max(prevStats.hunger - hungerDecrease, 0),
        happiness: Math.max(prevStats.happiness - happinessDecrease, 0),
        health: Math.max(prevStats.health - healthDecrease, 0),
      }));
    }

    localStorage.setItem('lastCheck', now.toString());
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      canvas.style.width = `100%`;
      canvas.style.height = `100%`;

      canvas.style.background = 'blue';

      const context = canvas.getContext('2d');

      if (context) {
        context.scale(1, 1);
        context.lineCap = 'round';
        context.strokeStyle = drawingColour;
        context.lineWidth = 5;
        contextRef.current = context;

        // Draw a simple cat on the canvas
        context.fillStyle = 'gray';
        context.fillRect(100, 100, 100, 100); // Body
        context.fillRect(130, 70, 40, 40); // Head
        context.fillRect(110, 130, 20, 20); // Left leg
        context.fillRect(170, 130, 20, 20); // Right leg
        context.fillRect(90, 110, 20, 20); // Left arm
        context.fillRect(190, 110, 20, 20); // Right arm
      }
    }
  }, [drawingColour]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      localStorage.setItem('lastCheck', now.toString());
    }, 60000); // Update the last check time every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (catigotchiStats.hunger === 0 || catigotchiStats.happiness === 0) {
      setCatigotchiStats((prevStats) => ({
        ...prevStats,
        health: Math.max(prevStats.health - 2, 0),
      }));
    }
  }, [catigotchiStats.hunger, catigotchiStats.happiness]);

  const feedCat = () => {
    setIsFoodMenuOpen(true);
    setCatigotchiStats((prevStats) => ({
      ...prevStats,
      hunger: Math.min(prevStats.hunger + 20, 100),
    }));
    setMessage('You fed your cat!');
    setShowToast(true);
  };

  const playWithCat = () => {
    const rnd = Math.random();

    // Map the random number to one of four possible outcomes
    let plafulDiff;
    if (rnd < 0.25) {
      plafulDiff = 1;
    } else if (rnd < 0.5) {
      plafulDiff = -3;
    } else if (rnd < 0.9) {
      plafulDiff = 0;
    } else {
      plafulDiff = 5;
    }
        setCatigotchiStats((prevStats) => ({
      ...prevStats,
      happiness: Math.min(prevStats.happiness + 20, 100),
      intelligence: parseFloat((prevStats.intelligence + 0.1).toFixed(1)),
      playfulness: parseFloat((prevStats.playfulness + plafulDiff).toFixed(1)),
    }));
    setMessage('You played with your cat!');
    setShowToast(true);
  };

  const giveMedicine = () => {
    setCatigotchiStats((prevStats) => ({
      ...prevStats,
      health: Math.min(prevStats.health + 20, 100),
    }));
    setMessage('You gave your cat medicine!');
    setShowToast(true);
  };

  return (
    <IonPage>
      <div className='grid h-full w-full overflow-hidden bg-white'>
        <main className='relative grid grid-rows-a1a w-full h-full overflow-hidden'>
          <section className='grid grid-cols-3 bg-pink-300 h-fit w-full py-4 px-2 overflow-hidden'>
            <div className='grid grid-cols-2'>
              <label htmlFor='health'>Health</label>
              <input type='text' value={catigotchiStats.health.toFixed(0)} readOnly />
            </div>
            <div className='grid grid-cols-2'>
              <label htmlFor='hunger'>Hunger</label>
              <input type='text' value={catigotchiStats.hunger.toFixed(0)} readOnly />
            </div>
            <div className='grid grid-cols-2'>
              <label htmlFor='happiness'>Happiness</label>
              <input type='text' value={catigotchiStats.happiness.toFixed(0)} readOnly />
            </div>
            <div className='grid grid-cols-2'>
              <label htmlFor='intelligence'>Intelligence</label>
              <input type='text' value={catigotchiStats.intelligence.toFixed(0)} readOnly />
            </div>
            <div className='grid grid-cols-2'>
              <label htmlFor='playfulness'>Playfulness</label>
              <input type='text' value={catigotchiStats.playfulness.toFixed(0)} readOnly />
            </div>
          </section>

          <section className='bg-yellow-400 h-full w-full overflow-hidden'>
            <canvas ref={canvasRef} className='w-full h-full' />
          </section>

          <section className='grid h-fit w-full bg-purple-400 py-4 px-2 overflow-hidden'>
            <div className='grid grid-cols-3 gap-2 w-full'>
              <button
                className='px-2 py-2 rounded-lg w-full h-[52px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
                onClick={feedCat}
              >
                Feed
              </button>
              <button
                className='px-2 py-2 rounded-lg w-full h-[52px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
                onClick={playWithCat}
              >
                Play
              </button>
              <button
                className='px-2 py-2 rounded-lg w-full h-[52px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
                onClick={giveMedicine}
              >
                Medicine
              </button>
            </div>
          </section>

          {isFoodMenuOpen && <GameMenuComponent />}
        </main>
      </div>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={message}
        duration={2000}
      />
    </IonPage>
  );
};

export default CatigotchiPage;