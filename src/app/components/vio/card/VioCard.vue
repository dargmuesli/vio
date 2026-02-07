<template>
  <div
    class="overflow-hidden rounded-lg"
    :class="[backgroundColor, ...(isHigh ? ['px-4 py-6'] : ['p-4'])]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const {
  backgroundColor = 'bg-background-brighten dark:bg-background-darken',
  isHigh = false,
} = defineProps<{
  backgroundColor?: string
  isHigh?: boolean
}>()
</script>
