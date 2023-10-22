import type { H3Event } from 'h3'
import type { AppConfig } from 'nuxt/schema'

export default defineEventHandler(async (event) => {
  setRequestHeader(event, TIMEZONE_HEADER_KEY, await getTimezone(event))
  setResponseHeaders(event)
})

const setRequestHeader = (event: H3Event, name: string, value?: string) => {
  event.node.req.headers[name] = value
}

const setResponseHeaders = (event: H3Event) => {
  const config = useAppConfig() as AppConfig

  for (const entry of Object.entries(
    config.vio.server.middleware.headers.csp.default,
  )) {
    appendHeader(event, entry[0], entry[1])
  }

  if (process.env.NODE_ENV === 'production') {
    for (const entry of Object.entries(
      config.vio.server.middleware.headers.csp.production,
    )) {
      appendHeader(event, entry[0], entry[1])
    }
  }
}
