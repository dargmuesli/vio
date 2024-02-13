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
const { locale } = useI18n()
</script>
