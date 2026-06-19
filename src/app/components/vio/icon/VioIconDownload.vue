<template>
  <VioIconContainer
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    :title="title || t('title')"
    viewBox="0 0 24 24"
  >
    <path
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      stroke-linecap="round"
      stroke-linejoin="round"
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
  title: Herunterladen
en:
  title: Download
</i18n>
