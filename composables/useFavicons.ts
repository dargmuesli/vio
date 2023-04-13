export const useFavicons = () => {
  const appConfig = useAppConfig()

  useHead({
    link: [
      {
        href: '/assets/static/favicon/apple-touch-icon.png?v=bOXMwoKlJr',
        rel: 'apple-touch-icon',
        sizes: '180x180',
      },
      {
        href: '/assets/static/favicon/favicon-16x16.png?v=bOXMwoKlJr',
        rel: 'icon',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        href: '/assets/static/favicon/favicon-32x32.png?v=bOXMwoKlJr',
        rel: 'icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        href: '/favicon.ico',
        rel: 'icon',
        type: 'image/x-icon',
      },
      {
        href: '/assets/static/favicon/site.webmanifest?v=bOXMwoKlJr',
        rel: 'manifest',
      },
      {
        color: appConfig.themeColor,
        href: '/assets/static/favicon/safari-pinned-tab.svg?v=bOXMwoKlJr',
        rel: 'mask-icon',
      },
      {
        href: '/favicon.ico?v=bOXMwoKlJr',
        rel: 'shortcut icon',
      },
    ],
    meta: [
      {
        content: '/assets/static/favicon/browserconfig.xml?v=bOXMwoKlJr',
        name: 'msapplication-config',
      },
    ],
  })
}
