import type { ApiData } from '../types/api'

export const formPreSubmit = async (
  api: ApiData,
  v$: any,
  isFormSent: Ref<boolean>,
): Promise<boolean> => {
  api.value.errors = []
  v$.value.$touch()

  const isFormValid = await v$.value.$validate()
  isFormSent.value = isFormValid

  if (!isFormValid) {
    throw new Error('Form is invalid!')
  }

  return isFormValid
}
