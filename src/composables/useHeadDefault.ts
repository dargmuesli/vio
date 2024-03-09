import type { UseSeoMetaInput } from '@unhead/vue'

export const useHeadDefault = (input: UseSeoMetaInput) => {
  const siteConfig = useSiteConfig()

  const description = input.description || siteConfig.description // TODO: remove site configuration fallback (https://github.com/harlan-zw/nuxt-site-config/issues/26)
  const title = input.title
    ? TITLE_TEMPLATE({
        siteName: siteConfig.name,
        title: input.title.toString(),
      })
    : siteConfig.name

  useServerSeoMeta({
    ...(description
      ? {
          description,
          ogDescription: description,
          twitterDescription: siteConfig.description,
        }
      : {}),
    msapplicationConfig: `/assets/static/favicon/browserconfig.xml?v=${CACHE_VERSION}`,
    ...(title ? { title, ogTitle: title, twitterTitle: title } : {}),
    ...input,
  })
}
