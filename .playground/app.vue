<template>
  <VioApp
    :site-description="t('siteDescription')"
    :og-image-alt="t('ogImageAlt')"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<i18n lang="yml">
de:
  siteDescription: Vio ist {'@'}dargmueslis Nuxt layer.
  ogImageAlt: Social Preview Image für eine Vio Webseite.
en:
  siteDescription: Vio is {'@'}dargmuesli's Nuxt layer.
  ogImageAlt: Social Preview Image for a Vio webpage.
</i18n>
