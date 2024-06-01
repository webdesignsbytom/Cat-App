import { SettingsOption } from '../../components/game/CatInterface';
import { AppSettingsOption } from './AppInterface';

let settingsId = 0;

export const appSettingsOptions: AppSettingsOption[] = [
  {
    id: settingsId++,
    name: 'volume',
    title: 'Volume',
    runFunction: () => {},
  },
  {
    id: settingsId++,
    name: 'reset',
    title: 'Reset',
    runFunction: () => {},
  },
  {
    id: settingsId++,
    name: 'share',
    title: 'Share',
    runFunction: () => {},
  },
  {
    id: settingsId++,
    name: 'earn',
    title: 'Earn',
    runFunction: () => {},
  },
  {
    id: settingsId++,
    name: 'country',
    title: 'Country',
    runFunction: () => {},
  },
  {
    id: settingsId++,
    name: 'contact',
    title: 'Contact',
    runFunction: () => {},
  },
  {
    id: settingsId++,
    name: 'donate',
    title: 'Donate',
    runFunction: () => {},
  },
];
