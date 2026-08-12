import type { H3Event } from 'h3'

import { SERVICES } from './services'
import type { ServiceName } from './services'
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
  allowInternal = true,
  host,
  isServer,
  isTesting,
  name,
  path,
  protocol = SITE_URL_TYPED.protocol,
  stagingHost,
}: {
  allowInternal?: boolean
  host?: string
  isServer: boolean
  isTesting?: boolean
  name: ServiceName
  path?: string
  protocol?: string
  stagingHost?: string
}) => {
  const { hasSubdomain, port } = SERVICES[name]
  const nameSubdomainString = `${name.replaceAll('_', '-')}.`
  const pathString = path ? `/${path.replace(/^\/+/, '')}` : ''

  if (isTesting) {
    return `${protocol}//${nameSubdomainString}${SITE_URL_TYPED.host}${pathString}`
  }

  if (stagingHost) {
    return `${protocol}//${nameSubdomainString}${getRootHost(stagingHost)}${pathString}`
  }

  if (isServer && allowInternal) {
    return `http://${name}:${port}${pathString}`
  }

  if (host) {
    if (!hasSubdomain)
      throw new Error(`Service "${name}" has no public subdomain!`)

    return `${protocol}//${nameSubdomainString}${getRootHost(host)}${pathString}`
  }

  throw new Error('Could not get service href!')
}
