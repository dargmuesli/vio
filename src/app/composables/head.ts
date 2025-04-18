export const useAppLayout = () => {
  const appConfig = useAppConfig()
  const colorMode = useColorMode()
  const siteConfig = useSiteConfig()

  if (import.meta.server) {
    // style
    useHeadSafe({
      bodyAttrs: {
        class:
          'bg-background-bright dark:bg-background-dark text-text-dark dark:text-text-bright',
      },
    })

    // favicon (https://vite-pwa-org.netlify.app/assets-generator/)
    useHeadSafe({
      link: [
        {
          href: `/site.webmanifest?v=${CACHE_VERSION}`,
          rel: 'manifest',
        },
        {
          href: `/favicon.ico?v=${CACHE_VERSION}`,
          rel: 'icon',
          sizes: '48x48',
        },
        {
          href: `/assets/static/favicon/favicon.svg?v=${CACHE_VERSION}`,
          rel: 'icon',
          sizes: 'any',
          type: 'image/svg+xml',
        },
        {
          href: `/assets/static/favicon/apple-touch-icon-180x180.png?v=${CACHE_VERSION}`,
          rel: 'apple-touch-icon',
        },
      ],
    })

    // i18n
    useHeadSafe(useLocaleHead().value)
  }

  if (import.meta.client) {
    // theme
    const updateThemeColor = () => {
      useSeoMeta({
        themeColor: appConfig.vio.themeColor, // colorMode.value === 'dark' ? THEME_COLOR_DARK : THEME_COLOR,
      })
    }
    updateThemeColor()
    watch(() => colorMode.value, updateThemeColor)
  }

  // seo
  useSeoMeta({
    titleTemplate: (title) =>
      TITLE_TEMPLATE({
        siteName: siteConfig.name,
        title,
      }),
  })
}

export const useHeadDefault = (input: Parameters<typeof useSeoMeta>[0]) => {
  const siteConfig = useSiteConfig()

  const description =
    toValue(input.description) || (siteConfig.description as string)
  const title = TITLE_TEMPLATE({
    siteName: siteConfig.name,
    title: toValue(input.title)?.toString() || undefined,
  })

  useSeoMeta({
    ...(description
      ? {
          description,
          ogDescription: description,
          twitterDescription: description,
        }
      : {}),
    ...(title ? { title, ogTitle: title, twitterTitle: title } : {}),
    ...input,
  })
}

const POLYFILLS_URL = `https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?features=${POLYFILLS.join(
  '%2C',
)}&flags=gated`

export const usePolyfills = () => {
  if (!POLYFILLS.length) return

  if (import.meta.server) {
    useHead({
      link: [
        {
          rel: 'preload',
          href: POLYFILLS_URL,
          crossorigin: 'anonymous',
          as: 'script',
          'data-testid': 'polyfill-preload',
        },
      ],
      script: [
        {
          src: POLYFILLS_URL,
          crossorigin: 'anonymous',
          'data-testid': 'polyfill-script',
        },
      ],
    })
  }
}
