import { useSeoMeta } from '@unhead/vue'

import { SITE_NAME } from './utils/constants'

export default defineAppConfig({
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
  seoMeta: undefined as Parameters<typeof useSeoMeta>[0] | undefined,
  siteName: SITE_NAME,
  themeColor: undefined as string | undefined,
})
