<template>
  <div :data-is-loading="isLoading" data-testid="is-loading">
    <NuxtLayout>
      <!-- `NuxtLayout` can't have mulitple child nodes (https://github.com/nuxt/nuxt/issues/21759) -->
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  ogImageAlt: string
  ogImageComponent?: string
}
const props = withDefaults(defineProps<Props>(), {
  ogImageComponent: undefined,
})
const ogImageAltProp = toRef(() => props.ogImageAlt)
const ogImageComponentProp = toRef(() => props.ogImageComponent)

const { $dayjs } = useNuxtApp()
const { locale } = useI18n()
const cookieControl = useCookieControl()
const siteConfig = useSiteConfig()

const { loadingIds, indicateLoadingDone } = useLoadingDoneIndicator('app')

// methods
const init = () => {
  $dayjs.locale(locale.value)

  if (process.client) {
    const cookieTimezone = useCookie(TIMEZONE_COOKIE_NAME, {
      // default: () => undefined, // setting `default` on the client side only does not write the cookie
      httpOnly: false,
      sameSite: 'strict',
      secure: true,
    })
    // @ts-ignore `tz` should be part of `$dayjs` (https://github.com/iamkun/dayjs/issues/2106)
    cookieTimezone.value = $dayjs.tz.guess()
  }
}

// computations
const isLoading = computed(() => !!loadingIds.value.length)

// lifecycle
onMounted(() => indicateLoadingDone())
watch(
  () => cookieControl.cookiesEnabledIds.value,
  (current, previous) => {
    if (
      (!previous?.includes('ga') && current?.includes('ga')) ||
      (previous?.includes('ga') && !current?.includes('ga'))
    ) {
      window.location.reload()
    }
  },
  { deep: true },
)

// initialization
defineOgImage({
  alt: ogImageAltProp.value,
  component: ogImageComponentProp.value,
})
useAppLayout()
useFavicons()
usePolyfills()
useSchemaOrg([
  defineWebSite({
    description: siteConfig.description,
  }),
])
init()
</script>
