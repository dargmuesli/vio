export const useAppLayout = () => {
  const appConfig = useAppConfig()
  const siteConfig = useSiteConfig()

  useServerHeadSafe({
    ...useLocaleHead({ addDirAttribute: true, addSeoAttributes: true }).value,
    bodyAttrs: {
      class:
        'bg-background-bright dark:bg-background-dark font-sans text-text-dark dark:text-text-bright',
    },
  })

  useServerSeoMeta({
    titleTemplate: (title) =>
      title && title !== siteConfig.name
        ? `${title} ${siteConfig.titleSeparator} ${siteConfig.name}`
        : siteConfig.name,
  })

  if (appConfig.vio.seoMeta) {
    useServerSeoMeta(appConfig.vio.seoMeta)
  }

  if (appConfig.vio.themeColor) {
    useServerSeoMeta({
      msapplicationTileColor: appConfig.vio.themeColor,
      themeColor: appConfig.vio.themeColor,
    })
  }
}
