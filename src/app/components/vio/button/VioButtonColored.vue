<template>
  <VioButton
    :aria-label="ariaLabel"
    class="justify-center rounded-md border px-4 py-2 font-medium"
    :class="
      [
        ...(isPrimary
          ? [
              'text-text-bright dark:bg-vio-primary-bg dark:text-vio-primary-text border-transparent bg-gray-800 hover:brightness-90',
            ]
          : [
              'text-text-dark dark:text-text-bright border-gray-300 hover:bg-black/5 dark:border-gray-600 dark:hover:bg-black/30',
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
const {
  ariaLabel,
  disabled = false,
  isPrimary = true,
  to = undefined,
  type = 'button',
} = defineProps<{
  ariaLabel: string
  disabled?: boolean
  isPrimary?: boolean
  to?: string
  type?: 'button' | 'reset' | 'submit'
}>()

const emit = defineEmits<{
  click: []
}>()
</script>
