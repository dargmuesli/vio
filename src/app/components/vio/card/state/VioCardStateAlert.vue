<template>
  <VioCardState background-color="bg-red-600" :is-edgy="isEdgy" role="alert">
    <slot />
  </VioCardState>
</template>

<script setup lang="ts">
const { isEdgy = false } = defineProps<{
  isEdgy?: boolean
}>()
</script>
