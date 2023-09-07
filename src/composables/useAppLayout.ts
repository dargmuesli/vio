export const useAppLayout = () => {
  const appConfig = useAppConfig()
  const siteConfig = useSiteConfig()

  // TODO: replace with `useServerHeadSafe`
  useHeadSafe({
    ...useLocaleHead({ addDirAttribute: true, addSeoAttributes: true }).value,
    bodyAttrs: {
      class:
        'bg-background-bright dark:bg-background-dark font-sans text-text-dark dark:text-text-bright',
    },
  })

  // TODO: convert to `useServerHeadSafe` (https://github.com/harlan-zw/nuxt-seo-kit/issues/98)
  useSeoMeta({
    titleTemplate: (title) =>
      title && title !== siteConfig.name
        ? `${title} ${siteConfig.titleSeparator} ${siteConfig.name}`
        : siteConfig.name,
  })

  if (appConfig.vio.seoMeta) {
    // TODO: replace with `useServerSeoMeta`
    useSeoMeta(appConfig.vio.seoMeta)
  }

  if (appConfig.vio.themeColor) {
    // TODO: replace with `useServerSeoMeta`
    useSeoMeta({
      msapplicationTileColor: appConfig.vio.themeColor,
      themeColor: appConfig.vio.themeColor,
    })
  }
}
