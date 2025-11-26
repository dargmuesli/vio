export default defineEventHandler(async (event) => {
  event.context.$timezone = await getTimezone(event)
})

declare module 'h3' {
  interface H3EventContext {
    $timezone?: string
  }
}
