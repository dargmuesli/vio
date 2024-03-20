import type { Dayjs } from 'dayjs'

export const useDateTime = () => {
  const { $dayjs, ssrContext } = useNuxtApp()
  const timezoneCookie = useCookie(TIMEZONE_COOKIE_NAME)

  const timezoneHeader = ssrContext?.event.node.req.headers[TIMEZONE_HEADER_KEY]
  const timezone =
    timezoneHeader && !Array.isArray(timezoneHeader)
      ? timezoneHeader
      : timezoneCookie.value || undefined

  return (dateTime?: string | number | Dayjs | Date | null) =>
    $dayjs(dateTime).tz(timezone)
}
