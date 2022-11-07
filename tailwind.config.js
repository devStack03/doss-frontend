/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  prefix: 'tw-',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '390px',
      sm: '577px',
      md: '768px',
      md2: '993px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1464px',
      '4xl': '1512px'
    },
    fontFamily: {
      'main': ['Manrope']
    },
    extend: {
      colors: {
        'main-theme': '#274463',
      },
    },
    container: {
      padding: '2rem',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}