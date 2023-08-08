<template>
  <VioLoaderIndicator>
    <div
      class="w-1/2 aspect-square animate-ping rounded-full bg-gray-500"
      :title="t('globalStatusLoading')"
    />
  </VioLoaderIndicator>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
