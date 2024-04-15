<template>
  <div class="vio-prose m-auto">
    <h1>{{ t('title') }}</h1>
    <p>
      {{ t('globalStatusLoading') }}
      <br />
      {{ t('globalValidationFailed') }}
      <br />
      <VioLink to="/">{{ t('linkRoot') }}</VioLink>
      <br />
      <VioLink to="https://jonas-thelemann.de">
        {{ t('linkExternal') }}
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
  linkExternal: https://jonas-thelemann.de
  linkRoot: /
  title: Vio Playground
en:
  linkExternal: https://jonas-thelemann.de
  linkRoot: /
  title: Vio Playground
</i18n>
