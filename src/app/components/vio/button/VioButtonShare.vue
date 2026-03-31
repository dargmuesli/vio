<template>
  <span v-if="url" class="flex items-center gap-2">
    <slot />
    <VioButtonColored :aria-label="t('share')" @click="copy2(url)">
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
const { url } = defineProps<{
  url: string
}>()

const { t } = useI18n()
const { copy } = useCopy()
const alertError = useAlertError()

// methods
const copy2 = async (string: string) => {
  if (typeof window === 'undefined') return

  try {
    await copy(string)
    toast.success(t('donationUrlCopySuccess'))
  } catch (error: unknown) {
    alertError({
      ...(error instanceof Error ? { error } : {}),
      messageI18n: t('donationUrlCopyError'),
    })
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
