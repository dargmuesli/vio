export const SITE_NAME = 'Vio'

export const BASE_URL =
  (process.env.NUXT_PUBLIC_STACK_DOMAIN ? 'https' : 'http') +
  '://' +
  (process.env.NUXT_PUBLIC_STACK_DOMAIN ||
    `${process.env.HOST || 'localhost'}:${
      !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
        ? '3000'
        : '3001'
    }`)
export const CACHE_VERSION = 'bOXMwoKlJr'
export const COOKIE_PREFIX = SITE_NAME.toLocaleLowerCase()
export const COOKIE_SEPARATOR = '_'
export const FETCH_RETRY_AMOUNT = 3
export const I18N_COOKIE_NAME = 'i18n_r'
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
} // `langDir`, `lazy` and `locales` must be configured to extend a layer having lazy-loaded translations (https://v8.i18n.nuxtjs.org/guide/layers#locales)
export const I18N_VUE_CONFIG = {
  fallbackWarn: false, // covered by linting
  missingWarn: false, // covered by linting
}
export const TIMEZONE_COOKIE_NAME = [COOKIE_PREFIX, 'tz'].join(COOKIE_SEPARATOR)
export const TIMEZONE_HEADER_KEY = `X-${SITE_NAME}-Timezone`
export const VALIDATION_SUGGESTION_TITLE_LENGTH_MAXIMUM = 300
export const VIO_NUXT_BASE_CONFIG = ({
  baseUrl,
  siteName,
  stagingHost,
}: {
  baseUrl?: string
  siteName: string
  stagingHost?: string
}) =>
  ({
    app: {
      head: {
        title: SITE_NAME, // fallback data to prevent invalid html at generation
      },
    },
    runtimeConfig: {
      public: {
        i18n: {
          ...(baseUrl ? { baseUrl } : {}),
        },
        vio: {
          ...(stagingHost
            ? {
                stagingHost:
                  process.env.NODE_ENV !== 'production' &&
                  !process.env.NUXT_PUBLIC_STACK_DOMAIN
                    ? stagingHost
                    : undefined,
              }
            : {}),
        },
      },
    },

    // modules
    i18n: I18N_MODULE_CONFIG, // `langDir`, `lazy` and `locales` must be configured to extend a layer having lazy-loaded translations (https://v8.i18n.nuxtjs.org/guide/layers#locales)
    site: {
      name: siteName,
      ...(baseUrl ? { url: baseUrl } : {}),
    },
  }) as Parameters<typeof defineNuxtConfig>[0]
