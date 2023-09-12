<template>
  <div class="vio-prose m-auto">
    <h1>{{ t('title') }}</h1>
    <p>
      {{ t('globalStatusLoading') }}
      <br />
      {{ t('globalValidationFailed') }}
      <br />
      <VioLink to="/">/</VioLink>
      <br />
      <VioLink to="https://jonas-thelemann.de">
        https://jonas-thelemann.de
      </VioLink>
    </p>
    <!-- <SBreadcrumb /> -->
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHeadDefault({
  title: t('title'),
})
</script>

<i18n lang="yaml">
de:
  title: Vio Playground
en:
  title: Vio Playground
</i18n>
