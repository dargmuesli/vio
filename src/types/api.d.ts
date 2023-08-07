export type BackendError = CombinedError | { errcode: string; message: string }

export type ApiData = ComputedRef<{
  data?: Object
  errors: BackendError[]
  isFetching: boolean
}>
