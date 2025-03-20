<template>
  <VioFormInputState
    v-if="
      (!formInput && !validationProperty) ||
      (formInput &&
        formInput[isValidationLive ? '$invalid' : '$error'] &&
        !formInput.$pending &&
        validationProperty &&
        validationProperty in formInput &&
        formInput[validationProperty].$invalid)
    "
    class="text-red-600"
  >
    <VioIconExclamationCircle v-if="formInput && validationProperty" />
    <slot />
  </VioFormInputState>
</template>

<script setup lang="ts">
import type { BaseValidation } from '@vuelidate/core'

interface Props {
  formInput?: BaseValidation
  isValidationLive?: boolean
  validationProperty?: string
}
withDefaults(defineProps<Props>(), {
  formInput: undefined,
  isValidationLive: false,
  validationProperty: undefined,
})
</script>
