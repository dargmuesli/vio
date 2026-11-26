import { getCookie, useRuntimeConfig, type RequestEvent } from 'nuxt/server'

import { TESTING_COOKIE_NAME } from '../../shared/utils/constants'

export const useIsTesting = ({
  event,
  isCookieEnabled = true,
}: {
  event?: RequestEvent
  isCookieEnabled?: boolean
} = {}) => {
  const runtimeConfig = useRuntimeConfig()

  return getIsTesting({ event, isCookieEnabled, runtimeConfig })
}

export const getIsTesting = ({
  event,
  isCookieEnabled,
  runtimeConfig,
}: {
  event?: RequestEvent
  isCookieEnabled?: boolean
  runtimeConfig: ReturnType<typeof useRuntimeConfig>
}) => {
  const isTestingByRuntimeConfig = runtimeConfig.public.vio.isTesting
  if (isTestingByRuntimeConfig) return true

  if (isCookieEnabled && event) {
    const isTestingByCookie = !!getCookie(event, TESTING_COOKIE_NAME)
    if (isTestingByCookie) return true
  }
}
