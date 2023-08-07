import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  I18N_COOKIE_NAME,
  I18N_MODULE_CONFIG,
  TIMEZONE_COOKIE_NAME,
  SITE_NAME,
} from './utils/constants'

const currentDir = dirname(fileURLToPath(import.meta.url))

const BASE_URL =
  'https://' +
  (process.env.NUXT_PUBLIC_STACK_DOMAIN ||
    `${process.env.HOST || 'localhost'}:${
      !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
        ? '3000'
        : '3001'
    }`)

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  alias: {
    sweetalert2: 'sweetalert2', // TODO: remove (https://github.com/nuxt/nuxt/issues/19426)
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en', // fallback data to prevent invalid html at generation
      },
      titleTemplate: `%s`,
      title: SITE_NAME, // fallback data to prevent invalid html at generation
    },
    pageTransition: {
      name: 'layout',
    },
  },
  modules: [
    '@dargmuesli/nuxt-cookie-control',
    '@nuxtjs/color-mode',
    '@nuxtjs/html-validator',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-seo-kit-module',
  ],
  nitro: {
    compressPublicAssets: true,
  },
  runtimeConfig: {
    public: {
      googleAnalyticsId: '', // set via environment variable `NUXT_PUBLIC_GOOGLE_ANALYTICS_ID` only
      i18n: {
        baseUrl: BASE_URL,
      },
      isInProduction: process.env.NODE_ENV === 'production',
      isTesting: false,
      stagingHost:
        process.env.NODE_ENV !== 'production' &&
        !process.env.NUXT_PUBLIC_STACK_DOMAIN
          ? 'jonas-thelemann.de'
          : undefined,
    },
  },
  typescript: {
    shim: false,
    strict: true,
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
            de: 'Dieser Cookie von uns speichert die Sprache, in der diese Webseite angezeigt wird.',
            en: "This cookie of ours stores the language that's used to display this website.",
          },
          id: 'l',
          name: {
            de: 'Sprache',
            en: 'Language',
          },
          targetCookieIds: [I18N_COOKIE_NAME],
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
    // failOnError: true,
    logLevel: 'warning',
  },
  i18n: {
    ...I18N_MODULE_CONFIG,
    defaultLocale: 'en', // Must be set for the default prefix_except_default prefix strategy.
    detectBrowserLanguage: {
      cookieKey: I18N_COOKIE_NAME,
      cookieSecure: true,
    },
  },
  linkChecker: {
    failOnError: false, // TODO: enable (https://github.com/harlan-zw/nuxt-seo-kit/issues/4#issuecomment-1434522124)
  },
  seoKit: {
    splash: false,
  },
  site: {
    debug: process.env.NODE_ENV === 'development',
    name: SITE_NAME,
    url: BASE_URL,
  },
  sitemap: {
    exclude: ['/api/**'],
  },
  tailwindcss: {
    cssPath: join(currentDir, './assets/css/tailwind.css'),
  },
})
