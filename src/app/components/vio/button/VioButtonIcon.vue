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
interface Props {
  ariaLabel: string
  disabled?: boolean
  to?: string
  type?: 'button' | 'submit' | 'reset'
}
withDefaults(defineProps<Props>(), {
  disabled: false,
  to: undefined,
  type: 'button',
})

const emit = defineEmits<{
  click: []
}>()
</script>
