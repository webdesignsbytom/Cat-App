interface CatigotchiStats {
    name: string;
    hunger: number;
    health: number,
    happiness: number,
    intelligence: number,
    playfulness: number
    age: number,
    dob: Date;
  }
  
  interface Item {
    id: number;
    name: string;
    title: string;
    imageUrl: string;
    price: number;
    effect: number;
  }
  interface OwnedItem {
    id: number;
    name: string;
    title: string;
    imageUrl: string;
    price: number;
    effect: number;
    quantity: number;
  }
  