<template>
  <form
    v-if="form"
    :class="[
      { 'animate-shake rounded-lg border border-red-500': errors?.length },
      formClass,
    ]"
    novalidate
    @submit="(e) => emit('submit', e)"
  >
    <VioCard class="flex flex-col" is-high>
      <div class="flex flex-col min-h-0 overflow-y-auto gap-6">
        <slot />
        <div class="flex flex-col items-center justify-between">
          <VioButtonColored
            :aria-label="submitName || t('submit')"
            :class="{
              'animate-shake': form.$error,
            }"
            type="submit"
            @click="emit('click')"
          >
            {{ submitName || t('submit') }}
            <template #prefix>
              <slot name="submit-icon" />
            </template>
          </VioButtonColored>
          <VioFormInputStateError v-if="form.$error" class="mt-2">
            {{ t('globalValidationFailed') }}
          </VioFormInputStateError>
        </div>
        <VioCardStateAlert v-if="errorMessages?.length" class="my-4">
          <VioLayoutSpanList :span="errorMessages" />
        </VioCardStateAlert>
        <div v-if="$slots.assistance" class="flex justify-center">
          <slot name="assistance" />
        </div>
      </div>
    </VioCard>
  </form>
</template>

<script setup lang="ts">
import type { BaseValidation } from '@vuelidate/core'

import type { BackendError } from '../../../types/api'

export interface Props {
  errors?: BackendError[]
  errorsPgIds?: Record<string, string>
  form: BaseValidation
  formClass?: string
  isFormSent?: boolean
  submitName?: string
}
const props = withDefaults(defineProps<Props>(), {
  errors: undefined,
  errorsPgIds: undefined,
  formClass: undefined,
  isFormSent: false,
  submitName: undefined,
})

const emit = defineEmits<{
  click: []
  submit: [event: Event]
}>()

const { t } = useI18n()

// computations
const errorMessages = computed(() =>
  props.errors
    ? getCombinedErrorMessages(props.errors, props.errorsPgIds)
    : undefined,
)
</script>

<i18n lang="yaml">
de:
  submit: Absenden
en:
  submit: Submit
</i18n>
