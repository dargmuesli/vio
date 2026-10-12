import { defineEventHandler } from 'nuxt/server'

export default defineEventHandler(async (event) => {
  const isTesting = useIsTesting()
  event.context.$timeZone = await getTimeZone({ event, isTesting })
})

declare module '@nuxt/schema' {
  interface RequestEventContext {
    $timeZone?: string
  }
}

// h3 handlers, `useEvent()` and the app's `ssrContext.event` still see h3's context
declare module 'h3' {
  interface H3EventContext {
    $timeZone?: string
  }
}
