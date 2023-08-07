import { defu } from 'defu'
import type { UseHeadSafeInput } from '@unhead/vue'
import type { ComputedRef } from 'vue'

export const useHeadDefault = (
  title: string | ComputedRef<string>,
  extension?: UseHeadSafeInput,
) => {
  const host = useHost()
  const router = useRouter()

  const defaults: UseHeadSafeInput = {
    meta: [
      {
        id: 'og:title',
        property: 'og:title',
        content: title,
      },
      {
        id: 'og:url',
        property: 'og:url',
        content: `https://${host}${router.currentRoute.value.fullPath}`,
      },
      {
        id: 'twitter:title',
        property: 'twitter:title',
        content: title,
      },
    ],
    title,
  }

  return useServerHeadSafe(defu(extension, defaults))
}
