<template>
  <div :data-is-loading="isLoading" data-testid="is-loading">
    <NuxtLayout>
      <!-- `NuxtLayout` can't have mulitple child nodes (https://github.com/nuxt/nuxt/issues/21759) -->
      <div>
        <SeoKit :site-description="siteDescription" :language="locale" />
        <NuxtPage />
        <CookieControl :locale="locale" />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  siteDescription: string
  ogImageAlt: string
}
const props = withDefaults(defineProps<Props>(), {})

const { locale } = useI18n()
const cookieControl = useCookieControl()

const { loadingIds, indicateLoadingDone } = useLoadingDoneIndicator('app')

// data
const ogImageOptions = {
  alt: props.ogImageAlt,
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
defineOgImage(ogImageOptions)
useAppLayout()
useFavicons()
</script>
