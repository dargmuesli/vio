<template>
  <NuxtTime
    v-bind="forwardedProps"
    :locale="props.locale || defaultLocale"
    :time-zone="props.timeZone || defaultTimeZone"
  />
</template>

<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { useForwardProps } from 'reka-ui'

import type { NuxtTimeProps } from 'nuxt/app'

const { locale: defaultLocale } = useI18n()
const defaultTimeZone = useTimeZone()

const props = defineProps<NuxtTimeProps>()

const delegatedProps = reactiveOmit(props, 'locale', 'timeZone')
const forwardedProps = useForwardProps(delegatedProps)
</script>
