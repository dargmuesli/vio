<template>
  <div>
    <div v-if="api.isFetching" class="aspect-square" :class="classes">
      <VioLoaderIndicatorPing v-if="indicator === 'ping'" />
      <VioLoaderIndicatorSpinner v-else-if="indicator === 'spinner'" />
      <VioLoaderIndicatorText v-else-if="indicator === 'text'" />
      <VioLoaderIndicatorText v-else />
    </div>
    <VioCardStateAlert v-if="errorMessages.length">
      <VioLayoutSpanList :span="errorMessages" />
    </VioCardStateAlert>
    <slot v-if="api.data && Object.keys(api.data).length" />
  </div>
</template>

<script setup lang="ts">
import type { UnwrapRef } from 'vue'

import type { ApiData } from '@dargmuesli/nuxt-vio/types/api'

interface Props {
  api: UnwrapRef<ApiData>
  errorPgIds?: Record<string, string>
  classes?: string
  indicator?: string
}
const props = withDefaults(defineProps<Props>(), {
  errorPgIds: undefined,
  classes: undefined,
  indicator: undefined,
})

// computations
const errorMessages = computed(() =>
  getCombinedErrorMessages(props.api.errors, props.errorPgIds),
)
</script>

<script lang="ts">
export default {
  name: 'MaevsiLoader',
}
</script>
