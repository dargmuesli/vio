import dayjs from 'dayjs'
import type { DayjsFn } from 'dayjs'

import 'dayjs/locale/de'

import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

export default defineNuxtPlugin((_nuxtApp) => {
  dayjs.extend(isSameOrBefore)
  dayjs.extend(localizedFormat)
  dayjs.extend(relativeTime)
  dayjs.extend(timezone)
  dayjs.extend(utc)

  return {
    provide: {
      dayjs,
    },
  }
})

declare module '#app' {
  interface NuxtApp {
    $dayjs: DayjsFn
  }
}
