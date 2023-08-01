import { useSeoMeta } from '@unhead/vue'

export default defineAppConfig({
  legalNotice: undefined,
  privacyPolicy: undefined,
  seoMeta: {
    twitterSite: '@dargmuesli',
  },
  themeColor: '#202020',
})

declare module 'nuxt/schema' {
  interface AppConfigInput {
    legalNotice?: {
      contact: {
        email: string
      }
      responsibility: {
        address: {
          city: string
          name: string
          street: string
        }
      }
      tmg: {
        address: {
          city: string
          name: string
          street: string
        }
      }
    }
    privacyPolicy?: {
      hostingCdn?: {
        external: {
          address: {
            city: string
            name: string
            street: string
          }
        }
      }
      mandatoryInfo?: {
        responsible: {
          address: {
            city: string
            email: string
            name: string
            street: string
          }
        }
      }
    }
    seoMeta?: Parameters<typeof useSeoMeta>[0]
    themeColor?: string
  }
}
