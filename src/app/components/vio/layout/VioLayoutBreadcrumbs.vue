<template>
  <div class="mb-4 flex items-center gap-2 overflow-auto p-1">
    <VioLink
      :aria-label="t('home')"
      data-testid="breadcrumb-prefix-/"
      :is-colored="false"
      :to="localePath('/')"
    >
      <VioIconHome classes="h-6 w-6" />
    </VioLink>
    <ul v-if="prefixes" class="flex items-center gap-2">
      <li
        v-for="prefix in prefixes"
        :key="prefix.name"
        class="flex items-center gap-2"
      >
        <span>{{ t('separator') }}</span>
        <VioLink
          class="text-2xl whitespace-nowrap"
          :data-testid="`breadcrumb-prefix-${prefix.to}`"
          :is-colored="false"
          :to="prefix.to"
        >
          {{ prefix.name }}
        </VioLink>
      </li>
    </ul>
    <span>{{ t('separator') }}</span>
    <VioLink :is-colored="false" :to="route.path">
      <span
        class="text-2xl font-bold whitespace-nowrap"
        data-testid="breadcrumb"
      >
        <slot />
      </span>
    </VioLink>
    <ul v-if="suffixes" class="flex items-center gap-2">
      <li
        v-for="suffix in suffixes"
        :key="suffix.name"
        class="flex items-center gap-2"
      >
        <span>{{ t('separator') }}</span>
        <VioLink
          class="text-2xl whitespace-nowrap"
          :data-testid="`breadcrumb-suffix-${suffix.to}`"
          :is-colored="false"
          :to="suffix.to"
        >
          {{ suffix.name }}
        </VioLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
export interface Breadcrumb {
  name: string
  to: string
}

interface Props {
  prefixes?: Breadcrumb[]
  suffixes?: Breadcrumb[]
}
withDefaults(defineProps<Props>(), {
  prefixes: undefined,
  suffixes: undefined,
})

const localePath = useLocalePath()
const { t } = useI18n()
const route = useRoute()
</script>

<i18n lang="yaml">
de:
  home: Nach Hause
  separator: /
en:
  home: Head home
  separator: /
</i18n>
