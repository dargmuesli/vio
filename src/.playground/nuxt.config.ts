import { VIO_NUXT_BASE_CONFIG } from '@dargmuesli/nuxt-vio/utils/constants'
import { defu } from 'defu'

const SITE_NAME = 'Vio Playground'

export default defineNuxtConfig(
  defu(
    {
      extends: '@dargmuesli/nuxt-vio',

      // modules
      site: {
        twitter: '@dargmuesli',
      },
    },
    VIO_NUXT_BASE_CONFIG({
      siteName: SITE_NAME,
      stagingHost: 'jonas-thelemann.de',
    }),
  ),
)
