module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateRows: {
        reg: 'auto 1fr',
        rev: '1fr auto',
        a1a: 'auto 1fr auto',
        foursix: '40% 60%',
      },
      gridTemplateColumns: {
        reg: 'auto 1fr',
        rev: '1fr auto',
        a1a: 'auto 1fr auto',
      },
      colors: {
        'main-colour': '#ffa500',
        'main-colour-alt': '#fc8b00',
        'main-bg-colour': '#ffffff',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}