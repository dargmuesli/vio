import {
  getRequestHost,
  useRuntimeConfig,
  type RequestEvent,
} from 'nuxt/server'

import { getServiceHref } from '../../node/networking'
import type { ServiceName } from '../../node/services'
import { useSiteUrl } from './site'
import { useIsTesting } from './testing'

export const useGetServiceHref = ({ event }: { event?: RequestEvent } = {}) => {
  const host = useHost({ event })
  const runtimeConfig = useRuntimeConfig()
  const isTesting = useIsTesting({ event })

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
      services: runtimeConfig.public.vio.services,
      stagingHost: runtimeConfig.public.vio.stagingHost,
    })
}

export const useHost = ({ event }: { event?: RequestEvent } = {}) => {
  const { siteUrlTyped: siteUrl } = useSiteUrl()
  const host = event ? getRequestHost(event) : siteUrl.host

  if (!host) throw new Error('Host is not given!')

  return host
}
