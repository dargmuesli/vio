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
const {
  status = undefined,
  statusCode = undefined,
  statusMessage: _statusMessage = undefined,
  statusText: _statusText = undefined,
  description,
  stack = undefined,
} = defineProps<{
  status?: number
  statusCode?: number
  statusMessage?: string
  statusText?: string
  description: string
  stack?: string
}>()

const runtimeConfig = useRuntimeConfig()
const { locale, t } = useI18n()

// data
const title = `${status || statusCode ? `${status || statusCode} - ` : ''}${
  (await import('@http-util/status-i18n')).status(
    status || statusCode,
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
