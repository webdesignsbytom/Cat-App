export interface AppSettingsOption {
  id: number;
  name: string;
  title: string;
  runFunction: () => void;
}

export interface OwnedCat {
  name: string;
  image: string;
  breed: string;
  favouriteFood: string;
  dob: Date;
}

export const blankCat: OwnedCat = {
  name: '',
  image: '',
  breed: '',
  favouriteFood: '',
  dob: new Date(),
};
