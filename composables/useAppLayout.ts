export const useAppLayout = () => {
  const appConfig = useAppConfig()
  const head = useLocaleHead({ addSeoAttributes: true })

  useHead(head.value)
  useHead({
    bodyAttrs: {
      class:
        'bg-background-bright dark:bg-background-dark font-sans text-text-dark dark:text-text-bright',
    },
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
  })
  useSeoMeta(appConfig.seoMeta)
}
