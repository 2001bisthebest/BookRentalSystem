/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        'dark-purple': '#2A2F4F',
        'light-purple': '#917FB3',
        'white-snow': '#FFFAFA',
        'white-bg': '#FAF9F6',
        'light-gray': '#D9D9D9',
        'red-btn': '#E95757',
        'green-btn': '#5DD971',
        'yellow-btn': '#C2B11D'
      },
      fontFamily: {
        'noto-sans-thai': ['"Noto Sans Thai"', 'sans-serif']
      },
    },
    container: {
      'padding': '0',
    },
    fontFamily: {
    }
  },
  plugins: [],
}