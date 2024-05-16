export const useAppLayout = () => {
  const appConfig = useAppConfig()
  const siteConfig = useSiteConfig()

  useServerHeadSafe({
    ...useLocaleHead({ addDirAttribute: true, addSeoAttributes: true }).value,
    bodyAttrs: {
      class:
        'bg-background-bright dark:bg-background-dark text-text-dark dark:text-text-bright',
    },
  })

  // TODO: convert to `useServerHeadSafe` (https://github.com/unjs/unhead/issues/221)
  useServerSeoMeta({
    titleTemplate: (title) =>
      TITLE_TEMPLATE({
        siteName: siteConfig.name,
        title,
      }),
  })

  if (appConfig.vio.themeColor) {
    useServerSeoMeta({
      msapplicationTileColor: appConfig.vio.themeColor,
      themeColor: appConfig.vio.themeColor,
    })
  }
}
