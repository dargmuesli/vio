<template>
  <VioLoaderIndicator>
    <div
      class="aspect-square w-1/2 animate-ping rounded-full bg-gray-500"
      :title="t('globalStatusLoading')"
    />
  </VioLoaderIndicator>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
