export default defineEventHandler(async (event) => {
  const isTesting = useIsTesting()
  event.context.$timeZone = await getTimeZone({ event, isTesting })
})

declare module 'h3' {
  interface H3EventContext {
    $timeZone?: string
  }
}
