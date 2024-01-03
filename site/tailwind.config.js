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
    },
  },
  plugins: [],
  darkMode: 'class',
}
