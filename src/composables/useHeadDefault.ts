import type { UseSeoMetaInput } from '@unhead/vue'

export const useHeadDefault = (input: UseSeoMetaInput) => {
  const siteConfig = useSiteConfig()

  const description = input.description || siteConfig.description
  const title = TITLE_TEMPLATE({
    siteName: siteConfig.name,
    title: input.title?.toString(),
  })

  // can't be server side or it won't update on the client
  useSeoMeta({
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
