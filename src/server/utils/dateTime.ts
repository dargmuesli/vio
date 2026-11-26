import { getCookie, getRequestIP, type RequestEvent } from 'nuxt/server'

import { TIMEZONE_COOKIE_NAME } from '../../shared/utils/constants'

export const getTimeZone = async ({
  event,
  isTesting,
}: {
  event: RequestEvent
  isTesting?: boolean
}) => {
  const timeZoneBySsr = event.context.$timeZone

  if (timeZoneBySsr) return timeZoneBySsr

  const timeZoneByCookie = getCookie(event, TIMEZONE_COOKIE_NAME)

  if (timeZoneByCookie) return timeZoneByCookie

  if (!isTesting) {
    const ip = getRequestIP(event, { xForwardedFor: true })

    if (ip) {
      const timeZoneByIpApi = await getTimeZoneByIpApi({ ip })

      if (timeZoneByIpApi) return timeZoneByIpApi
    }
  }
}

export const getTimeZoneByIpApi = async ({ ip }: { ip: string }) => {
  const response = await fetch(`http://geoip:8080/${ip}`).catch(() => {})

  if (!response?.ok) return

  const ipApiResult = (await response.json().catch(() => {})) as
    { timezone?: string } | undefined

  return ipApiResult?.timezone
}
