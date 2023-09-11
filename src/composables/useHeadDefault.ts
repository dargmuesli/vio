import { defu } from 'defu'
import type { UseSeoMetaInput } from '@unhead/vue'

export const useHeadDefault = ({
  extension,
  title,
}: {
  extension?: UseSeoMetaInput
  title: string | ComputedRef<string>
}) => {
  const attrs = useAttrs()
  const siteConfig = useSiteConfig()

  const defaults: UseSeoMetaInput = {
    description: attrs['site-description'] as string, // TODO: remove (https://github.com/harlan-zw/nuxt-site-config/pull/7)
    msapplicationConfig: `/assets/static/favicon/browserconfig.xml?v=${CACHE_VERSION}`,
    title,
    twitterDescription: attrs['site-description'] as string,
    twitterTitle: ref(
      TITLE_TEMPLATE({
        siteName: siteConfig.name,
        title: toValue(title),
      }),
    ), // TODO: remove `ref`
  }

  useServerSeoMeta(defu(extension, defaults))
}
