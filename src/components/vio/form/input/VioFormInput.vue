<template>
  <div>
    <div
      :class="{
        'form-input-success': success,
        'form-input-warning': warning,
        'form-input-error': value?.$error,
      }"
      class="flex-wrap md:flex md:items-center"
    >
      <div class="mb-1 md:mb-0 md:w-1/3 md:pr-4 md:text-right">
        <label
          class="inline-flex items-baseline gap-2 font-semibold md:flex-col md:items-end md:gap-0"
          :class="{
            'form-input-success': success,
            'form-input-warning': warning,
            'form-input-error': value?.$error,
          }"
          :for="idLabelFull"
        >
          <span>{{ title }}</span>
          <span
            class="text-xs font-medium text-gray-500 md:text-right dark:text-gray-400"
          >
            <span v-if="isRequired">
              {{ t('required') }}
            </span>
            <span v-if="isOptional">
              {{ t('optional') }}
            </span>
          </span>
        </label>
      </div>
      <div class="flex md:mt-1 md:w-2/3">
        <div class="relative min-w-0 grow">
          <slot v-if="$slots.default" />
          <input
            v-else
            :id="idLabelFull"
            class="form-input"
            :class="{
              'rounded-r-none': $slots.icon,
            }"
            :disabled="isDisabled"
            :placeholder="placeholder"
            :name="name || idLabelFull"
            :readonly="isReadonly"
            :type="type"
            :value="valueFormatter(value?.$model as string)"
            @input="emit('input', ($event.target as HTMLInputElement)?.value)"
            @click="emit('click')"
          />
          <div v-if="validationProperty && isValidatable">
            <VioFormInputIconWrapper v-if="validationProperty.$pending">
              <VioIconHourglass
                class="text-blue-600"
                :title="t('globalStatusLoading')"
              />
            </VioFormInputIconWrapper>
            <VioFormInputIconWrapper
              v-else-if="
                !!validationProperty.$model && !validationProperty.$invalid
              "
            >
              <VioIconCheckCircle class="text-green-600" :title="t('valid')" />
            </VioFormInputIconWrapper>
            <VioFormInputIconWrapper
              v-else-if="
                !!validationProperty.$model && validationProperty.$invalid
              "
            >
              <VioIconExclamationCircle
                class="text-red-600"
                :title="t('validNot')"
              />
            </VioFormInputIconWrapper>
          </div>
        </div>
        <span
          v-if="$slots.icon"
          class="inline-flex cursor-pointer items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-600"
          @click="emit('icon')"
        >
          <slot name="icon" />
        </span>
      </div>
      <div class="md:w-1/3" />
      <div class="md:w-2/3">
        <slot name="inputSuffix" />
      </div>
      <div class="md:w-1/3" />
      <div class="md:w-2/3">
        <slot name="stateSuccess" />
      </div>
      <div class="md:w-1/3" />
      <div class="md:w-2/3">
        <slot name="stateInfo" />
        <VioFormInputStateInfo v-if="value?.$pending">
          {{ t('globalStatusLoading') }}
        </VioFormInputStateInfo>
      </div>
      <div class="md:w-1/3" />
      <div class="md:w-2/3">
        <slot name="stateWarning" />
      </div>
      <div class="md:w-1/3" />
      <div class="md:w-2/3">
        <slot name="stateError" />
      </div>
      <div class="md:w-1/3" />
      <div class="md:w-2/3">
        <slot name="assistance" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BaseValidation } from '@vuelidate/core'
import { consola } from 'consola'

interface Props {
  idLabel?: string
  isDisabled?: boolean
  isOptional?: boolean
  isReadonly?: boolean
  isRequired?: boolean
  isValidatable?: boolean
  name?: string
  placeholder?: string
  success?: boolean
  title: string
  type?: string
  validationProperty?: BaseValidation
  value?: BaseValidation
  valueFormatter?: (x?: string) => typeof x | undefined
  warning?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  idLabel: undefined,
  isDisabled: false,
  isOptional: false,
  isReadonly: false,
  isRequired: false,
  isValidatable: false,
  name: undefined,
  placeholder: undefined,
  success: false,
  type: undefined,
  validationProperty: undefined,
  value: undefined,
  valueFormatter: (x?: string) => x,
  warning: false,
})

const emit = defineEmits<{
  icon: []
  input: [input: string]
  click: []
}>()

const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteConfig = useSiteConfig()

// data
const idLabelFull = props.idLabel
  ? `${siteConfig.id}-${
      runtimeConfig.public.vio.isInProduction ? 'prod' : 'dev'
    }-${props.idLabel}`
  : undefined

// initialization
if (
  !props.placeholder &&
  props.type &&
  ![
    'checkbox',
    'datetime-local',
    'number',
    'select',
    'textarea',
    'tiptap',
    'radio',
  ].includes(props.type)
) {
  consola.warn(`placeholder is missing for ${props.idLabel}!`)
}

if (
  !props.value &&
  props.type &&
  !['checkbox', 'select'].includes(props.type)
) {
  consola.warn(`value is missing for ${props.idLabel}!`)
}
</script>

<i18n lang="yaml">
de:
  optional: optional
  required: Pflichtfeld
  valid: Gültig
  validNot: Ungültig
en:
  optional: optional
  required: required
  valid: valid
  validNot: invalid
</i18n>
