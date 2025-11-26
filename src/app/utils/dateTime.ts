export const getTimezone = () =>
  useNuxtApp().ssrContext?.event.context.$timezone ||
  useCookie(TIMEZONE_COOKIE_NAME, {
    httpOnly: false,
    sameSite: 'strict',
    secure: !import.meta.dev,
  }).value ||
  (import.meta.client
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : undefined)
