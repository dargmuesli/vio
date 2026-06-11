<template>
  <VioIconContainer
    fill="none"
    stroke="currentColor"
    :title="title || t('title')"
    viewBox="0 0 24 24"
  >
    <path
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
    />
  </VioIconContainer>
</template>

<script setup lang="ts">
const { title } = defineProps<{
  title?: string // eslint-disable-line vue/require-default-prop
}>()

const { t } = useI18n()
</script>

<i18n lang="yaml">
de:
  title: Kalender
en:
  title: Calendar
</i18n>
