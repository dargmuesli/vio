import type { CombinedError } from '@urql/core'
import type { H3Event } from 'h3'
import { computed, reactive } from 'vue'
import type { Ref } from 'vue'

import { SITE_URL_TYPED } from '../../node/static'
import type { ApiData, BackendError } from '../types/api'

export const getApiDataDefault = (): ApiData =>
  computed(() =>
    reactive({
      data: undefined,
      ...getApiMeta(),
    }),
  )

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

export const getRootHost = (host: string) => {
  const hostParts = host.split('.')
  const hostPartsLast = hostParts[hostParts.length - 1]

  if (hostPartsLast && /^localhost(:[0-9]+)?$/.test(hostPartsLast))
    return hostPartsLast

  if (hostParts.length === 1) return hostParts[0]

  return `${hostParts[hostParts.length - 2]}.${hostPartsLast}`
}

export const getHost = (event: H3Event) => {
  const host = event.node.req.headers.host

  if (!host) throw new Error('Host header is not given!')

  return host
}

export const getServiceHref = ({
  host,
  isSsr = true,
  isTesting,
  name,
  port,
  stagingHost,
}: {
  host?: string
  isSsr?: boolean
  isTesting?: boolean
  name: string
  port?: number
  stagingHost?: string
}) => {
  const nameSubdomain =
    name !== VIO_SITE_NAME ? name?.replaceAll('_', '-') : undefined
  const nameSubdomainString = nameSubdomain ? `${nameSubdomain}.` : ''
  const portString = port ? `:${port}` : ''

  if (isTesting) {
    return `${SITE_URL_TYPED.protocol}//${nameSubdomainString}${SITE_URL_TYPED.host}`
  }

  if (stagingHost) {
    return `https://${nameSubdomainString}${stagingHost}`
  }

  if (import.meta.server && isSsr) {
    return `http://${name}${portString}`
  }

  if (host) {
    return `https://${nameSubdomainString}${host}`
  }

  throw new Error('Could not get service href!')
}
