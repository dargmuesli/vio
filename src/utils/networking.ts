import { IncomingMessage } from 'node:http'

import { CombinedError } from '@urql/core'
import { H3Event, getCookie } from 'h3'

import { ofetch } from 'ofetch'
import { Ref } from 'vue'

import type { BackendError } from '../types/api'
import { TIMEZONE_COOKIE_NAME } from './constants'

export const getApiMeta = (
  queries?: {
    error: Ref<CombinedError | undefined>
    fetching: Ref<boolean>
  }[],
) => ({
  errors: queries
    ? queries.reduce((p, c) => {
        if (c.error.value) {
          return [...p, c.error.value]
        } else {
          return p
        }
      }, [] as BackendError[])
    : [],
  isFetching: queries
    ? queries.reduce((p, c) => p || c.fetching.value, false)
    : false,
})

export const getCombinedErrorMessages = (
  errors: BackendError[],
  pgIds?: Record<string, string>,
) => {
  const errorMessages: string[] = []

  for (const error of errors) {
    if ('errcode' in error) {
      const translation = pgIds && pgIds[`postgres${error.errcode}`]

      if (translation) {
        errorMessages.push(translation)
      } else {
        errorMessages.push(error.message)
      }
    } else {
      const combinedError = error

      if (combinedError.networkError) {
        errorMessages.push(combinedError.message)
      }

      for (const graphqlError of combinedError.graphQLErrors) {
        errorMessages.push(graphqlError.message)
      }
    }
  }

  return errorMessages
}

export const getCspAsString = (csp = {} as Record<string, Array<string>>) =>
  Object.keys(csp).reduce((p, c) => (p += `${c} ${csp[c].join(' ')};`), '')

export const getDomainTldPort = (host: string) => {
  const hostParts = host.split('.')

  if (/^localhost(:[0-9]+)?$/.test(hostParts[hostParts.length - 1]))
    return hostParts[hostParts.length - 1]

  if (hostParts.length === 1) throw new Error('Host is too short!')

  return `${hostParts[hostParts.length - 2]}.${hostParts[hostParts.length - 1]}`
}

export const getHost = (req: IncomingMessage) => {
  if (!req.headers.host) throw new Error('Host header is not given!')

  return req.headers.host
}

export const getServiceHref = ({
  host,
  isSsr = true,
  name,
  port,
  stagingHost,
}: {
  host: string
  isSsr?: boolean
  name?: string
  port?: number
  stagingHost?: string
}) => {
  const nameSubdomain = name?.replaceAll('_', '-')
  const nameSubdomainString = nameSubdomain ? `${nameSubdomain}.` : ''
  const portString = port ? `:${port}` : ''

  if (stagingHost) {
    return `https://${nameSubdomainString}${stagingHost}`
  } else if (isSsr && process.server) {
    return `http://${name}${portString}`
  } else {
    return `https://${nameSubdomainString}${getDomainTldPort(host)}`
  }
}

export const getTimezone = async (event: H3Event) => {
  const timezoneCookie = getCookie(event, TIMEZONE_COOKIE_NAME)

  if (timezoneCookie) {
    return timezoneCookie
  }

  if (event.node.req.headers['x-real-ip']) {
    const ipApiResult = await ofetch(
      `http://ip-api.com/json/${event.node.req.headers['x-real-ip']}`,
    ).catch(() => {})

    if (ipApiResult) {
      return ipApiResult.timezone
    }
  }

  return undefined
}
