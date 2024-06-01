import React, { useState, useEffect, useRef } from 'react';
import { IonPage, IonToast } from '@ionic/react';
// Components
import GameMenuComponent from '../../components/game/GameMenuComponent';
import ItemsMenuComponent from '../../components/game/ItemsMenuComponent';
import DevButtonsMenuComponent from '../../components/buttons/DevButtonsMenuComponent';
// Data
import {
  foodItemsArray,
  catGamesArray,
  catMedicinesArray,
} from '../../utils/game/PurchasableGameItems';
import { GamesMessagesArray } from '../../utils/game/GameMessages';
import { CatMood, CatigotchiStats, Item, startingCat } from '../../components/game/CatInterface';
// Images
import AmazedCat from '../../assets/images/game/amazed.png';
import NappingCat from '../../assets/images/game/napping.png';
import SleepingCat from '../../assets/images/game/sleeping.png';
import PleasedCat from '../../assets/images/game/pleased.png';
import WavingCat from '../../assets/images/game/waving.png';
import FoodCat from '../../assets/images/game/food.png';
import MadCat from '../../assets/images/game/mad.png';
import BasketCat from '../../assets/images/game/basket.png';
import CryingCat from '../../assets/images/game/crying.png';
import KeenCat from '../../assets/images/game/keen.png';
import WeirdCat from '../../assets/images/game/weird.png';
import GameModalDisplay from '../../components/game/GameModalDisplay';

const imagesArray = [
  AmazedCat,
  NappingCat,
  SleepingCat,
  PleasedCat,
  WavingCat,
  FoodCat,
  MadCat,
  BasketCat,
  CryingCat,
  KeenCat,
  WeirdCat,
];

const CatigotchiPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const [showInitialImage, setShowInitialImage] = useState(true);
  const [catigotchiStats, setCatigotchiStats] =
    useState<CatigotchiStats>(startingCat);

  const [petItemsOwned, setPetItemsOwned] = useState<
    {
      id: number;
      type: string;
      name: string;
      title: string;
      imageUrl: string;
      price: number;
      effect: number;
      quantity: number;
      xp: number;
    }[]
  >([]);

  const [bank, setBank] = useState(5000);

  // Menus and shops
  const [isFoodMenuOpen, setIsFoodMenuOpen] = useState(false);
  const [isMedicineMenuOpen, setIsMedicineMenuOpen] = useState(false);
  const [isPlayMenuOpen, setIsPlayMenuOpen] = useState(false);
  const [isItemMenuOpen, setIsItemMenuOpen] = useState(false);
  const [isDevButtonsMenuOpen, setIsDevButtonsMenuOpen] = useState(false); // Added DevButtons menu state

  // Messages
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessages, setModalMessages] = useState({
    modalTitle: '',
    modalMessage: ''
  });


  // Stats and effects
  const [minHungerLevel, setMinHungerLevel] = useState(1);
  const [minHappinessLevel, setMinHappinessLevel] = useState(1);

  // Game needs
  const topBarDataSet = [
    { label: 'Health', value: catigotchiStats.health },
    { label: 'Hunger', value: catigotchiStats.hunger },
    { label: 'Happiness', value: catigotchiStats.happiness },
    { label: 'Intelli', value: catigotchiStats.intelligence },
    { label: 'Playful', value: catigotchiStats.playfulness },
    { label: 'Level', value: catigotchiStats.level },
  ];

  const bottomBarDataSet = [
    { label: 'Food', icon: '🥪', onClick: () => openFoodMenu() },
    { label: 'Games', icon: '🕹️', onClick: () => openCatToysMenu() },
    { label: 'Health', icon: '⚕️', onClick: () => openMedicineMenu() },
    { label: 'Items', icon: '🎒', onClick: () => openItems() },
    { label: 'DevButtons', icon: '🛠️', onClick: () => openDevButtonsMenu() }, // Added DevButtons
  ];

  // Show inital image
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialImage(false);
    }, 4000);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

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

  // Set up and animate the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      contextRef.current = context;

      const drawImage = (imageSrc: string) => {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
          if (canvas && context) {
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const imageWidth = image.width;
            const imageHeight = image.height;

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

            drawWidth *= 1.1;
            drawHeight *= 0.75;

            const x = (canvasWidth - drawWidth) / 2;
            const y = (canvasHeight - drawHeight) / 2;

            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.drawImage(image, x, y, drawWidth, drawHeight);
          }
        };
      };

      if (showInitialImage) {
        drawImage(WavingCat);
      } else {
        const moodToImageMap = {
          [CatMood.Happy]: PleasedCat,
          [CatMood.Hungry]: FoodCat,
          [CatMood.Tired]: NappingCat,
          [CatMood.Sick]: CryingCat,
          [CatMood.Excited]: KeenCat,
          [CatMood.Sleeping]: SleepingCat,
        };

        const currentImage = moodToImageMap[catigotchiStats.mood] || PleasedCat;
        drawImage(currentImage);
      }
    }
  }, [catigotchiStats.mood, showInitialImage]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      localStorage.setItem('lastCheck', now.toString());
    }, 60000); // Update the last check time every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (
      catigotchiStats.hunger === minHungerLevel ||
      catigotchiStats.happiness === minHappinessLevel
    ) {
      setCatigotchiStats((prevStats) => ({
        ...prevStats,
        health: Math.max(prevStats.health - 2, 0),
      }));
    }
  }, [catigotchiStats.hunger, catigotchiStats.happiness]);

  const openMenu = (
    menuType: 'food' | 'play' | 'medicine' | 'item' | 'devButtons'
  ) => {
    setIsFoodMenuOpen(menuType === 'food');
    setIsPlayMenuOpen(menuType === 'play');
    setIsMedicineMenuOpen(menuType === 'medicine');
    setIsItemMenuOpen(menuType === 'item');
    setIsDevButtonsMenuOpen(menuType === 'devButtons'); // Handle DevButtons menu
  };

  const openFoodMenu = () => openMenu('food');
  const openCatToysMenu = () => openMenu('play');
  const openMedicineMenu = () => openMenu('medicine');
  const openItems = () => openMenu('item');
  const openDevButtonsMenu = () => openMenu('devButtons'); // Open DevButtons menu

  const changeCatMood = (mood: CatMood) => {
    setCatigotchiStats((prevStats) => ({
      ...prevStats,
      mood: mood,
    }));
    setMessage(`Cat mood changed to ${mood}!`);
    setShowToast(true);
    setIsDevButtonsMenuOpen(false);
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

  const handleBuyItem = (item: Item) => {
    // Check if can afford to buy
    if (bank >= item.price) {
      setBank((prevBank) => prevBank - item.price);

      // Add item to array
      setPetItemsOwned((prevItems) => {
        const existingItem = prevItems.find((i) => i.name === item.name);

        if (existingItem) {
          return prevItems.map((i) =>
            i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
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

  // Use items and update level and xp
  const handleUseItem = (item: Item) => {
    setPetItemsOwned((prevItems) =>
      prevItems
        .map((i) => (i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  
    setCatigotchiStats((prevCat) => {
      console.log('prevCat', prevCat);
      const newXp = prevCat.xp + item.xp;
      const newLevel = updateLevel(newXp);

      if (newLevel !== prevCat.level) {
        const levelUpMessage = GamesMessagesArray.find(
          (message) => message.modalTitle === 'Level Up'
        );
        if (levelUpMessage) {
          setModalMessages(levelUpMessage);
          setIsModalOpen(true);
        }
      }

      return {
        ...prevCat,
        xp: newXp,
        level: newLevel,
      };
    });
  
    setMessage(`You used ${item.title} and gained ${item.xp} XP!`);
    setShowToast(true);
  };
  

  const getXpForLevel = (level: number) => {
    return 10 * level * (level - 1); // Example function
  };

  const updateLevel = (xp: number) => {
    let level = catigotchiStats.level;
    console.log('xp', xp);
    while (xp >= getXpForLevel(level + 1)) {
      level++;
    }
    return level;
  };
  

  const closeMenu = () => {
    setIsFoodMenuOpen(false);
    setIsPlayMenuOpen(false);
    setIsItemMenuOpen(false);
    setIsMedicineMenuOpen(false);
    setIsModalOpen(false)
    setIsDevButtonsMenuOpen(false); // Close DevButtons menu
  };

  return (
    <IonPage>
      <div className='grid h-full w-full overflow-hidden bg-white'>
        <main className='grid grid-rows-a1a w-full h-full overflow-hidden'>
          {/* Top bar */}
          <section className='grid grid-cols-3 gap-y-1 bg-slate-200 border-solid border-2 border-black h-fit w-full py-2 overflow-hidden items-center'>
            {topBarDataSet.map((item, index) => (
              <div className='grid items-center w-full px-1' key={index}>
                <div
                  className='grid grid-cols-rev gap-1 w-full bg-yellow-400 rounded p-1'
                  key={index}
                >
                  <label
                    className='w-fit text-sm font-semibold'
                    htmlFor={item.label.toLowerCase()}
                  >
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
          <section className='relative h-full w-full overflow-hidden'>
            <canvas ref={canvasRef} className='w-full h-full' />

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

            {isDevButtonsMenuOpen && (
              <DevButtonsMenuComponent
                menuTitle='Dev Tools'
                onClose={closeMenu}
                onChangeMood={changeCatMood}
              />
            )}

            {isModalOpen && (
              <GameModalDisplay
                modalTitle={modalMessages.modalTitle}
                modalContent={modalMessages.modalMessage}
                onClose={closeMenu}
              />
            )}
          </section>

          {/* Bottom bar */}
          <section className='grid h-fit w-full bg-slate-200 border-solid border-2 border-black py-4 px-1.5 overflow-hidden'>
            <div className='grid grid-cols-4 gap-2 w-full'>
              {bottomBarDataSet.map((button, index) => (
                <button
                  className='px-0.5 rounded-lg w-full h-[52px] bg-main-colour text-white text-xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
                  onClick={button.onClick}
                  key={index}
                >
                  <div className='grid grid-cols-reg items-center'>
                    <div className='text-2xl grid items-center'>
                      {button.icon}
                    </div>
                    <div className='text-sm font-semibold'>{button.label}</div>
                  </div>
                </button>
              ))}
            </div>
          </section>
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
