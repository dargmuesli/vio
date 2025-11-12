import { VIO_NUXT_BASE_CONFIG } from '@dargmuesli/nuxt-vio/shared/utils/nuxt'
import { defu } from 'defu'

const SITE_NAME = 'Vio Playground'

export default defineNuxtConfig(
  defu(
    {
      css: ['~/assets/css/playground.css'],
      extends: ['@dargmuesli/nuxt-vio'],
      vite: {
        optimizeDeps: {
          include: [
            '@dargmuesli/nuxt-cookie-control/runtime/types.js',
            '@http-util/status-i18n',
            '@vuelidate/validators',
            '@vueuse/core',
            'reka-ui',
          ],
        },
      },

      // modules
      security: {
        headers: {
          contentSecurityPolicy: {
            'report-to': 'csp-endpoint',
            'report-uri':
              'https://o4507259039973376.ingest.de.sentry.io/api/4507260561653840/security/?sentry_key=1e53178c1dba9b39147de4a21853a3e3',
          },
        },
      },
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
