import fs from 'fs'
import path from 'path'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  /*
   ** SSL on local development (checkout README.md for instructions)
   */
  // server: {
  //   port: process.env.NUXT_PORT,
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, '.ssl/localhost.key')),
  //     cert: fs.readFileSync(path.resolve(__dirname, '.ssl/localhost.crt'))
  //   }
  // },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'headless-cms-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/main.css',
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/styles/index.css',
    '@fortawesome/fontawesome-free/css/all.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/element-ui', '@/plugins/data-helper.ts'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxt/content', '@nuxtjs/i18n'],

  content: {
    liveEdit: false
  },

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'vn',
    locales: [
      {
        code: 'en',
        name: 'EN',
        iso: 'en-US',
        file: 'en-US.json'
      },
      {
        code: 'vn',
        name: 'VN',
        iso: 'vn-VN',
        file: 'vn-VN.json'
      }
    ],
    langDir: 'locales/',
    vueI18n: {
      fallbackLocale: 'vn'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/, 'dom7', 'ssr-window'],
    // Customize PostCSS Loader plugins
    // https://nuxtjs.org/api/configuration-build/#postcss
    postcss: {
      // Nuxt.js has applied PostCSS Preset Env.
      // By default it enables Stage 2 features and Autoprefixer,
      // you can use `build.postcss.preset` to configure it.
      // https://preset-env.cssdb.org/features#stage-2
      preset: {
        // Specifies sources where variables like Custom Media, Custom Properties, etc.
        // https://github.com/csstools/postcss-preset-env#importfrom
        importFrom: ['assets/styles/variables.css'],

        // Enables or disables specific polyfills
        // https://github.com/csstools/postcss-preset-env#features
        features: {
          'nesting-rules': true,
          'custom-media-queries': true,
          stage: 1
        }
      },
      plugins: {
        'postcss-mixins': {},
        'postcss-import': {},
        'tailwindcss/nesting': {},
        tailwindcss: path.resolve(__dirname, './tailwind.config.js'),
        autoprefixer: {}
      }
    }
  }
}
