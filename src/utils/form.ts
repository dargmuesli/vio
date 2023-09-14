import { consola } from 'consola'

export const isFormValid = async ({
  v$,
  isFormSent,
}: {
  v$: any
  isFormSent: Ref<boolean>
}): Promise<boolean> => {
  v$.value.$touch()

  const isValid = await v$.value.$validate()
  isFormSent.value = isValid

  if (!isValid) {
    consola.error('Form in invalid!')
  }

  return isValid
}
