<template>
  <div class="container mx-auto md:px-8">
    <div class="min-h-screen p-4">
      <header v-if="$slots.header">
        <slot name="header" />
      </header>
      <main>
        <slot />
      </main>
    </div>
    <footer v-if="$slots.footer" class="p-4">
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
