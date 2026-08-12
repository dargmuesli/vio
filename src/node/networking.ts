import type { H3Event } from 'h3'

import { VIO_SITE_NAME } from '../shared/utils/constants'
import { SITE_URL_TYPED } from './static'

export const getHost = (event: H3Event) => {
  const host = event.node.req.headers.host

  if (!host) throw new Error('Host header is not given!')

  return host
}

export const getRootHost = (host: string) => {
  const hostParts = host.split('.')
  const hostPartsLast = hostParts[hostParts.length - 1]

  if (hostPartsLast && /^localhost(:[0-9]+)?$/.test(hostPartsLast))
    return hostPartsLast

  if (hostParts.length === 1) return hostParts[0]

  return `${hostParts[hostParts.length - 2]}.${hostPartsLast}`
}

export const getServiceHref = ({
  host,
  isServer,
  isSsr = true,
  isTesting,
  name,
  path,
  port,
  stagingHost,
}: {
  host?: string
  isServer: boolean
  isSsr?: boolean
  isTesting?: boolean
  name: string
  path?: string
  port?: number
  stagingHost?: string
}) => {
  const nameSubdomain =
    name !== VIO_SITE_NAME ? name?.replaceAll('_', '-') : undefined
  const nameSubdomainString = nameSubdomain ? `${nameSubdomain}.` : ''
  const portString = port ? `:${port}` : ''
  const pathString = path ? `/${path.replace(/^\/+/, '')}` : ''

  if (isTesting) {
    return `${SITE_URL_TYPED.protocol}//${nameSubdomainString}${SITE_URL_TYPED.host}${pathString}`
  }

  if (stagingHost) {
    return `https://${nameSubdomainString}${stagingHost}${pathString}`
  }

  if (isServer && isSsr) {
    return `http://${name}${portString}${pathString}`
  }

  if (host) {
    return `https://${nameSubdomainString}${getRootHost(host)}${pathString}`
  }

  throw new Error('Could not get service href!')
}
