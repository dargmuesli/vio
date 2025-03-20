<template>
  <div>
    <!-- `NuxtLayout` can't be the root element (https://github.com/nuxt/nuxt/issues/25214) -->
    <NuxtLayout>
      <VioError
        :status-code="error.statusCode"
        :status-message="error.statusMessage"
        :description="error.message"
        :stack="error.stack"
      />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from 'nuxt/app'

interface Props {
  error: NuxtError
}
const props = withDefaults(defineProps<Props>(), {})
const errorProp = toRef(() => props.error)

// initialization
useAppLayout()

useHeadDefault({
  title: `${errorProp.value.statusCode} - ${errorProp.value.message}`,
})
defineOgImageComponent('NuxtSeo', {}, {})
</script>
