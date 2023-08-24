<template>
  <VioLoaderIndicator class="animate-pulse">
    {{ t('globalStatusLoading') }}
  </VioLoaderIndicator>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
