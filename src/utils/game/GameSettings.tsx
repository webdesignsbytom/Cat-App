import { SettingsOption } from '../../components/game/CatInterface';

let settingsId = 0;

export const gameSettingsOptions: SettingsOption[] = [
    {
        id: settingsId++,
        name: 'volume',
        title: 'Volume',
        runFunction: () => {}
    },
    {
        id: settingsId++,
        name: 'reset',
        title: 'Reset',
        runFunction: () => {}
    },
    {
        id: settingsId++,
        name: 'share',
        title: 'Share',
        runFunction: () => {}
    },
    {
        id: settingsId++,
        name: 'earn',
        title: 'Earn',
        runFunction: () => {}
    },
]