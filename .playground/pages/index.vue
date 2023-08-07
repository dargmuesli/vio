<template>
  <div class="vio-prose">
    <h1>{{ t('title') }}</h1>
    <VioLink to="/">{{ t('globalLoading') }}</VioLink>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<i18n lang="yml">
de:
  title: Titel
en:
  title: Title
</i18n>
