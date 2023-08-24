<template>
  <span v-if="url" class="flex items-center gap-2">
    <slot />
    <VioButtonColored :aria-label="t('share')" @click="copy(url)">
      <template #prefix>
        <VioIconShare />
      </template>
    </VioButtonColored>
  </span>
  <span v-else class="unready inline-block">
    <slot name="unready" />
  </span>
</template>

<script setup lang="ts">
export interface Props {
  url: string
}
withDefaults(defineProps<Props>(), {})

const { t } = useI18n()

// methods
const copy = async (string: string) => {
  if (typeof window === 'undefined') return

  try {
    await navigator.clipboard.writeText(string)
    showToast({ title: t('donationUrlCopySuccess') })
  } catch (error: any) {
    alert(t('donationUrlCopyError'))
  }
}
</script>

<i18n lang="yaml">
de:
  donationUrlCopyError: 'Fehler: Der Spendenlink konnte leider nicht in die Zwischenablage kopiert werden!'
  donationUrlCopySuccess: Der Spendenlink wurde in die Zwischenablage kopiert.
  share: Teilen
en:
  donationUrlCopyError: 'Error: Unfortunately, the donation link could not be copied to the clipboard!'
  donationUrlCopySuccess: The donation link has been copied to the clipboard.
  share: Share
</i18n>
