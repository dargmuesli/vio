<template>
  <svg xmlns="http://www.w3.org/2000/svg" :class="classes" :title="title">
    <slot />
  </svg>
</template>

<script setup lang="ts">
const { classes = 'h-5 md:h-6 w-5 md:w-6 shrink-0', title = undefined } =
  defineProps<{
    classes?: string
    title?: string
  }>()
</script>
