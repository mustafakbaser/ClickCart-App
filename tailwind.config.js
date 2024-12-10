/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          darkest: '#0A1F33',
          darker: '#102A44',
          dark: '#183656',
          medium: '#22476B',
          primary: '#2C5B88',
        }
      }
    },
  },
  plugins: [],
};
