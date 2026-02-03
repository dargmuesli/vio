<template>
  <NuxtTime
    v-bind="forwardedProps"
    :locale="options.locale || defaultLocale"
    :time-zone="options.timeZone || defaultTimeZone"
  />
</template>

<script setup lang="ts">
import type { NuxtTimeProps } from 'nuxt/app'

const { locale: defaultLocale } = useI18n()
const defaultTimeZone = useTimeZone()

const {
  datetime,
  options = {
    dateStyle: 'medium',
    timeStyle: 'short',
  },
} = defineProps<{
  datetime: NuxtTimeProps['datetime']
  options?: Omit<NuxtTimeProps, 'datetime'>
}>()

const forwardedProps = computed(() => {
  const { locale, timeZone, ...delegated } = options

  return { datetime: datetime, ...delegated }
})
</script>
