<template>
  <VioButton
    :aria-label="ariaLabel"
    class="flex justify-center"
    :disabled="disabled"
    :title="ariaLabel"
    :to="to"
    :type="type"
    @click="emit('click')"
  >
    <slot />
  </VioButton>
</template>

<script setup lang="ts">
const {
  ariaLabel,
  disabled = false,
  to = undefined,
  type = 'button',
} = defineProps<{
  ariaLabel: string
  disabled?: boolean
  to?: string
  type?: 'button' | 'submit' | 'reset'
}>()

const emit = defineEmits<{
  click: []
}>()
</script>
