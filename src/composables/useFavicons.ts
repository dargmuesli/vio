export const useFavicons = () => {
  const appConfig = useAppConfig()

  useServerHeadSafe({
    link: [
      {
        href: `/assets/static/favicon/site.webmanifest?v=${CACHE_VERSION}`,
        rel: 'manifest',
      },
      {
        color: appConfig.vio.themeColor,
        href: `/assets/static/favicon/safari-pinned-tab.svg?v=${CACHE_VERSION}`,
        rel: 'mask-icon',
      },
      {
        href: `/favicon.ico?v=${CACHE_VERSION}`,
        rel: 'shortcut icon',
      },
    ],
  })
}
