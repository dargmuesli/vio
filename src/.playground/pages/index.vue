<template>
  <div class="vio-prose">
    <h1>{{ t('title') }}</h1>
    <p>
      {{ t('globalStatusLoading') }}
      <br />
      <VioLink to="/">/</VioLink>
      <br />
      <VioLink to="https://jonas-thelemann.de">
        https://jonas-thelemann.de
      </VioLink>
    </p>
    <SBreadcrumb />
    <SchemaOrgDebug />
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
  title: Titel
en:
  title: Title
</i18n>
