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
  name: string;
  title: string;
  imageUrl: string;
  price: number;
  effect: number;
  xp: number;
}

export interface OwnedItem {
  id: number;
  name: string;
  title: string;
  imageUrl: string;
  price: number;
  effect: number;
  quantity: number;
  xp: number;
}

export interface GameMessage {
  modalTitle: string,
  modalContent: string
}

export enum CatMood {
  Happy = 'Happy',
  Hungry = 'Hungry',
  Tired = 'Tired',
  Sick = 'Sick',
  Excited = 'Excited',
  Sleeping = 'Sleeping'
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
