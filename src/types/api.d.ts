import type { CombinedError } from '@urql/core'

export type ApiData = ComputedRef<{
  data?: Object
  errors: BackendError[]
  isFetching: boolean
}>

export type BackendError = CombinedError | { errcode: string; message: string }
