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

interface Props {
  ariaLabel?: string
  isColored?: boolean
  isToRelative?: boolean
  isUnderlined?: boolean
  locale?: I18N_LOCALE_CODE
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
    'rounded-sm',
    ...(props.isColored ? ['text-link-dark dark:text-link-bright'] : []),
    ...(props.isUnderlined ? ['underline'] : []),
  ].join(' ')
})
</script>
