export default defineNuxtPlugin(async (_nuxtApp) => {
  const dayjs = (await import('dayjs')).default

  // workaround for [1]
  const de = (await import('dayjs/locale/de')).default
  // import 'dayjs/locale/de' does not make locale available

  const isSameOrBefore = (await import('dayjs/plugin/isSameOrBefore')).default
  const localizedFormat = (await import('dayjs/plugin/localizedFormat')).default
  const relativeTime = (await import('dayjs/plugin/relativeTime')).default
  const timezone = (await import('dayjs/plugin/timezone')).default
  const utc = (await import('dayjs/plugin/utc')).default

  dayjs.extend(isSameOrBefore)
  dayjs.extend(localizedFormat)
  dayjs.extend(relativeTime)
  dayjs.extend(timezone)
  dayjs.extend(utc)

  // workaround for [1]
  dayjs.locale(de)
  // dayjs.locale(en) makes `format` error

  return {
    provide: {
      dayjs,
    },
  }
})

/*
  [1]
  https://github.com/nuxt/framework/issues/7534#issuecomment-1248596609
  https://github.com/nuxt/framework/issues/7206
  https://github.com/maevsi/maevsi/issues/956
*/
