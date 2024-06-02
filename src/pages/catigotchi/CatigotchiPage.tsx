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
import {
  CatMood,
  CatigotchiStats,
  Item,
  calculateMaxStats,
  startingCat,
} from '../../components/game/CatInterface';
import GameModalDisplay from '../../components/game/GameModalDisplay';
import SettingsMenuComponent from '../../components/game/SettingsMenuComponent';
// Images
import { catGameImagesArray } from '../../utils/game/CatImages';

const CatigotchiPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const [showInitialImage, setShowInitialImage] = useState(true);
  const [catigotchiStats, setCatigotchiStats] = useState<CatigotchiStats>(
    JSON.parse(localStorage.getItem('catStats') || JSON.stringify(startingCat))
  );

  const [petItemsOwned, setPetItemsOwned] = useState<
    {
      id: number;
      name: string;
      type: string;
      title: string;
      imageUrl: string;
      price: number;
      effects: {
        hunger?: number;
        happiness?: number;
        health?: number;
        intelligence?: number;
        playfulness?: number;
      };
      quantity: number;
      xp: number;
    }[]
  >(JSON.parse(localStorage.getItem('petItems') || '[]'));

  const [bankStartingNum, setBankStartingNum] = useState<number>(5000);
  const [bank, setBank] = useState<number>(() => {
    const storedBank = localStorage.getItem('bank');
    return storedBank ? parseInt(storedBank, 10) : bankStartingNum;
  });

  // Menus and shops
  const [isFoodMenuOpen, setIsFoodMenuOpen] = useState(false);
  const [isMedicineMenuOpen, setIsMedicineMenuOpen] = useState(false);
  const [isPlayMenuOpen, setIsPlayMenuOpen] = useState(false);
  const [isItemMenuOpen, setIsItemMenuOpen] = useState(false);
  const [isDevButtonsMenuOpen, setIsDevButtonsMenuOpen] = useState(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);

  // Messages
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessages, setModalMessages] = useState({
    modalTitle: '',
    modalMessage: '',
  });

  // Settings
  const [startingVolume, setStartingVolume] = useState<number>(1);
  const [volumeLevel, setVolumeLevel] = useState<number>(() => {
    const storedVolume = localStorage.getItem('volumeLevel');
    return storedVolume ? parseInt(storedVolume, 10) : startingVolume;
  });

  // Stats and effects
  const [minHungerLevel, setMinHungerLevel] = useState<Number>(1);
  const [minHappinessLevel, setMinHappinessLevel] = useState<Number>(1);

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

  // Show initial image
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialImage(false);
    }, 2500);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  // Update data based on times
  useEffect(() => {
    const lastCheck = localStorage.getItem('lastCheck');
    const now = new Date().getTime();

    if (lastCheck) {
      const elapsedTime = (now - parseInt(lastCheck)) / 1000; // Time in seconds
      const hungerDecrease = Math.floor(elapsedTime / 60); // Decrease hunger by 1 every minute
      const happinessDecrease = Math.floor(elapsedTime / 120); // Decrease happiness by 1 every 2 minutes
      const healthDecrease = Math.floor(elapsedTime / 180); // Decrease health by 1 every 3 minutes

      setCatigotchiStats((prevStats) => {
        const newHunger = Math.max(prevStats.hunger - hungerDecrease, 0);
        const newHappiness = Math.max(
          prevStats.happiness - happinessDecrease,
          0
        );
        const newHealth = Math.max(prevStats.health - healthDecrease, 0);
        const newMood = checkMood(newHunger, newHappiness, newHealth);

        return {
          ...prevStats,
          hunger: newHunger,
          happiness: newHappiness,
          health: newHealth,
          mood: newMood,
        };
      });
    }

    localStorage.setItem('lastCheck', now.toString());
  }, []);

  const drawImage = (imageSrc: string) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

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

  // Set up and animate the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      contextRef.current = context;

      if (showInitialImage) {
        drawImage(
          catGameImagesArray.find((img) => img.mood === 'Waving')?.image || ''
        );
      } else {
        const moodToImageMap = {
          [CatMood.Happy]: catGameImagesArray.find(
            (img) => img.mood === 'Happy'
          )?.image,
          [CatMood.Hungry]: catGameImagesArray.find(
            (img) => img.mood === 'Hungry'
          )?.image,
          [CatMood.Tired]: catGameImagesArray.find(
            (img) => img.mood === 'Tired'
          )?.image,
          [CatMood.Sick]: catGameImagesArray.find((img) => img.mood === 'Sick')
            ?.image,
          [CatMood.Excited]: catGameImagesArray.find(
            (img) => img.mood === 'Excited'
          )?.image,
          [CatMood.Sleeping]: catGameImagesArray.find(
            (img) => img.mood === 'Sleeping'
          )?.image,
          [CatMood.Amazed]: catGameImagesArray.find(
            (img) => img.mood === 'Amazed'
          )?.image,
          [CatMood.Mad]: catGameImagesArray.find((img) => img.mood === 'Mad')
            ?.image,
          [CatMood.Weird]: catGameImagesArray.find(
            (img) => img.mood === 'Weird'
          )?.image,
          [CatMood.Waving]: catGameImagesArray.find(
            (img) => img.mood === 'Waving'
          )?.image,
          [CatMood.Basket]: catGameImagesArray.find(
            (img) => img.mood === 'Basket'
          )?.image,
        };

        const currentImage =
          moodToImageMap[catigotchiStats.mood] ||
          catGameImagesArray.find((img) => img.mood === 'Happy')?.image;
        drawImage(currentImage || '');
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

  useEffect(() => {
    localStorage.setItem('catStats', JSON.stringify(catigotchiStats));
  }, [catigotchiStats]);

  useEffect(() => {
    localStorage.setItem('petItems', JSON.stringify(petItemsOwned));
  }, [petItemsOwned]);

  useEffect(() => {
    localStorage.setItem('bank', JSON.stringify(bank));
  }, [bank]);

  useEffect(() => {
    localStorage.setItem('volumeLevel', JSON.stringify(volumeLevel));
  }, [volumeLevel]);

  const checkMood = (
    hunger: number,
    happiness: number,
    health: number
  ): CatMood => {
    if (health < 30) {
      return CatMood.Sick;
    } else if (hunger < 30) {
      return CatMood.Hungry;
    } else if (happiness < 30) {
      return CatMood.Tired;
    } else if (happiness > 70 && hunger > 70 && health > 70) {
      return CatMood.Happy;
    } else {
      return CatMood.Excited;
    }
  };

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
    setIsDevButtonsMenuOpen(false);
  };

  const playWithCat = () => {
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

    let newHappiness = Math.min(catigotchiStats.happiness + 20, 100);
    let newIntelligence = parseFloat(
      (catigotchiStats.intelligence + 0.1).toFixed(1)
    );
    let newPlayfullness = parseFloat(
      (catigotchiStats.playfulness + plafulDiff).toFixed(1)
    );

    setCatigotchiStats((prevStats) => ({
      ...prevStats,
      happiness: newHappiness,
      intelligence: newIntelligence,
      playfulness: newPlayfullness,
      mood: checkMood(newHappiness, newIntelligence, newPlayfullness),
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
      const newXp = prevCat.xp + item.xp;
      const newLevel = updateLevel(newXp);

      const {
        maxHunger,
        maxHappiness,
        maxHealth,
        maxIntelligence,
        maxPlayfulness,
      } = calculateMaxStats(newLevel);

      const newHunger = item.effects.hunger
        ? Math.min(prevCat.hunger + item.effects.hunger, maxHunger)
        : prevCat.hunger;
      const newHappiness = item.effects.happiness
        ? Math.min(prevCat.happiness + item.effects.happiness, maxHappiness)
        : prevCat.happiness;
      const newHealth = item.effects.health
        ? Math.min(prevCat.health + item.effects.health, maxHealth)
        : prevCat.health;
      const newIntelligence = item.effects.intelligence
        ? Math.min(
            prevCat.intelligence + item.effects.intelligence,
            maxIntelligence
          )
        : prevCat.intelligence;
      const newPlayfulness = item.effects.playfulness
        ? Math.min(
            prevCat.playfulness + item.effects.playfulness,
            maxPlayfulness
          )
        : prevCat.playfulness;
      const newMood = checkMood(newHunger, newHappiness, newHealth);

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
        hunger: newHunger,
        happiness: newHappiness,
        health: newHealth,
        intelligence: newIntelligence,
        playfulness: newPlayfulness,
        mood: newMood,
      };
    });

    if (item.type === 'game') {
      changeCatMood(CatMood.Amazed);
      closeMenu();
      animateItemTowardsCat(catGameImagesArray[0].image); // Call the animation function
    }

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

  const openSettingsMenu = () => {
    setIsSettingsMenuOpen(true);
  };

  const closeSettingsMenu = () => {
    setIsSettingsMenuOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeMenu = () => {
    setIsFoodMenuOpen(false);
    setIsPlayMenuOpen(false);
    setIsItemMenuOpen(false);
    setIsMedicineMenuOpen(false);
    setIsModalOpen(false);
    setIsDevButtonsMenuOpen(false); // Close DevButtons menu
  };

  const resetCat = () => {
    // Clear local storage
    localStorage.clear();

    // Reset state to default values
    setCatigotchiStats(startingCat);
    setBank(bankStartingNum);
    setPetItemsOwned([]);
    setVolumeLevel(startingVolume); // Reset volume level to default if needed
  };

  const animateItemTowardsCat = (itemImageSrc: string) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    const itemImage = new Image();
    itemImage.src = itemImageSrc;

    let x = -itemImage.width; // Start position (off-screen)
    const y = canvas.height / 2 - itemImage.height / 2; // Vertical center

    itemImage.onload = () => {
      const animate = () => {
        if (!canvas || !context) return;

        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the item image at the new position
        context.drawImage(itemImage, x, y);

        // Update the position
        x += 5; // Move 5 pixels per frame

        // Continue the animation if the image is not off-screen yet
        if (x < canvas.width) {
          requestAnimationFrame(animate);
        } else {
          // Optionally draw the cat image once the item reaches the cat
          const catImageSrc = catGameImagesArray.find(
            (img) => img.mood === catigotchiStats.mood
          )?.image;
          if (catImageSrc) {
            drawImage(catImageSrc);
          }
        }
      };

      animate();
    };
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
                bank={bank}
                items={foodItemsArray}
                onClose={closeMenu}
                onBuyItem={handleBuyItem}
              />
            )}

            {isPlayMenuOpen && (
              <GameMenuComponent
                menuTitle='Play Menu'
                bank={bank}
                items={catGamesArray}
                onClose={closeMenu}
                onBuyItem={handleBuyItem}
              />
            )}

            {isMedicineMenuOpen && (
              <GameMenuComponent
                menuTitle='Medicine'
                bank={bank}
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
                openSettingsMenu={openSettingsMenu}
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
                onClose={closeModal}
              />
            )}

            {isSettingsMenuOpen && (
              <SettingsMenuComponent
                onResetCat={resetCat}
                onClose={closeSettingsMenu}
                volumeSettings={[volumeLevel, setVolumeLevel]}
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
