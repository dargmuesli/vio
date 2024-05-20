import { helpers } from '@vuelidate/validators'
import { defu } from 'defu'

export const SITE_NAME = 'Vio'

export const SITE_URL =
  process.env.SITE_URL ||
  process.env.NUXT_PUBLIC_SITE_URL ||
  `https://${process.env.HOST || 'localhost'}:${process.env.PORT || '3000'}`
export const CACHE_VERSION = 'bOXMwoKlJr'
export const COOKIE_PREFIX = SITE_NAME.toLocaleLowerCase()
export const COOKIE_SEPARATOR = '_'
export const FETCH_RETRY_AMOUNT = 3
export const GET_CSP = (siteUrl: string) =>
  defu(
    {
      // Cloudflare
      ...(process.env.NODE_ENV === 'production'
        ? {
            'connect-src': ['https://cloudflareinsights.com'],
            'script-src-elem': ['https://static.cloudflareinsights.com'],
          }
        : {}),
    },
    {
      // Google Analytics 4 (https://developers.google.com/tag-platform/tag-manager/web/csp)
      'connect-src': [
        'https://*.analytics.google.com',
        'https://*.google-analytics.com',
        'https://*.googletagmanager.com',
      ],
      'img-src': [
        'https://*.google-analytics.com',
        'https://*.googletagmanager.com',
      ],
      'script-src-elem': ['https://*.googletagmanager.com'],
    },
    {
      // vio
      'manifest-src': [`${siteUrl}/site.webmanifest`],
      // 'script-src-elem': [
      //   'https://polyfill.io/v3/polyfill.min.js', // ESLint plugin compat
      // ],
    },
    {
      // nuxt-link-checker
      ...(process.env.NODE_ENV === 'development'
        ? {
            'connect-src': [`${siteUrl}/api/__link_checker__/inspect`],
          }
        : {}),
    },
    {
      // nuxt-og-image
      ...(process.env.NODE_ENV === 'development'
        ? {
            'connect-src': [`${siteUrl}/__og-image__/`],
          }
        : {}),
    },
    {
      // nuxt-schema-org
      ...(process.env.NODE_ENV === 'development'
        ? {
            'connect-src': [`${siteUrl}/__schema-org__/debug.json`],
          }
        : {}),
    },
    {
      // nuxt-simple-robots
      ...(process.env.NODE_ENV === 'development'
        ? {
            'connect-src': [
              `${siteUrl}/__robots__/debug.json`,
              `${siteUrl}/__robots__/debug-path.json`,
            ],
          }
        : {}),
    },
    {
      // nuxt-simple-sitemap
      ...(process.env.NODE_ENV === 'development'
        ? {
            'connect-src': [`${siteUrl}/__sitemap__/debug.json`],
          }
        : {}),
    },
    {
      // nuxt-site-config
      ...(process.env.NODE_ENV === 'development'
        ? {
            'connect-src': [`${siteUrl}/__site-config__/debug.json`],
          }
        : {}),
    },
    {
      // nuxt
      'connect-src': [
        "'self'", // e.g. `/_nuxt/builds/meta/`, `/_payload.json`, `/privacy-policy/_payload.json`
        // ...(process.env.NODE_ENV === 'development'
        //   ? [
        //       'http://localhost:3000/_nuxt/', // hot reload
        //       'https://localhost:3000/_nuxt/', // hot reload
        //       'ws://localhost:3000/_nuxt/', // hot reload
        //       'wss://localhost:3000/_nuxt/', // hot reload
        //     ] // TODO: generalize for different ports
        //   : []),
      ],
      'img-src': [
        "'self'", // e.g. favicon
        'data:', // external link icon
      ],
      'script-src-elem': [
        "'nonce-{{nonce}}'",
        `${siteUrl}/_nuxt/`, // bundle
      ],
      'style-src': [
        "'nonce-{{nonce}}'",
        "'self'", // TODO: `${siteUrl}/_nuxt/`, // bundle
      ], // TODO: use `style-src-elem` once Playwright WebKit supports it
    },
  )
export const GTAG_COOKIE_ID = 'ga'
export const I18N_MODULE_CONFIG = {
  langDir: 'locales',
  lazy: true,
  locales: [
    {
      code: 'en',
      file: 'en.json',
      name: 'English',
      iso: 'en', // Will be used as catchall locale by default.
    },
    {
      code: 'de',
      file: 'de.json',
      name: 'Deutsch',
      iso: 'de',
    },
  ],
}
export const I18N_VUE_CONFIG = {
  fallbackWarn: false, // covered by linting
  missingWarn: false, // covered by linting
}
export const JWT_NAME = () =>
  `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}jwt`
export const POLYFILLS = [
  // 'Promise', // op_mini
]
export const REGEX_UUID =
  /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/
export const TIMEZONE_COOKIE_NAME = [COOKIE_PREFIX, 'tz'].join(COOKIE_SEPARATOR)
export const TIMEZONE_HEADER_KEY = `X-${SITE_NAME}-Timezone`
export const TITLE_TEMPLATE = ({
  siteName,
  title,
}: {
  siteName: string
  title?: string | null
}) => (title && title !== siteName ? `${title} · ${siteName}` : siteName)
export const VERIFICATION_FORMAT_UUID = helpers.regex(REGEX_UUID)
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
          ...(stagingHost
            ? {
                stagingHost:
                  process.env.NODE_ENV !== 'production' &&
                  !process.env.NUXT_PUBLIC_SITE_URL
                    ? stagingHost
                    : undefined,
              }
            : {}),
        },
      },
    },

    // modules
    i18n: {
      ...I18N_MODULE_CONFIG, // `langDir`, `lazy` and `locales` must be configured to extend a layer having lazy-loaded translations (https://v8.i18n.nuxtjs.org/guide/layers#locales)
    },
    site: {
      name: siteName,
    },
  }) as Parameters<typeof defineNuxtConfig>[0]
