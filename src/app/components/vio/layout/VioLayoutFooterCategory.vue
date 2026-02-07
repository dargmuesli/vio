<template>
  <div
    class="flex flex-1 basis-1/2 flex-col items-start gap-2 p-4 md:flex-none md:basis-auto"
  >
    <span class="text-lg leading-7 font-medium whitespace-nowrap">
      {{ heading }}
    </span>
    <slot />
  </div>
</template>

<script setup lang="ts">
const { heading } = defineProps<{
  heading: string
}>()
</script>
