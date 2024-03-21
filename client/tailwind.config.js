/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-purple': '#2A2F4F',
        'light-purple': '#917FB3',
        'white-snow': '#FFFAFA',
        'white-bg': '#FAF9F6',
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