export const useAppLayout = () => {
  const appConfig = useAppConfig()
  const siteConfig = useSiteConfig()

  useHeadSafe({
    ...useLocaleHead({ addSeoAttributes: true }).value,
    bodyAttrs: {
      class:
        'bg-background-bright dark:bg-background-dark font-sans text-text-dark dark:text-text-bright',
    },
  }) // TODO: use `useServerHeadSafe` (https://github.com/harlan-zw/nuxt-seo-kit/issues/87)

  useServerSeoMeta({
    ...(appConfig.vio.themeColor
      ? {
          msapplicationTileColor: appConfig.vio.themeColor,
          themeColor: appConfig.vio.themeColor,
        }
      : {}),
    titleTemplate: (titleChunk) => {
      return titleChunk && titleChunk !== siteConfig.name
        ? `${titleChunk} ${siteConfig.titleSeparator} ${siteConfig.name}`
        : siteConfig.name
    },
    ...(appConfig.vio.seoMeta ? appConfig.vio.seoMeta : {}),
  })
}
