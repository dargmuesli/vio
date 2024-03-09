import type { UseSeoMetaInput } from '@unhead/vue'

export const useHeadDefault = (input: UseSeoMetaInput) => {
  const siteConfig = useSiteConfig()

  const description = input.description || siteConfig.description // TODO: remove site configuration fallback (https://github.com/harlan-zw/nuxt-site-config/issues/26)

  useServerSeoMeta({
    ...(description ? { description, ogDescription: description } : {}),
    msapplicationConfig: `/assets/static/favicon/browserconfig.xml?v=${CACHE_VERSION}`,
    ...input,
    // // pure duplicates disabled
    // twitterDescription: siteConfig.description,
    // twitterTitle: TITLE_TEMPLATE({
    //   siteName: siteConfig.name,
    //   title,
    // }),
  })
}
