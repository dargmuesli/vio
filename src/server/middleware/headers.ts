import { defineEventHandler, useAppConfig } from 'nuxt/server'

export default defineEventHandler((event) => {
  const config = useAppConfig(event)

  if (!config.vio.server) return

  for (const entry of Object.entries(config.vio.server.middleware.headers)) {
    event.res.headers.append(entry[0], entry[1])
  }
})
