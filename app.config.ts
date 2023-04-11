import { SITE_NAME } from './utils/constants'

export default defineAppConfig({
  siteName: SITE_NAME,
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    siteName: string
  }
}
