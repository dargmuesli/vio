export const useGetServiceHref = () => {
  const host = useHost()
  const runtimeConfig = useRuntimeConfig()
  const isTesting = useIsTesting()

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

export const useHost = () => {
  const { ssrContext } = useNuxtApp()
  const host = ssrContext ? getHost(ssrContext.event) : location.host

  if (!host) throw new Error('Host is not given!')

  return host
}

export const useServiceFetch = (
  options: Parameters<ReturnType<typeof useGetServiceHref>>[0],
) => {
  const getServiceHref = useGetServiceHref()

  return $fetch.create({
    baseURL: getServiceHref(options),
  })
}
