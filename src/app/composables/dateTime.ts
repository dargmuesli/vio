import { useNow as useNowVueUse, syncRef } from '@vueuse/core'

export const useTimeZone = () =>
  useNuxtApp().ssrContext?.event.context.$timeZone ||
  useCookie(TIMEZONE_COOKIE_NAME, {
    httpOnly: false,
    sameSite: 'strict',
    secure: true,
  }).value ||
  (import.meta.client
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : undefined)

// TODO: evaluate custom scheduler (https://github.com/vueuse/vueuse/pull/5129)
export const useNow = (options?: { live?: boolean }) => {
  const { live = true } = options || {}

  const nowState = useState(STATE_KEY_NOW, () => new Date())

  if (live) {
    const now = useNowVueUse()
    syncRef(now, nowState, { direction: 'ltr', immediate: false })
  }

  return nowState
}

// TODO: import from vueuse once reactive locale can be passed in (no issue or PR created yet)
export const useTimeAgoIntl = (options: {
  live?: boolean
  to: MaybeRef<Date>
}) => {
  const { live = true, to } = options

  const { locale } = useI18n({ useScope: 'global' })
  const now = useNow({ live })

  const formatter = computed(
    () =>
      new Intl.RelativeTimeFormat(locale.value, {
        numeric: 'auto',
      }),
  )

  const toAsRef = toRef(to)
  const fromTo = computed(() =>
    getFromTo(now.value, toAsRef.value, formatter.value),
  )

  const fromToState = useState(STATE_KEY_FROM_TO, () => fromTo)

  if (live) {
    syncRef(fromTo, fromToState, { direction: 'ltr', immediate: false })
  }

  return fromToState
}
