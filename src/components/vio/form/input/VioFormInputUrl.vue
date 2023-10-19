<template>
  <VioFormInput
    v-if="formInput"
    :is-optional="isOptional"
    :id-label="`input-${id}`"
    :placeholder="t('globalPlaceholderUrl')"
    :title="t('url')"
    type="url"
    :value="formInput"
    @input="emit('input', $event)"
  >
    <template #stateError>
      <VioFormInputStateError
        :form-input="formInput"
        validation-property="maxLength"
      >
        {{ t('globalValidationLength') }}
      </VioFormInputStateError>
      <VioFormInputStateError
        :form-input="formInput"
        validation-property="formatUrlHttps"
      >
        {{ t('globalValidationFormatUrlHttps') }}
      </VioFormInputStateError>
    </template>
  </VioFormInput>
</template>

<script setup lang="ts">
import type { BaseValidation } from '@vuelidate/core'

interface Props {
  formInput: BaseValidation
  id?: string
  isOptional?: boolean
}
withDefaults(defineProps<Props>(), {
  id: 'phone-number',
  isOptional: false,
})

const emit = defineEmits<{
  input: [event: string]
}>()

const { t } = useI18n()
</script>

<i18n lang="yaml">
de:
  url: Weblink
en:
  url: Weblink
</i18n>
