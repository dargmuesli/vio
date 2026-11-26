import { defineEventHandler } from 'nuxt/server'

import { getTimeZone } from '../utils/dateTime'
import { useIsTesting } from '../utils/testing'

export default defineEventHandler(async (event) => {
  const isTesting = useIsTesting({ event })
  event.context.$timeZone = await getTimeZone({ event, isTesting })
})
