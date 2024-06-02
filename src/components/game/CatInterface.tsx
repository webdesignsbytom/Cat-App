export interface CatigotchiStats {
  name: string;
  hunger: number;
  health: number;
  happiness: number;
  intelligence: number;
  playfulness: number;
  age: number;
  level: number;
  xp: number;
  dob: Date;
  mood: CatMood;
}

export interface Item {
  id: number;
  type: string;
  name: string;
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
  xp: number;
}


export interface OwnedItem {
  id: number;
  type: string;
  name: string;
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
}

export interface GameMenuComponentProps {
  menuTitle: string;
  bank: number;
  items: {
    id: number;
    type: string;
    name: string;
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
    xp: number;
  }[];
  onClose: () => void;
  onBuyItem: (item: Item) => void;
}

export interface ItemsMenuComponentProps {
  menuTitle: string;
  items: OwnedItem[];
  onClose: () => void;
  onUseItem: (item: OwnedItem) => void;
  openSettingsMenu: () => void;
}

export interface SettingsMenuComponentProps {
  onClose: () => void;
  onResetCat: () => void;
  volumeSettings: [number, React.Dispatch<React.SetStateAction<number>>];
}


export interface GameModalDisplayProps {
  modalTitle: string;
  modalContent: string;
  onClose: () => void;
}

export interface GameMessage {
  modalTitle: string;
  modalContent: string;
}

export enum CatMood {
  Happy = 'Happy',
  Hungry = 'Hungry',
  Tired = 'Tired',
  Sick = 'Sick',
  Excited = 'Excited',
  Sleeping = 'Sleeping',
  Amazed = 'Amazed',
  Weird = 'Weird',
  Mad = 'Mad',
  Waving = 'Waving',
  Basket = 'Basket',
}

// Starting stats
const startingStats = {
  maxHealth: 100,
  maxHappiness: 100,
  maxIntelligence: 5,
  maxPlayfulness: 5,
  maxHunger: 200,
  startingLevel: 1,
  startingXp: 0,
  startingAge: 0, // In days
};


// Cat object
export const startingCat: CatigotchiStats = {
  name: 'Pet Cat',
  hunger: startingStats.maxHunger,
  health: startingStats.maxHealth,
  happiness: startingStats.maxHappiness,
  intelligence: startingStats.maxIntelligence,
  playfulness: startingStats.maxPlayfulness,
  age: startingStats.startingAge,
  level: startingStats.startingLevel,
  xp: startingStats.startingXp,
  mood: CatMood.Happy,
  dob: new Date(),
};

// Define the interface for a settings option
export interface SettingsOption {
  id: number;
  name: string;
  title: string;
  runFunction: () => void;
}

const increaseAmount = 0.1
// Function to calculate max stats based on level
export const calculateMaxStats = (level: number) => {
  const factor = 1 + increaseAmount * (level - 1);
  return {
    maxHealth: parseFloat((startingStats.maxHealth * factor).toFixed(2)),
    maxHappiness: parseFloat((startingStats.maxHappiness * factor).toFixed(2)),
    maxIntelligence: parseFloat((startingStats.maxIntelligence * factor).toFixed(2)),
    maxPlayfulness: parseFloat((startingStats.maxPlayfulness * factor).toFixed(2)),
    maxHunger: parseFloat((startingStats.maxHunger * factor).toFixed(2)),
  };
};