<template>
  <VioButton
    :is-to-relative="isToRelative"
    :aria-label="ariaLabel"
    class="justify-center rounded-md border px-4 py-2 font-medium"
    :class="
      [
        ...(isPrimary
          ? [
              'border-transparent bg-gray-800 text-text-bright hover:brightness-90 dark:bg-vio-primary-bg dark:text-vio-primary-text',
            ]
          : [
              'border-gray-300 text-text-dark hover:bg-black/5 dark:border-gray-600 dark:text-text-bright dark:hover:bg-black/30',
            ]),
      ].join(' ')
    "
    :disabled="disabled"
    :to="to"
    :type="type"
    @click="emit('click')"
  >
    <slot />
    <template #prefix>
      <slot name="prefix" />
    </template>
    <template #suffix>
      <slot name="suffix" />
    </template>
  </VioButton>
</template>

<script setup lang="ts">
export interface Props {
  ariaLabel: string
  disabled?: boolean
  isPrimary?: boolean
  isToRelative?: boolean
  to?: string
  type?: 'button' | 'reset' | 'submit'
}
withDefaults(defineProps<Props>(), {
  disabled: false,
  isPrimary: true,
  isToRelative: false,
  to: undefined,
  type: 'button',
})

const emit = defineEmits<{
  click: []
}>()
</script>
