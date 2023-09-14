import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defu } from 'defu'

import {
  SITE_URL,
  I18N_MODULE_CONFIG,
  SITE_NAME,
  TIMEZONE_COOKIE_NAME,
  VIO_NUXT_BASE_CONFIG,
} from './utils/constants'

const currentDir = dirname(fileURLToPath(import.meta.url))

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig(
  defu(
    {
      alias: {
        clipboard: 'clipboard',
        dayjs: 'dayjs',
        sweetalert2: 'sweetalert2',
      }, // TODO: remove (https://github.com/nuxt/nuxt/issues/19426)
      app: {
        head: {
          htmlAttrs: {
            lang: 'en', // fallback data to prevent invalid html at generation
          },
          titleTemplate: '%s', // fully set in `composables/useAppLayout.ts`
        },
        pageTransition: {
          name: 'layout',
        },
      },
      devtools: {
        enabled:
          process.env.NODE_ENV === 'development' &&
          !process.env.NUXT_PUBLIC_VIO_IS_TESTING,
        timeline: {
          enabled: true,
        },
      },
      modules: [
        '@dargmuesli/nuxt-cookie-control',
        '@nuxt/image',
        '@nuxtjs/color-mode',
        '@nuxtjs/html-validator',
        '@nuxtjs/i18n',
        '@nuxtjs/tailwindcss',
        '@nuxtseo/module',
        '@pinia/nuxt',
      ],
      nitro: {
        compressPublicAssets: true,
      },
      runtimeConfig: {
        public: {
          vio: {
            googleAnalyticsId: '',
            isInProduction: process.env.NODE_ENV === 'production',
            isTesting: false,
          },
        },
      },
      typescript: {
        shim: false,
        strict: true,
        tsConfig: {
          compilerOptions: {
            esModuleInterop: true,
            // moduleResolution: 'bundler',
            // noErrorTruncation: true,
          },
        },
      },

      // modules
      colorMode: {
        classSuffix: '',
      },
      cookieControl: {
        cookies: {
          necessary: [
            {
              description: {
                de: 'Dieser Cookie von uns speichert die Einstellungen, die in diesem Dialog getroffen werden.',
                en: 'This cookie of ours stores the settings made in this dialog.',
              },
              id: 'c',
              name: {
                de: 'Cookie-Präferenzen',
                en: 'Cookie Preferences',
              },
              targetCookieIds: ['ncc_c', 'ncc_e'],
            },
            {
              description: {
                de: 'Dieser Cookie von uns speichert die Zeitzone, in der sich das Gerät zu befinden scheint.',
                en: 'This cookie of ours saves the timezone in which the device appears to be located.',
              },
              id: 't',
              name: {
                de: 'Zeitzone',
                en: 'Timezone',
              },
              targetCookieIds: [TIMEZONE_COOKIE_NAME],
            },
          ],
          optional: [
            {
              description: {
                de: 'Die Cookies vom Drittanbieter Google ermöglichen die Analyse von Nutzerverhalten. Diese Analyse hilft uns unsere Dienste zu verbessern, indem wir verstehen, wie diese Webseite genutzt wird.',
                en: 'The third-party cookies by Google enable the analysis of user behavior. This analysis helps us to improve our services by understanding how this website is used.',
              },
              id: 'ga',
              links: {
                'https://policies.google.com/privacy': 'Google Privacy Policy',
                'https://policies.google.com/terms': 'Google Terms of Service',
              },
              name: 'Analytics',
              targetCookieIds: ['_ga', '_ga_K4R41W62BR'],
            },
          ],
        },
        locales: ['en', 'de'],
      },
      htmlValidator: {
        failOnError: true,
        logLevel: 'warning',
      },
      i18n: {
        baseUrl: SITE_URL,
        detectBrowserLanguage: false,
      },
      linkChecker: {
        failOnError: true,
      },
      seo: {
        splash: false,
      },
      site: {
        debug: process.env.NODE_ENV === 'development',
        url: SITE_URL,
      },
      sitemap: {
        exclude: I18N_MODULE_CONFIG.locales.map(
          (locale) =>
            `/${locale.code !== 'en' ? `${locale.code}/` : ''}api/pages/**`,
        ),
      },
      tailwindcss: {
        cssPath: join(currentDir, './assets/css/tailwind.css'),
      },
    },
    VIO_NUXT_BASE_CONFIG({
      defaultLocale: 'en',
      siteName: SITE_NAME,
      stagingHost: 'localhost:3000',
    }),
  ),
)
