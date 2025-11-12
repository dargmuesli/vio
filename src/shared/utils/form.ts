import type { Validation } from '@vuelidate/core'
import { consola } from 'consola'
import type { Ref } from 'vue'

export const isFormValid = async ({
  v$,
  isFormSent,
}: {
  v$: Ref<Validation>
  isFormSent: Ref<boolean>
}) => {
  v$.value.$touch()

  const isValid = await v$.value.$validate()
  isFormSent.value = isValid

  if (!isValid) {
    consola.error('Form in invalid!')
  }

  return isValid
}
