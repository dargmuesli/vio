import type { H3Event } from 'h3'

export const useGetServiceHref = ({ event }: { event?: H3Event } = {}) => {
  const host = useHost({ event })
  const runtimeConfig = useRuntimeConfig()
  const isTesting = useIsTesting()

  return ({
    allowInternal = true,
    name,
    path,
  }: {
    allowInternal?: boolean
    name: ServiceName
    path?: string
  }) =>
    getServiceHref({
      allowInternal,
      host,
      isServer: import.meta.server,
      isTesting,
      name,
      path,
      stagingHost: runtimeConfig.public.vio.stagingHost,
    })
}

export const useHost = ({ event }: { event?: H3Event } = {}) => {
  const { siteUrlTyped: siteUrl } = useSiteUrl()
  const host = event ? getHost(event) : siteUrl.host

  if (!host) throw new Error('Host is not given!')

  return host
}
