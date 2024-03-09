import { defu } from 'defu'
import type { UseSeoMetaInput } from '@unhead/vue'

export const useHeadDefault = ({
  extension,
  title,
}: {
  extension?: UseSeoMetaInput
  title: string
}) => {
  const siteConfig = useSiteConfig()

  const defaults: UseSeoMetaInput = {
    description: siteConfig.description,
    msapplicationConfig: `/assets/static/favicon/browserconfig.xml?v=${CACHE_VERSION}`,
    title,
    twitterDescription: siteConfig.description,
    twitterTitle: TITLE_TEMPLATE({
      siteName: siteConfig.name,
      title,
    }),
  }

  useServerSeoMeta(defu(extension, defaults))
}
