<template>
  <div :data-is-loading="isLoading" data-testid="is-loading">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <!-- `NuxtLayout` can't have mulitple child nodes (https://github.com/nuxt/nuxt/issues/21759) -->
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
interface Props {
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
const siteConfig = useSiteConfig()

const { loadingIds, indicateLoadingDone } = useLoadingDoneIndicator('app')

// methods
const init = () => {
  $dayjs.locale(locale.value)

  if (import.meta.client) {
    const cookieTimezone = useCookie(TIMEZONE_COOKIE_NAME, {
      // default: () => undefined, // setting `default` on the client side only does not write the cookie
      httpOnly: false,
      sameSite: 'strict',
      secure: true,
    })
    // @ts-expect-error `tz` should be part of `$dayjs` (https://github.com/iamkun/dayjs/issues/2106)
    cookieTimezone.value = $dayjs.tz.guess()
  }
}

// computations
const isLoading = computed(() => !!loadingIds.value.length)

// lifecycle
onMounted(() => indicateLoadingDone())

// initialization
defineOgImageComponent(
  ogImageComponentProp.value || 'NuxtSeo',
  {
    description: siteConfig.description,
  },
  {
    alt: ogImageAltProp.value,
  },
)
useAppLayout()
useFavicons()
// usePolyfills() // hijacked ⚠️
useSchemaOrg([
  defineWebSite({
    description: siteConfig.description,
  }),
])
useVioGtag()
init()
</script>
