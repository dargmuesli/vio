<template>
  <footer class="text-sm leading-6">
    <div class="flex flex-col gap-8">
      <div class="flex items-center">
        <VioLayoutHr />
        <slot name="logo" />
        <VioLayoutHr />
      </div>
      <!-- Justifying evenly, instead of "between", centers a single element. -->
      <div class="flex flex-wrap justify-evenly">
        <slot />
      </div>
      <p class="text-center text-gray-500 dark:text-gray-400">
        {{
          t('copyright', {
            name: 'Jonas Thelemann',
            year,
          })
        }}
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()

// computations
const year = computed(() =>
  runtimeConfig.public.vio.isTesting ? 1337 : new Date().getFullYear(),
)
</script>

<i18n lang="yaml">
de:
  copyright: © {year} {name}. Alle Rechte vorbehalten.
en:
  copyright: © {year} {name}. All rights reserved.
</i18n>
