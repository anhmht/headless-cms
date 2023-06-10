import fs from 'fs'
import path from 'path'
import { defineNuxtConfig } from 'nuxt/config'
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  vite: {
    server: {
      watch: {
        usePolling: true
      }
    }
  },
  /*
   ** SSL on local development (checkout README.md for instructions)
   */
  // server: {
  //   port: process.env.NUXT_PORT,
  //   https: {
  //     key: fs.readFileSync(
  //       fileURLToPath(new URL('.ssl/localhost.key', import.meta.url))
  //     ),
  //     cert: fs.readFileSync(
  //       fileURLToPath(new URL('.ssl/localhost.crt', import.meta.url))
  //     )
  //   }
  // },
  // experimental: {
  //   viewTransition: true
  // },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Law4you',
    htmlAttrs: {
      lang: 'vi'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'view-transitions', content: 'same-origin' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ src: '/js/fb-sdk.js' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/main.css',
    '~/assets/styles/index.css',
    '@fortawesome/fontawesome-free/css/all.css'
  ],

  bridge: {
    autoImports: true
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@element-plus/nuxt',
    '@pinia/nuxt',
    'nuxt-lodash'
  ],

  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'] // import { defineStore as definePiniaStore } from 'pinia'
    ]
  },

  imports: {
    dirs: ['store']
  },

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
    vueI18n: './i18n.config.ts'
  },

  postcss: {
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
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['dom7', 'ssr-window']
    // Customize PostCSS Loader plugins
    // https://nuxtjs.org/api/configuration-build/#postcss
  }
})
