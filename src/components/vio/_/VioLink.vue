<template>
  <a
    v-if="to?.toString().match(/^((ftp|http(s)?):\/\/|(mailto):)/)"
    :aria-label="ariaLabel"
    :class="classes"
    :href="to.toString()"
    :rel="
      [...(nofollow ? ['nofollow'] : []), 'noopener', 'noreferrer'].join(' ')
    "
    target="_blank"
    @click="emit('click')"
  >
    <slot />
  </a>
  <NuxtLinkLocale
    v-else
    :aria-label="ariaLabel"
    :class="classes"
    :locale="locale"
    :to="isToRelative ? append(route.path, to) : to"
    @click="emit('click')"
  >
    <slot />
  </NuxtLinkLocale>
</template>

<script setup lang="ts">
import type { NuxtLinkProps } from '#app'
import { append } from '../../../utils/utils' // TODO: wait for autoimport to be fixed and remove this import

interface Props {
  ariaLabel?: string
  isColored?: boolean
  isToRelative?: boolean
  isUnderlined?: boolean
  locale?: string
  nofollow?: boolean
  to: NuxtLinkProps['to']
}
const props = withDefaults(defineProps<Props>(), {
  ariaLabel: undefined,
  isColored: true,
  isToRelative: false,
  isUnderlined: false,
  locale: undefined,
  nofollow: false,
})

const emit = defineEmits<{
  click: []
}>()

const route = useRoute()

// computations
const classes = computed(() => {
  return [
    'rounded',
    ...(props.isColored ? ['text-link-dark dark:text-link-bright'] : []),
    ...(props.isUnderlined ? ['underline'] : []),
  ].join(' ')
})
</script>
