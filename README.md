# Cat App


## Table of contents

- [CatApp](#cat-app)
  - [Table of contents](#table-of-contents)


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

### Prerequisites

- **Node.js**: Ensure Node.js is installed. [Download Node.js](https://nodejs.org/)
- **Ionic CLI**: Install the Ionic CLI globally.
  ```sh
  npm install -g @ionic/cli
  ```
