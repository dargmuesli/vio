import { useSeoMeta } from '@unhead/vue'

export default defineAppConfig({
  seoMeta: {
    twitterSite: '@dargmuesli',
  },
  themeColor: '#202020',
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    seoMeta?: Parameters<typeof useSeoMeta>[0]
    themeColor?: string
  }
}
