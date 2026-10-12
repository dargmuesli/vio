export const useSiteUrl = () => {
  const runtimeConfig = useRuntimeConfig()
  const siteUrl = runtimeConfig.public.i18n.baseUrl

  // consumers see the i18n module's wider type, which also allows a resolver function
  if (typeof siteUrl !== 'string') {
    throw new Error('`runtimeConfig.public.i18n.baseUrl` must be a string')
  }

  return {
    siteUrl,
    siteUrlTyped: new URL(siteUrl),
  }
}
