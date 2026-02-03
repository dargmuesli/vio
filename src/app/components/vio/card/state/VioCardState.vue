<template>
  <VioCard
    :background-color="backgroundColor"
    class="border-0 text-center font-medium text-white"
    :class="{ 'rounded-none': isEdgy }"
  >
    <slot />
  </VioCard>
</template>

<script setup lang="ts">
const { backgroundColor = undefined, isEdgy = false } = defineProps<{
  backgroundColor?: string
  isEdgy?: boolean
}>()
</script>
