import type { defineNuxtConfig } from 'nuxt/config'

import { I18N_MODULE_CONFIG, IS_IN_FRONTEND_DEVELOPMENT } from './constants'

export const VIO_NUXT_BASE_CONFIG = ({
  siteName,
  stagingHost,
}: {
  siteName: string
  stagingHost?: string
}) =>
  ({
    app: {
      head: {
        title: siteName, // fallback data to prevent invalid html at generation
      },
    },
    runtimeConfig: {
      public: {
        vio: {
          stagingHost: IS_IN_FRONTEND_DEVELOPMENT ? stagingHost : undefined,
        },
      },
    },

    // modules
    i18n: {
      ...I18N_MODULE_CONFIG, // `lazy` and `locales` must be configured to extend a layer having lazy-loaded translations (https://i18n.nuxtjs.org/docs/guide/layers#locales)
    },
    site: {
      name: siteName,
    },
  }) as Parameters<typeof defineNuxtConfig>[0]
