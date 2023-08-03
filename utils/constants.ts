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
export const SITE_NAME = 'Vio'
