import { SITE_NAME } from './utils/constants'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "en", // fallback data to prevent invalid html at generation
      },
      titleTemplate: `%s`,
      title: SITE_NAME, // fallback data to prevent invalid html at generation
    },
  },
  nitro: {
    compressPublicAssets: true,
  },
})
