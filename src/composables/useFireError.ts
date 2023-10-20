import { consola } from 'consola'
import Swal from 'sweetalert2'
import type { Ref } from 'vue'

export const useFireError = () => {
  const { t } = useI18n()

  return ({ error }: { error: Error }, api?: Ref<any>) => {
    Swal.fire({
      icon: 'error',
      title: t('globalStatusError'),
      text: error.message,
    })
    api?.value.errors.push(error)
    consola.error(error)
  }
}
