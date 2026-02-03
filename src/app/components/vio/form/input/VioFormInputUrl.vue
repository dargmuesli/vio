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

const {
  formInput,
  id = 'phone-number',
  isOptional = false,
} = defineProps<{
  formInput: BaseValidation
  id?: string
  isOptional?: boolean
}>()

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
