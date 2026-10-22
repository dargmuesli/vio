import { SERVICES } from './services'
import type { Service, ServiceName } from './services'
import { SITE_URL_TYPED } from './static'

export const getHost = (event: { headers: Headers }) => {
  const host = event.headers.get('host')

  if (!host) throw new Error('Host header is not given!')

  return host
}

// derives the origins this project itself talks to, so Sentry's trace context is only propagated
// to its own services and never to third parties
export const getTracePropagationTargets = ({
  baseUrl,
  services = SERVICES,
}: {
  baseUrl?: string
  services?: Record<string, Service>
}): string[] => {
  if (!baseUrl) return []

  let base: URL
  try {
    base = new URL(baseUrl)
  } catch {
    return []
  }

  const targets = [base.origin]

  for (const [name, service] of Object.entries(services)) {
    if (!service.hasSubdomain) continue

    targets.push(
      `${base.protocol}//${name.replaceAll('_', '-')}.${getRootHost(base.hostname)}`,
    )
  }

  return targets
}

export const getRootHost = (host: string) => {
  const hostParts = host.split('.')
  const hostPartsLast = hostParts[hostParts.length - 1]

  if (hostParts.length === 1) return hostParts[0]

  // only a single subdomain directly on bare localhost collapses to the root; e.g. app.localhost must keep its "app" label
  if (
    hostParts.length === 2 &&
    hostPartsLast &&
    /^localhost(:[0-9]+)?$/.test(hostPartsLast)
  )
    return hostPartsLast

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
  services = SERVICES,
  stagingHost,
}: {
  allowInternal?: boolean
  host?: string
  isServer: boolean
  isTesting?: boolean
  name: ServiceName
  path?: string
  protocol?: string
  services?: Record<string, Service>
  stagingHost?: string
}) => {
  const service = services[name]

  if (!service) throw new Error(`Service "${name}" is not registered!`)

  const { hasSubdomain, port } = service
  const nameSubdomainString = `${name.replaceAll('_', '-')}.`
  const pathString = path ? `/${path.replace(/^\/+/, '')}` : ''

  const assertHasSubdomain = () => {
    if (!hasSubdomain)
      throw new Error(`Service "${name}" has no public subdomain!`)
  }

  if (isTesting) {
    assertHasSubdomain()

    return `${protocol}//${nameSubdomainString}${SITE_URL_TYPED.host}${pathString}`
  }

  if (stagingHost) {
    assertHasSubdomain()

    return `${protocol}//${nameSubdomainString}${stagingHost}${pathString}`
  }

  if (isServer && allowInternal) {
    return `http://${name}:${port}${pathString}`
  }

  if (host) {
    assertHasSubdomain()

    return `${protocol}//${nameSubdomainString}${getRootHost(host)}${pathString}`
  }

  throw new Error('Could not get service href!')
}
