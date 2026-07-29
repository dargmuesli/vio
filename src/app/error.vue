<template>
  <div>
    <!-- `NuxtLayout` can't be the root element (https://github.com/nuxt/nuxt/issues/25214) -->
    <NuxtLayout>
      <VioError
        :description="error.message"
        :stack="error.stack"
        :status="error.status"
        :status-text="error.statusText"
      />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from 'nuxt/app'

const { error } = defineProps<{
  error: NuxtError
}>()

// initialization
useAppLayout()
</script>
