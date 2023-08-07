<template>
  <div :data-is-loading="isLoading" data-testid="is-loading">
    <NuxtLayout>
      <!-- `NuxtLayout` can't have mulitple child nodes (https://github.com/nuxt/nuxt/issues/21759) -->
      <div>
        <NuxtPage :site-description="siteDescriptionProp" />
        <CookieControl :locale="locale" />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import type { Locale } from '@dargmuesli/nuxt-cookie-control/dist/runtime/types'
import type { WritableComputedRef } from 'vue'

export interface Props {
  ogImageAlt: string
  ogImageComponent?: string
  siteDescription: string
}
const props = withDefaults(defineProps<Props>(), {
  ogImageComponent: undefined,
})
const ogImageAltProp = toRef(() => props.ogImageAlt)
const ogImageComponentProp = toRef(() => props.ogImageComponent)
const siteDescriptionProp = toRef(() => props.siteDescription)

const { $dayjs } = useNuxtApp()
const i18n = useI18n()
const cookieControl = useCookieControl()
const siteConfig = useSiteConfig()

const { loadingIds, indicateLoadingDone } = useLoadingDoneIndicator('app')

// data
const locale = i18n.locale as WritableComputedRef<Locale>

// methods
const init = () => {
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
updateSiteConfig({
  description: siteDescriptionProp.value,
})
defineOgImage({
  alt: ogImageAltProp.value,
  component: ogImageComponentProp.value,
  description: siteDescriptionProp.value,
})
useAppLayout()
useFavicons() // TODO: move to head default
useSchemaOrg([
  defineWebSite({
    description: siteDescriptionProp,
    inLanguage: locale,
    name: siteConfig.name,
  }),
  defineWebPage(),
])
init()
</script>