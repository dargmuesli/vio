export default defineI18nLocaleDetector((event, config) => {
  const query = tryQueryLocale(event, { lang: '' }) // disable locale default value with `lang` option

  if (query) {
    return query.toString()
  }

  const cookie = tryCookieLocale(event, { lang: '', name: 'i18n_locale' }) // disable locale default value with `lang` option

  if (cookie) {
    return cookie.toString()
  }

  const header = tryHeaderLocale(event, { lang: '' }) // disable locale default value with `lang` option

  if (header) {
    return header.toString()
  }

  return config.defaultLocale
})
