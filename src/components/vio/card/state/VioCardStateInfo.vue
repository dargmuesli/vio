<template>
  <VioCardState background-color="bg-blue-600" :is-edgy="isEdgy">
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
