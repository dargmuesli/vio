import { useSeoMeta } from '@unhead/vue'

export default defineAppConfig({
  legalNotice: undefined as
    | {
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
    | undefined,
  privacyPolicy: undefined as
    | {
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
    | undefined,
  seoMeta: {
    twitterSite: '@dargmuesli',
  } as Parameters<typeof useSeoMeta>[0] | undefined,
  themeColor: '#202020' as string | undefined,
})
