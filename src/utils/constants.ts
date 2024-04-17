import { helpers } from '@vuelidate/validators'

export const SITE_NAME = 'Vio'

export const SITE_URL =
  process.env.SITE_URL ||
  process.env.NUXT_PUBLIC_SITE_URL ||
  (process.env.HOST ? 'https' : 'http') +
    '://' +
    (process.env.HOST ||
      `${process.env.HOST || 'localhost'}:${process.env.PORT || '3000'}`)
export const CACHE_VERSION = 'bOXMwoKlJr'
export const COOKIE_PREFIX = SITE_NAME.toLocaleLowerCase()
export const COOKIE_SEPARATOR = '_'
export const FETCH_RETRY_AMOUNT = 3
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
