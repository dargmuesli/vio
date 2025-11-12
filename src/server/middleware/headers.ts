import type { AppConfig } from 'nuxt/schema'

export default defineEventHandler(async (event) => {
  const config = useAppConfig(event) as AppConfig

  if (!config.vio.server) return

  for (const entry of Object.entries(config.vio.server.middleware.headers)) {
    appendHeader(event, entry[0], entry[1])
  }
})
