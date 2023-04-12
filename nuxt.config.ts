import { SITE_NAME } from './utils/constants'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en', // fallback data to prevent invalid html at generation
      },
      titleTemplate: `%s`,
      title: SITE_NAME, // fallback data to prevent invalid html at generation
    },
  },
  modules: ['@dargmuesli/nuxt-cookie-control', '@nuxtjs/tailwindcss'],
  nitro: {
    compressPublicAssets: true,
  },
  typescript: {
    shim: false,
    strict: true,
    tsConfig: {
      vueCompilerOptions: {
        htmlAttributes: [], // https://github.com/johnsoncodehk/volar/issues/1970#issuecomment-1276994634
      },
    },
  },
})
