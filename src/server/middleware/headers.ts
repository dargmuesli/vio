import type { AppConfig } from 'nuxt/schema'

export default defineEventHandler(async (event) => {
  const config = useAppConfig() as AppConfig

  for (const entry of Object.entries(config.vio.server.middleware.headers)) {
    appendHeader(event, entry[0], entry[1])
  }
})
