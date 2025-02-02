# Cat App

## Table of Contents

- [Cat App](#cat-app)
  - [Table of Contents](#table-of-contents)
  - [Purpose](#purpose)
  - [Features](#features)
  - [License](#license)
  - [Code Structure](#code-structure)
    - [Directories](#directories)
    - [Key Files](#key-files)
  - [How to Run](#how-to-run)
    - [Prerequisites](#prerequisites)
    - [Pages](#pages)
  - [Needs](#needs)
  - [Create APK](#create-apk)
    - [Rebuild apk](#rebuild-apk)

## Purpose

Cat App provides video entertainment featuring the most popular animal on the internet.

## Features

- Watch cat videos
- Cat of the Day
- Endless cat videos
- Therapy mode for relaxation
- AI-generated cat images
- Test page for experimental features

## License

This project is private property and is not open for public use. For more details, see the [LICENSE](License.md) file.

## Code Structure

### Directories

- **src/components**: Reusable components such as the splash screen.
- **src/pages**: Page components corresponding to different app routes.
- **src/theme**: Theming and style files.
- **src/assets**: Static assets like images and logos.
- **src/styles**: Additional CSS files for custom styling.

### Key Files

- **src/App.tsx**: Main app component with routing and tab setup.
- **src/components/SplashScreen.tsx**: Custom splash screen component.
- **src/theme/variables.css**: CSS variables for theming.
- **src/tailwind.css**: Tailwind CSS integration for utility-first styling.
- **capacitor.config.ts**: Capacitor configuration for native functionality.

## How to Run

Clone file
`git clone https://github.com/yourusername/cat-app.git`
`cd cat-app`
`npm install`
`ionic serve`

Add platforms
`ionic capacitor add ios`
`ionic capacitor add android`
`ionic capacitor sync`

`ionic capacitor open ios`
`ionic capacitor open android`

Build
`ionic build`
npx vite preview

### Prerequisites

- **Node.js**: Ensure Node.js is installed. [Download Node.js](https://nodejs.org/)
- **Ionic CLI**: Install the Ionic CLI globally.

### Pages

1. Cat of the day - working page with latest tech and server
2. Endless Cats - loaded from in app
3. Therapy mode - test page

## Needs

1. env control

## Create APK

`ionic build`
`ionic capacitor copy android`
`ionic capacitor sync android`
`cd android`
`./gradlew assembleDebug`
`./gradlew assembleRelease`

### Rebuild apk

`cd ..`
`ionic build`
`ionic capacitor copy android`
`cd android`
`./gradlew assembleDebug`
`./gradlew assembleRelease`

`cd .. && ionic build && ionic capacitor copy android && cd android && ./gradlew assembleDebug`
