/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      'text-primary': '#292929',
      'text-black': '#191919',
      'text-gray': '#757575'
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif']
    },
  },
  important: true,
  plugins: [],
}
