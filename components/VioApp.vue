<template>
  <div :data-is-loading="isLoading">
    <NuxtLayout>
      <SeoKit :site-description="siteDescription" :language="locale" />
      <OgImageStatic :alt="ogImageAlt" component="OgImage" />
      <NuxtPage />
      <CookieControl :locale="locale" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  siteDescription: string
  ogImageAlt: string
}
withDefaults(defineProps<Props>(), {})

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
  { deep: true }
)
// initialization
useAppLayout()
useFavicons()
</script>
