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
  statusCode?: number
  statusMessage?: string
  description: string
  stack?: string
}
const props = withDefaults(defineProps<Props>(), {
  statusCode: undefined,
  statusMessage: undefined,
  stack: undefined,
})

const runtimeConfig = useRuntimeConfig()
const { locale, t } = useI18n()

// data
const title = `${props.statusCode ? `${props.statusCode} - ` : ''}${
  (await import('@http-util/status-i18n')).status(
    props.statusCode,
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
