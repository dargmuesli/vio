export const useGetServiceHref = () => {
  const host = useHost()
  const appConfig = useAppConfig()

  return ({
    isSsr = true,
    name,
    port,
  }: {
    isSsr?: boolean
    name?: string
    port?: number
  }) =>
    getServiceHref({
      host,
      isSsr,
      name,
      port,
      stagingHost: appConfig.vio.stagingHost,
    })
}
