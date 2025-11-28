import { useClipboard } from '@vueuse/core'

export const useCopy = () => {
  const { copy: clipboardCopy, isSupported } = useClipboard()
  const { t } = useI18n({ useScope: 'global' })
  const alertError = useAlertError()

  const copy = async (text: string) => {
    if (!import.meta.client) return

    if (!isSupported) {
      alertError(t('globalErrorClipboard'))
      return
    }

    await clipboardCopy(text)
  }

  return { copy }
}
