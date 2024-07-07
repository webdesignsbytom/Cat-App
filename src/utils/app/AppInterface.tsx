export interface AppSettingsOption {
  id: number;
  name: string;
  title: string;
  runFunction: () => void;
}

export type EventType = 'ERROR' | 'USER' | 'ADMIN' | 'VISITOR' | 'DEVELOPER' | 'PURCHASE' | 'TEST';

export interface EventItem {
  id: string;
  type: EventType;
  topic: string;
  code: number;
  content?: string;
  createdById?: string;
  receivedById?: string;
  viewed: boolean;
  createdAt: string;
  updatedAt?: string;
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


export interface AdminCurrentView {
  setCurrentView: (view: string) => void;
}

export interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}