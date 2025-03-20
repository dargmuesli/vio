<template>
  <VioPageLegalNotice />
</template>

<script setup lang="ts">
const { t } = useI18n()

// data
const title = t('title')

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  title: Impressum
en:
  title: Legal notice
</i18n>
