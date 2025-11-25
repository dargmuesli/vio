<template>
  <VioTime v-bind="props" />
</template>

<script setup lang="ts">
import type { NuxtTimeProps } from 'nuxt/app'

const props = withDefaults(defineProps<NuxtTimeProps>(), {
  day: 'numeric',
  hour: 'numeric',
  locale: undefined,
  minute: 'numeric',
  month: 'short',
  relative: undefined,
  timeZone: undefined,
  timeZoneName: undefined,
  weekday: undefined,
  year: 'numeric',
})
</script>
