<template>
  <VioLink
    v-if="to"
    :aria-label="ariaLabel"
    :class="classesComputed"
    :disabled="disabled"
    :is-colored="false"
    :is-to-relative="isToRelative"
    :to="to"
    @click="emit('click')"
  >
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
  </VioLink>
  <button
    v-else
    :aria-label="ariaLabel"
    :class="classesComputed"
    :disabled="disabled"
    :type="type"
    @click="emit('click', $event)"
  >
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
  </button>
</template>

<script setup lang="ts">
interface Props {
  ariaLabel: string
  classes?: string
  disabled?: boolean
  isBlock?: boolean
  isLinkColored?: boolean
  isToRelative?: boolean
  to?: string
  type?: 'button' | 'submit' | 'reset'
}
const props = withDefaults(defineProps<Props>(), {
  classes: undefined,
  disabled: false,
  isBlock: false,
  isLinkColored: false,
  isToRelative: false,
  to: undefined,
  type: 'button',
})

const emit = defineEmits<{
  click: [event?: MouseEvent]
}>()

// computations
const classesComputed = computed(() => {
  return [
    props.classes,
    ...(props.isBlock ? ['block'] : ['inline-flex items-center gap-2']),
    ...(props.isLinkColored ? ['text-link-dark dark:text-link-bright'] : []),
  ].join(' ')
})
</script>
