export const useLoadingDoneIndicator = (id?: string) => {
  const loadingIds = useState<string[]>('loadingIds', () => [])
  const loadingId = id || useId()

  if (!loadingId)
    throw createError({ statusCode: 500, statusMessage: 'Loading id missing!' })

  const loadingIdToAdd = `${import.meta.server ? 'ssr' : 'csr'}_${loadingId}`

  if (loadingIds.value.includes(loadingIdToAdd)) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Loading id already exists!',
    })
  }

  const loadingIdSsr = `ssr_${loadingId}`

  if (import.meta.client && loadingIds.value.includes(loadingIdSsr)) {
    loadingIds.value.splice(loadingIds.value.indexOf(loadingIdSsr), 1)
  }

  loadingIds.value.push(loadingIdToAdd)

  return {
    loadingIds,
    indicateLoadingDone: () => {
      loadingIds.value.splice(loadingIds.value.indexOf(loadingId), 1)
    },
  }
}
