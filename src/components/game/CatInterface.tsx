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
}

export const startingCat: CatigotchiStats = {
  name: 'PetCat',
  hunger: 200,
  health: 100,
  happiness: 100,
  intelligence: 5,
  playfulness: 5,
  age: 50,
  level: 1,
  xp: 0,
  mood: CatMood.Happy,
  dob: new Date('2023-01-01'),
};

// Define the interface for a settings option
export interface SettingsOption {
  id: number;
  name: string;
  title: string;
  runFunction: () => void;
}
