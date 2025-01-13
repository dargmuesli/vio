<template>
  <div
    :class="[
      'prose prose-sm dark:prose-invert sm:prose-base lg:prose-lg xl:prose-xl',
      ...(isFullWidth
        ? [
            'max-w-full sm:max-w-full md:max-w-full xl:max-w-full 2xl:max-w-full',
          ]
        : []),
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  isFullWidth?: boolean
}
withDefaults(defineProps<Props>(), {})
</script>
