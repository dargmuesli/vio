import { consola } from 'consola'
import Swal from 'sweetalert2'
import type { Ref } from 'vue'

export const useFireError = () => {
  const { t } = useI18n({ useScope: 'global' })

  return ({ error }: { error: Error }, api?: Ref<{ errors: Error[] }>) => {
    Swal.fire({
      icon: 'error',
      title: t('globalStatusError'),
      text: error.message,
    })
    api?.value.errors.push(error)
    consola.error(error)
  }
}
