/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          darkest: '#003840',
          darker: '#005A5B',
          dark: '#007369',
          medium: '#008C72',
          primary: '#02A676',
        }
      }
    },
  },
  plugins: [],
};