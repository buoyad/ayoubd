const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      yellow: '#FFDD00',
      gray: colors.gray,
      blue: colors.blue,
      white: colors.white,
      black: colors.black,
    },
  },
  plugins: [],
  darkMode: 'class',
}
