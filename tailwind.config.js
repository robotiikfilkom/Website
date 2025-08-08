/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sfpro: ['SF Pro Text', 'sans-serif'],
        glancyr: ['Glancyr', 'sans-serif'],
      },
      colors: {
        black: '#0B0C0C',
        white: '#F8FAFB',
        gray: '#8E8E8E',
        orange: '#F6821F',
        blue: {
          DEFAULT: '#0073BA',
          
        },
      },
    },
  },
  plugins: [],
}
