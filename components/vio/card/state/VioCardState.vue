<template>
  <VioCard
    :background-color="backgroundColor"
    class="border-0 text-center font-medium text-white"
    :class="{ 'rounded-none': isEdgy }"
  >
    <slot />
  </VioCard>
</template>

<script setup lang="ts">
export interface Props {
  backgroundColor?: string
  isEdgy?: boolean
}
withDefaults(defineProps<Props>(), {
  backgroundColor: undefined,
  isEdgy: false,
})
</script>
