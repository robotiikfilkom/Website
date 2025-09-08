/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Properti yang sudah ada
      fontFamily: {
        sfpro: ["SF Pro Text", "sans-serif"],
        glancyr: ["Glancyr", "sans-serif"],
      },
      colors: {
        black: "#0B0C0C",
        white: "#F8FAFB",
        gray: "#8E8E8E",
        orange: "#F6821F",
        cream: "#F0E9CD", // Nilai 'cream' dari kode target dipertahankan
        blue: {
          DEFAULT: "#0073BA",
        },
      },

      // Properti baru yang ditambahkan dari kode sumber
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        floatUp: 'floatUp 0.8s ease-out forwards',
      },

      transitionDelay: {
        '150': '150ms',
        '300': '300ms',
      },
    },
  },
  // Penempatan 'plugins' yang benar adalah di sini
  plugins: [
    require("tailwind-scrollbar-hide")
  ],
};