import type { CombinedError } from '@urql/core'
import { computed, reactive } from 'vue'
import type { Ref } from 'vue'

import type { ApiData, BackendError } from '../types/api'

export { getHost, getRootHost, getServiceHref } from '../../node/networking'

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
