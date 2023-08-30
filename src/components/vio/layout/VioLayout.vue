<template>
  <div class="container mx-auto p-4 md:px-8">
    <main>
      <slot />
    </main>
    <CookieControl :locale="locale" />
  </div>
</template>

<script setup lang="ts">
import type { Locale } from '@dargmuesli/nuxt-cookie-control/dist/runtime/types'
import type { WritableComputedRef } from 'vue'

const i18n = useI18n()

// data
const locale = i18n.locale as WritableComputedRef<Locale>
</script>
