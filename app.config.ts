import { useSeoMeta } from '@unhead/vue'

import { SITE_NAME } from './utils/constants'

export default defineAppConfig({
  seoMeta: {
    twitterSite: '@dargmuesli',
  },
  siteName: SITE_NAME,
  themeColor: '#202020',
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    seoMeta?: Parameters<typeof useSeoMeta>[0]
    siteName: string
    themeColor?: string
  }
}
