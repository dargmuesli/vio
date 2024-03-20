import { GOOGLE_ANALYTICS_COOKIE_NAME } from '../utils/constants'

export const useVioGtag = () => {
  const {
    gtag,
    initialize: initializeGtag,
    disableAnalytics,
    enableAnalytics,
  } = useGtag()
  const cookieControl = useCookieControl()

  if (
    cookieControl.cookiesEnabledIds.value?.includes(
      GOOGLE_ANALYTICS_COOKIE_NAME,
    )
  ) {
    initializeGtag()
  }

  watch(cookieControl.cookiesEnabledIds, (current, previous) => {
    if (
      !previous?.includes(GOOGLE_ANALYTICS_COOKIE_NAME) &&
      current?.includes(GOOGLE_ANALYTICS_COOKIE_NAME)
    ) {
      initializeGtag()
      enableAnalytics()
      gtag('consent', 'update', {
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        ad_storage: 'granted',
        analytics_storage: 'granted',
      })
    }

    if (
      previous?.includes(GOOGLE_ANALYTICS_COOKIE_NAME) &&
      !current?.includes(GOOGLE_ANALYTICS_COOKIE_NAME)
    ) {
      disableAnalytics()
    }
  })
}
