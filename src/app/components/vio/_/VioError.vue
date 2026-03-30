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
  statusText: _statusText = undefined,
  description,
  stack = undefined,
} = defineProps<{
  status?: number
  statusText?: string
  description: string
  stack?: string
}>()

const runtimeConfig = useRuntimeConfig()
const { locale, t } = useI18n()

// data
const title = `${status ? `${status} - ` : ''}${
  (await import('@http-util/status-i18n')).status(status, locale.value) ||
  t('error')
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
