<template>
  <VioCardState background-color="bg-red-600" :is-edgy="isEdgy" role="alert">
    <slot />
  </VioCardState>
</template>

<script setup lang="ts">
interface Props {
  isEdgy?: boolean
}
withDefaults(defineProps<Props>(), {
  isEdgy: false,
})
</script>
