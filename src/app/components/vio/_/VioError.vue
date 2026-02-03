<template>
  <div class="overflow-auto">
    <h1>{{ title }}</h1>
    <div>
      {{ description }}
    </div>
    <div
      v-if="stack && !runtimeConfig.public.vio.isInProduction"
      v-html="stack"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  status?: number
  statusCode?: number
  statusMessage?: string
  statusText?: string
  description: string
  stack?: string
}
const props = withDefaults(defineProps<Props>(), {
  status: undefined,
  statusCode: undefined,
  statusMessage: undefined,
  statusText: undefined,
  stack: undefined,
})

const runtimeConfig = useRuntimeConfig()
const { locale, t } = useI18n()

// data
const title = `${props.status || props.statusCode ? `${props.status || props.statusCode} - ` : ''}${
  (await import('@http-util/status-i18n')).status(
    props.status || props.statusCode,
    locale.value,
  ) || t('error')
}`

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  error: Fehler
en:
  error: Error
</i18n>
