<template>
  <VioCardState background-color="bg-blue-600" :is-edgy="isEdgy">
    <slot />
  </VioCardState>
</template>

<script setup lang="ts">
const { isEdgy = false } = defineProps<{
  isEdgy?: boolean
}>()
</script>
