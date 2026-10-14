import type { H3Event } from 'h3'

// `useEvent()` throws whenever there is no Nitro request context, which is the case for everything that runs at startup, such as a Nitro plugin's hooks.
// Testing detection still works there through the runtime config, so fall back to no event rather than letting that error escape.
const tryUseEvent = () => {
  try {
    return useEvent()
  } catch {
    return undefined
  }
}

export const useIsTesting = ({
  isCookieEnabled = true,
}:
  | {
      isCookieEnabled?: boolean
    }
  | undefined = {}) => {
  const event = tryUseEvent()
  const runtimeConfig = useRuntimeConfig()

  return getIsTesting({ event, isCookieEnabled, runtimeConfig })
}

export const getIsTesting = ({
  event,
  isCookieEnabled,
  runtimeConfig,
}: {
  event?: H3Event
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
