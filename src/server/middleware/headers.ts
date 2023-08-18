import { appendHeader, defineEventHandler } from 'h3'
import type { H3Event } from 'h3'
import { AppConfig } from 'nuxt/schema'

import { TIMEZONE_HEADER_KEY } from '../../utils/constants'
import { getTimezone } from '../../utils/networking'

export default defineEventHandler(async (event) => {
  setRequestHeader(
    event,
    TIMEZONE_HEADER_KEY,
    (await getTimezone(event)) || 'UTC',
  )
  // setContentSecurityPolicy(event);
  setResponseHeaders(event)
})

// const setContentSecurityPolicy = (event: H3Event) => {
//   const config = useAppConfig();

//   appendHeader(
//     event,
//     "Content-Security-Policy",
//     getCspAsString(config.public.vio.server.middleware.headers.csp)
//   );
// };

const setRequestHeader = (event: H3Event, name: string, value: string) => {
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
