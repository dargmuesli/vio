export const useAppLayout = () => {
  const appConfig = useAppConfig()

  useHead({
    ...useLocaleHead({ addSeoAttributes: true }).value,
    bodyAttrs: {
      class:
        'bg-background-bright dark:bg-background-dark font-sans text-text-dark dark:text-text-bright',
    },
    ...(appConfig.themeColor
      ? {
          meta: [
            {
              content: appConfig.themeColor,
              name: 'msapplication-TileColor',
            },
            {
              content: appConfig.themeColor,
              name: 'theme-color',
            },
          ],
        }
      : {}),
  })

  if (appConfig.seoMeta) {
    useSeoMeta(appConfig.seoMeta)
  }
}
