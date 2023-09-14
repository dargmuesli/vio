<template>
  <div class="container mx-auto p-4 md:px-8">
    <header v-if="$slots.header">
      <slot name="header" />
    </header>
    <main>
      <slot />
    </main>
    <footer v-if="$slots.footer">
      <slot name="footer" />
    </footer>
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
