import React, { useState, useEffect, useRef } from 'react';
import { IonPage, IonToast } from '@ionic/react';
// Components
import GameMenuComponent from '../../components/game/GameMenuComponent';
import ItemsMenuComponent from '../../components/game/ItemsMenuComponent';
// Data
import {
  foodItemsArray,
  catGamesArray,
  catMedicinesArray,
} from '../../utils/game/PurchasableGameItems';
// Images
import AmazedCat from '../../assets/images/game/amazed.png'
import NappingCat from '../../assets/images/game/napping.png'
import SleepingCat from '../../assets/images/game/sleeping.png'
import PleasedCat from '../../assets/images/game/pleased.png'
import WavingCat from '../../assets/images/game/waving.png'
import FoodCat from '../../assets/images/game/food.png'
import MadCat from '../../assets/images/game/mad.png'
import BasketCat from '../../assets/images/game/basket.png'
import CryingCat from '../../assets/images/game/crying.png'
import KeenCat from '../../assets/images/game/keen.png'
import WeirdCat from '../../assets/images/game/weird.png'

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
    dob: new Date('2023-01-01'),
  });
  const [petItemsOwned, setPetItemsOwned] = useState<{ id: number; name: string; title: string; imageUrl: string; price: number; effect: number; quantity: number }[]>([]);
  const [bank, setBank] = useState(5000);

  // Menus and shops
  const [isFoodMenuOpen, setIsFoodMenuOpen] = useState(false);
  const [isMedicineMenuOpen, setIsMedicineMenuOpen] = useState(false);
  const [isPlayMenuOpen, setIsPlayMenuOpen] = useState(false);
  const [isItemMenuOpen, setIsItemMenuOpen] = useState(false);

  // Messages
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Stats and effects
  const [minHungerLevel, setMinHungerLevel] = useState(1);

  // Game needs
  const topBarDataSet = [
    { label: 'Health', value: catigotchiStats.health },
    { label: 'Hunger', value: catigotchiStats.hunger },
    { label: 'Happiness', value: catigotchiStats.happiness },
    { label: 'Intelli', value: catigotchiStats.intelligence },
    { label: 'Playful', value: catigotchiStats.playfulness },
    { label: 'Bank', value: bank },
  ];

  const bottomBarDataSet = [
    { label: 'Food', icon: '🥪', onClick: () => openFoodMenu() },
    { label: 'Games', icon: '🕹️', onClick: () => openCatToysMenu() },
    { label: 'Health', icon: '⚕️', onClick: () => openMedicineMenu() },
    { label: 'Items', icon: '🎒', onClick: () => openItems() },
  ];

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
      const context = canvas.getContext('2d');
  
      if (context) {
        context.scale(1, 1);
        context.lineCap = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 5;
        contextRef.current = context;
  
        const image = new Image();
        image.src = AmazedCat; // Set the source to your image path
        image.onload = () => {
          if (canvas && context) {
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const imageWidth = image.width;
            const imageHeight = image.height;
  
            // Calculate the new image dimensions to fit within the canvas
            let drawWidth = imageWidth;
            let drawHeight = imageHeight;
            const aspectRatio = imageWidth / imageHeight;
  
            if (imageWidth > canvasWidth || imageHeight > canvasHeight) {
              if (canvasWidth / canvasHeight > aspectRatio) {
                drawHeight = canvasHeight;
                drawWidth = canvasHeight * aspectRatio;
              } else {
                drawWidth = canvasWidth;
                drawHeight = canvasWidth / aspectRatio;
              }
            }
  
            // Reduce the image size by 10%
            drawWidth *= 0.9;
            drawHeight *= 0.9;
  
            const x = (canvasWidth - drawWidth) / 2;
            const y = (canvasHeight - drawHeight) / 2;
  
            context.clearRect(0, 0, canvasWidth, canvasHeight); // Clear the canvas
            context.drawImage(image, x, y, drawWidth, drawHeight); // Draw the image
          }
        };
      }
    }
  }, []);
  

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

  const openFoodMenu = () => {
    setIsFoodMenuOpen(true);
  };

  const playWithCatx = () => {
    const rnd = Math.random();

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

  const openCatToysMenu = () => {
    setIsPlayMenuOpen(true);
  };

  const openMedicineMenu = () => {
    setIsMedicineMenuOpen(true);
  };

  const openItems = () => {
    setIsItemMenuOpen(true);
  };

  const handleBuyItem = (item: Item) => {
    if (bank >= item.price) {
      setBank((prevBank) => prevBank - item.price);
      setPetItemsOwned((prevItems) => {
        const existingItem = prevItems.find((i) => i.id === item.id);
        if (existingItem) {
          return prevItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          return [...prevItems, { ...item, quantity: 1 }];
        }
      });
      setMessage(`You bought ${item.title}!`);
    } else {
      setMessage("You don't have enough money!");
    }
    setShowToast(true);
  };
  
  const handleUseItem = (item: Item) => {
    setPetItemsOwned((prevItems) =>
      prevItems.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
      ).filter(i => i.quantity > 0)
    );
    setMessage(`You used ${item.title}!`);
    setShowToast(true);
  };
  

  const closeMenu = () => {
    setIsFoodMenuOpen(false);
    setIsPlayMenuOpen(false);
    setIsItemMenuOpen(false);
    setIsMedicineMenuOpen(false);
  };

  return (
    <IonPage>
      <div className='grid h-full w-full overflow-hidden bg-white'>
        <main className='relative grid grid-rows-a1a w-full h-full overflow-hidden'>
          {/* Top bar */}
          <section className='grid grid-cols-3 gap-y-1 border-solid border-b-2 border-black h-fit w-full py-2 overflow-hidden items-center'>
            {topBarDataSet.map((item, index) => (
              <div
                className='grid items-center w-full px-1'
                key={index}
              >
                <div
                  className='grid grid-cols-rev gap-1 w-full bg-yellow-400 rounded p-1'
                  key={index}
                >
                  <label className='w-fit text-sm font-semibold' htmlFor={item.label.toLowerCase()}>
                    {item.label}
                  </label>
                  <span className='w-[50px] text-sm text-center rounded bg-slate-50'>
                    {item.value.toFixed(0)}
                  </span>
                </div>
              </div>
            ))}
          </section>

          {/* Main game canvas */}
          <section className=' h-full w-full overflow-hidden'>
            <canvas ref={canvasRef} className='w-full h-full' />
          </section>

          {/* Bottom bar */}
          <section className='grid h-fit w-full border-solid border-t-2 border-black py-4 px-2 overflow-hidden'>
            <div className='grid grid-cols-4 gap-2 w-full'>
              {bottomBarDataSet.map((button, index) => (
                <button
                  className='px-1 rounded-lg w-full h-[52px] bg-main-colour text-white text-xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
                  onClick={button.onClick}
                  key={index}
                >
                  <div className='grid grid-cols-reg gap-2 items-center'>
                    <div className='text-4xl grid items-center'>{button.icon}</div>
                    <div className='text-sm'>{button.label}</div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {isFoodMenuOpen && (
            <GameMenuComponent
              menuTitle='Food Menu'
              items={foodItemsArray}
              onClose={closeMenu}
              onBuyItem={handleBuyItem}
            />
          )}

          {isPlayMenuOpen && (
            <GameMenuComponent
              menuTitle='Play Menu'
              items={catGamesArray}
              onClose={closeMenu}
              onBuyItem={handleBuyItem}
            />
          )}

          {isMedicineMenuOpen && (
            <GameMenuComponent
              menuTitle='Medicine'
              items={catMedicinesArray}
              onClose={closeMenu}
              onBuyItem={handleBuyItem}
            />
          )}

          {isItemMenuOpen && (
            <ItemsMenuComponent
              menuTitle='Items'
              items={petItemsOwned}
              onClose={closeMenu}
              onUseItem={handleUseItem}
            />
          )}
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
