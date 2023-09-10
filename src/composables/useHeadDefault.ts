import { defu } from 'defu'
import type { ComputedRef } from 'vue'

export const useHeadDefault = ({
  extension,
  title,
}: {
  extension?: Parameters<typeof useServerSeoMeta>[0]
  title: string | ComputedRef<string>
}) => {
  const attrs = useAttrs()

  const defaults: Parameters<typeof useServerSeoMeta>[0] = {
    description: attrs['site-description'] as string, // TODO: remove (https://github.com/harlan-zw/nuxt-site-config/pull/7)
    msapplicationConfig: `/assets/static/favicon/browserconfig.xml?v=${CACHE_VERSION}`,
    title,
    twitterDescription: attrs['site-description'] as string,
    twitterTitle: title,
  }

  useSeoMeta(defu(extension, defaults)) // TODO: replace with `useServerSeoMeta`
}
