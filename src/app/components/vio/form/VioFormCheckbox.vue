<template>
  <div>
    <input
      :id="`input-${formKey}`"
      :checked="value"
      class="rounded-sm"
      type="checkbox"
      @change="emit('change', ($event.target as HTMLInputElement).checked)"
    />
    <label class="pl-2" :for="`input-${formKey}`"><slot /></label>
  </div>
</template>

<script setup lang="ts">
const { formKey = undefined, value = undefined } = defineProps<{
  formKey?: string
  value?: boolean
}>()

const emit = defineEmits<{
  change: [change: boolean]
}>()
</script>
