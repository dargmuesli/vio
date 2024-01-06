export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()
  const router = useRouter()
  const cookieControl = useCookieControl()

  const VueGtag = (await import('vue-gtag')).default

  nuxtApp.vueApp.use(
    VueGtag,
    {
      bootstrap: !!cookieControl.cookiesEnabledIds.value?.includes('ga'),
      config: {
        id: config.public.vio.googleAnalyticsId,
        params: {
          cookie_flags: 'secure;samesite=strict',
        },
      },
    },
    router,
  )
})
