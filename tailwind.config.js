module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {},
    screens: {
      sm: '768px',

      md: '992px',
      // => @media (min-width: 992px) { ... }

      lg: '1200px',
      // => @media (min-width: 1200px) { ... }

      xl: '1920px',
      // => @media (min-width: 1920px) { ... }

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
  purge: false
}
