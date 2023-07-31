<template>
  <div :data-is-loading="isLoading" data-testid="is-loading">
    <NuxtLayout>
      <!-- `NuxtLayout` can't have mulitple child nodes (https://github.com/nuxt/nuxt/issues/21759) -->
      <div>
        <NuxtPage />
        <CookieControl :locale="locale as Locale" />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { Locale } from '@dargmuesli/nuxt-cookie-control/dist/runtime/types'

export interface Props {
  siteDescription: string
  ogImageAlt: string
  ogImageComponent?: string
}
const props = withDefaults(defineProps<Props>(), {
  ogImageComponent: undefined,
})

const { locale } = useI18n()
const cookieControl = useCookieControl()

const { loadingIds, indicateLoadingDone } = useLoadingDoneIndicator('app')

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
  description: props.siteDescription,
})
defineOgImage({
  alt: props.ogImageAlt,
  component: props.ogImageComponent,
  description: props.siteDescription,
})
useAppLayout()
useFavicons()
</script>
