// Purchasable items for Catigotchi Game

import { Item } from '../../components/game/CatInterface';
import { sponsorData } from '../app/SponsorData';

// Arrays are all identical format for reusuable component 'GameMenuComponent'
let foodId = 0;

export const foodItemsArray: Item[] = [
    {
        id: foodId++,
        type: 'food',
        name: sponsorData.name,
        title: sponsorData.title,
        imageUrl: '🥫',
        price: 5,
        effects: {
            hunger: 10,
            happiness: 5,
        },
        xp: 5
    },
    {
        id: foodId++,
        type: 'food',
        name: 'fish',
        title: 'Fresh Fish',
        imageUrl: '🐟',
        price: 10,
        effects: {
            hunger: 10,
            happiness: 5,
        },
        xp: 5
    },
    {
        id: foodId++,
        type: 'food',
        name: 'chicken',
        title: 'Cooked Chicken',
        imageUrl: '🍗',
        price: 10,
        effects: {
            hunger: 10,
            happiness: 5,
        },
        xp: 5
    },
    {
        id: foodId++,
        type: 'food',
        name: 'milk',
        title: 'Bowl of Milk',
        imageUrl: '🥛',
        price: 10,
        effects: {
            hunger: 10,
            happiness: 5,
        },
        xp: 5
    },
    {
        id: foodId++,
        type: 'food',
        name: 'tuna',
        title: 'Tuna Can',
        imageUrl: '🐟',
        price: 10,
        effects: {
            hunger: 10,
            happiness: 5,
        },
        xp: 5
    },
    {
        id: foodId++,
        type: 'food',
        name: 'salmon',
        title: 'Salmon Fillet',
        imageUrl: '🐠',
        price: 10,
        effects: {
            hunger: 10,
            happiness: 5,
        },
        xp: 5
    },
    {
        id: foodId++,
        type: 'food',
        name: 'catnip',
        title: 'Fresh Catnip',
        imageUrl: '🌿',
        price: 10,
        effects: {
            hunger: 10,
            happiness: 5,
        },
        xp: 5
    },
    {
        id: foodId++,
        type: 'food',
        name: 'shrimp',
        title: 'Fresh Shrimp',
        imageUrl: '🍤',
        price: 10,
        effects: {
            hunger: 10,
            happiness: 5,
        },
        xp: 5
    }
];

let gameId = 0;

export const catGamesArray: Item[] = [
    {
        id: gameId++,
        type: 'game',
        name: 'ballOfYarn',
        title: 'Ball of Yarn',
        imageUrl: '🧶',
        price: 2,
        effects: {
            happiness: 10,
            playfulness: 5,
        },
        xp: 5
    },
    {
        id: gameId++,
        type: 'game',
        name: 'cardboardBox',
        title: 'Box',
        imageUrl: '📦',
        price: 5,
        effects: {
            happiness: 10,
            playfulness: 5,
        },
        xp: 5
    },
    {
        id: gameId++,
        type: 'game',
        name: 'laserPointer',
        title: 'Laser Pointer',
        imageUrl: '🔦',
        price: 10,
        effects: {
            happiness: 10,
            playfulness: 5,
        },
        xp: 5
    },
    {
        id: gameId++,
        type: 'game',
        name: 'featherToy',
        title: 'Feather Toy',
        imageUrl: '🪶',
        price: 10,
        effects: {
            happiness: 10,
            playfulness: 5,
        },
        xp: 5
    },
    {
        id: gameId++,
        type: 'game',
        name: 'catnipToy',
        title: 'Catnip Toy',
        imageUrl: '🌿',
        price: 10,
        effects: {
            happiness: 10,
            playfulness: 5,
        },
        xp: 5
    },
    {
        id: gameId++,
        type: 'game',
        name: 'scratchingPost',
        title: 'Scratching Post',
        imageUrl: '🪵',
        price: 10,
        effects: {
            happiness: 10,
            playfulness: 5,
        },
        xp: 5
    },
    {
        id: gameId++,
        type: 'game',
        name: 'toyMouse',
        title: 'Toy Mouse',
        imageUrl: '🐭',
        price: 10,
        effects: {
            happiness: 10,
            playfulness: 5,
        },
        xp: 5
    }
];

let medicineId = 0;

export const catMedicinesArray: Item[] = [
    {
        id: medicineId++,
        type: 'medicine',
        name: 'antibiotic',
        title: 'Antibiotic',
        imageUrl: '💊',
        price: 15,
        effects: {
            health: 20,
        },
        xp: 5
    },
    {
        id: medicineId++,
        type: 'medicine',
        name: 'fleaTreatment',
        title: 'Flea Treatment',
        imageUrl: '🪲',
        price: 20,
        effects: {
            health: 15,
        },
        xp: 5
    },
    {
        id: medicineId++,
        type: 'medicine',
        name: 'painReliever',
        title: 'Pain Reliever',
        imageUrl: '🩹',
        price: 10,
        effects: {
            health: 10,
        },
        xp: 5
    },
    {
        id: medicineId++,
        type: 'medicine',
        name: 'vaccine',
        title: 'Vaccine',
        imageUrl: '💉',
        price: 50,
        effects: {
            health: 10,
            happiness: 10,
            playfulness: 5,
        },
        xp: 5
    }
];
