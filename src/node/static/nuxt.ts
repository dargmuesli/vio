import type { defineNuxtConfig } from 'nuxt/config'

import { IS_IN_FRONTEND_DEVELOPMENT } from './'

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
      locales: [
        {
          code: 'en' as const,
          file: 'en.json',
          language: 'en', // could be `en-US` is multiple `en` locales are differentiated
          name: 'English', // Will be used as catchall locale by default.
        },
        {
          code: 'de' as const,
          file: 'de.json',
          language: 'de', // could be `de-DE` is multiple `de` locales are differentiated
          name: 'Deutsch',
        },
      ],
    },
    site: {
      name: siteName,
    },
  }) as Parameters<typeof defineNuxtConfig>[0]
