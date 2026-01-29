<script setup>
import { computed } from 'vue'
const props = defineProps({
  colorMode: { type: String, required: false, default: 'light' },
  title: { type: String, required: false, default: 'title' },
  description: { type: String, required: false, default: undefined },
  isPro: { type: Boolean, required: false },
})
const themeColor = computed(() =>
  props.isPro ? '124, 58, 237' : '34, 197, 94',
)
</script>

<template>
  <!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
  <div
    class="relative flex h-full w-full flex-col items-center justify-center p-15"
    :style="{
      backgroundColor: colorMode === 'dark' ? '#171717' : '#ffffff',
      color: colorMode === 'dark' ? '#fafafa' : '#171717',
    }"
  >
    <!-- Gradient background -->
    <div
      class="absolute top-0 right-0 bottom-0 left-0"
      :style="{
        backgroundImage: `radial-gradient(ellipse 100% 100% at 100% 100%, rgba(${themeColor}, 0.15) 0%, transparent 60%)`,
      }"
    />
    <div
      class="absolute top-0 right-0 bottom-0 left-0"
      :style="{
        backgroundImage: `radial-gradient(ellipse 100% 100% at 0.1% 0.1%, rgba(${themeColor}, 0.1) 0%, transparent 50%)`,
      }"
    />

    <div class="relative flex flex-col items-center gap-8 text-center">
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <svg viewBox="0 0 64 64" class="h-16 w-16">
          <defs>
            <linearGradient
              :id="isPro ? 'nsLine2' : 'nsLine1'"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" :stop-color="isPro ? '#7c3aed' : '#22c55e'" />
              <stop offset="100%" :stop-color="isPro ? '#c4b5fd' : '#86efac'" />
            </linearGradient>
            <linearGradient
              :id="isPro ? 'nsFill2' : 'nsFill1'"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                :stop-color="isPro ? '#7c3aed' : '#22c55e'"
                stop-opacity="0.6"
              />
              <stop
                offset="100%"
                :stop-color="isPro ? '#7c3aed' : '#22c55e'"
                stop-opacity="0"
              />
            </linearGradient>
          </defs>
          <path
            d="M8 52 Q20 48 24 36 T40 20 T56 12 L56 56 L8 56 Z"
            :fill="`url(#${isPro ? 'nsFill2' : 'nsFill1'})`"
          />
          <path
            d="M8 52 Q20 48 24 36 T40 20 T56 12"
            fill="none"
            :stroke="`url(#${isPro ? 'nsLine2' : 'nsLine1'})`"
            stroke-width="4"
            stroke-linecap="round"
          />
          <circle
            cx="56"
            cy="12"
            r="6"
            :fill="`url(#${isPro ? 'nsLine2' : 'nsLine1'})`"
          />
        </svg>
        <span class="text-[42px] font-bold tracking-tight">
          Nuxt<span
            :class="isPro ? 'text-violet-500' : 'text-green-500'"
            class="ml-2"
            >SEO{{ isPro ? ' Pro' : '' }}</span
          >
        </span>
      </div>

      <!-- Title -->
      <h1 class="m-0 max-w-250 text-[80px] leading-tight font-bold">
        {{ title }}
      </h1>

      <!-- Description -->
      <p
        v-if="description"
        class="max-w-225 text-[32px] leading-relaxed opacity-70"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>
