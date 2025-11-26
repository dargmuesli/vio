export const useTimeZone = () =>
  useNuxtApp().ssrContext?.event.context.$timeZone ||
  useCookie(TIMEZONE_COOKIE_NAME, {
    httpOnly: false,
    sameSite: 'strict',
    secure: true,
  }).value ||
  (import.meta.client
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : undefined)

export const useNow = () => useState(STATE_KEY_NOW, () => new Date())

export const useFromNow = () => {
  const { locale } = useI18n()
  const now = useNow()

  const formatter = new Intl.RelativeTimeFormat(locale.value, {
    numeric: 'auto',
  })

  return (to: Date) => getFromTo(now.value, to, formatter)
}
