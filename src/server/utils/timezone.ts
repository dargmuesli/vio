import type { H3Event } from 'h3'

export const getTimezone = async (event: H3Event) => {
  const timezoneBySsr = event.context.$timezone

  if (timezoneBySsr) return timezoneBySsr

  const timezoneByCookie = getCookie(event, TIMEZONE_COOKIE_NAME)

  if (timezoneByCookie) return timezoneByCookie

  const ip = getRequestIP(event, { xForwardedFor: true })

  if (ip) {
    const timezoneByIpApi = await getTimezoneByIpApi(ip)

    if (timezoneByIpApi) return timezoneByIpApi
  }
}

export const getTimezoneByIpApi = async (ip: string) => {
  if (isTestingServer()) return // TODO: mock

  const ipApiResult = await $fetch<{ timezone: string }>(
    `http://ip-api.com/json/${ip}`,
  ).catch(() => {})

  if (ipApiResult) {
    return ipApiResult.timezone
  }
}
