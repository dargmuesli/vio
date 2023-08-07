export const useHeadLayout = () => {
  const head = useLocaleHead({ addSeoAttributes: true })

  useServerHeadSafe(head.value)
  useServerHeadSafe({
    bodyAttrs: {
      class:
        'bg-background-bright dark:bg-background-dark font-sans text-text-dark dark:text-text-bright',
    },
    // link: [
    //   {
    //     href: '/assets/static/favicon/apple-touch-icon.png?v=eEYRGn5b9R',
    //     rel: 'apple-touch-icon',
    //     sizes: '180x180',
    //   },
    //   {
    //     href: '/assets/static/favicon/favicon-16x16.png?v=eEYRGn5b9R',
    //     rel: 'icon',
    //     sizes: '16x16',
    //     type: 'image/png',
    //   },
    //   {
    //     href: '/assets/static/favicon/favicon-32x32.png?v=eEYRGn5b9R',
    //     rel: 'icon',
    //     sizes: '32x32',
    //     type: 'image/png',
    //   },
    //   {
    //     href: '/favicon.ico?v=eEYRGn5b9R',
    //     rel: 'icon',
    //     type: 'image/x-icon',
    //   },
    //   {
    //     href: '/assets/static/favicon/site.webmanifest?v=eEYRGn5b9R',
    //     rel: 'manifest',
    //   },
    //   {
    //     color: '#202020',
    //     href: '/assets/static/favicon/safari-pinned-tab.svg?v=eEYRGn5b9R',
    //     rel: 'mask-icon',
    //   },
    //   {
    //     href: '/favicon.ico?v=eEYRGn5b9R',
    //     rel: 'shortcut icon',
    //   },
    // ],
    // meta: [
    //   {
    //     content: '/assets/static/favicon/browserconfig.xml?v=eEYRGn5b9R',
    //     name: 'msapplication-config',
    //   },
    //   {
    //     content: '#202020',
    //     name: 'msapplication-TileColor',
    //   },
    //   {
    //     content: '#202020',
    //     name: 'theme-color',
    //   },
    // ],
    // titleTemplate: (titleChunk?: string) => {
    //   return titleChunk && titleChunk !== title
    //     ? `${titleChunk} · ${title}`
    //     : title
    // },
  })
}
