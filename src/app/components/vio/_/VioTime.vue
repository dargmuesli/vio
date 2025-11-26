<template>
  <NuxtTime
    v-bind="{ datetime: props.datetime, ...delegatedProps }"
    :locale="props.options.locale || defaultLocale"
    :time-zone="props.options.timeZone || defaultTimeZone"
  />
</template>

<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'

import type { NuxtTimeProps } from 'nuxt/app'

const { locale: defaultLocale } = useI18n()
const defaultTimeZone = useTimeZone()

const props = withDefaults(
  defineProps<{
    datetime: NuxtTimeProps['datetime']
    options?: Omit<NuxtTimeProps, 'datetime'>
  }>(),
  {
    options: () => ({
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  },
)

const delegatedProps = reactiveOmit(props.options, 'locale', 'timeZone')
</script>
