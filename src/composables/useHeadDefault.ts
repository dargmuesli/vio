import type { UseSeoMetaInput } from '@unhead/vue'

export const useHeadDefault = (input: UseSeoMetaInput) => {
  const siteConfig = useSiteConfig()

  const description = input.description || siteConfig.description
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
          twitterDescription: description,
        }
      : {}),
    msapplicationConfig: `/assets/static/favicon/browserconfig.xml?v=${CACHE_VERSION}`,
    ...(title ? { title, ogTitle: title, twitterTitle: title } : {}),
    ...input,
  })
}
