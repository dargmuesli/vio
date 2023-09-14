<template>
  <VioApp
    :og-image-alt="t('ogImageAlt')"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<i18n lang="yaml">
de:
  ogImageAlt: Social Preview Image für eine Vio Webseite.
en:
  ogImageAlt: Social Preview Image for a Vio webpage.
</i18n>
