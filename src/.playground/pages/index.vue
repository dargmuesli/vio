<template>
  <div class="vio-prose m-auto">
    <h1>{{ t('title') }}</h1>
    <p>
      {{ t('globalStatusLoading') }}
      <br />
      {{ t('globalValidationFailed') }}
      <br />
      <VioLink to="/">{{ t('linkRoot') }}</VioLink>
      <br />
      <VioLink to="https://jonas-thelemann.de">
        {{ t('linkExternal') }}
      </VioLink>
      <br />
      <button type="button" @click="test">{{ $dayjs(0).format('lll') }}</button>
    </p>
    <!-- <SBreadcrumb /> -->
  </div>
</template>

<script setup lang="ts">
const { $dayjs } = useNuxtApp()
const { t, locale } = useI18n()
const router = useRouter()
const switchLocalePath = useSwitchLocalePath()

useHeadDefault({
  title: t('title'),
})

const test = async () => {
  await router.push({
    path: switchLocalePath(locale.value === 'de' ? 'en' : 'de'),
  })
}
</script>

<script lang="ts">
export default {
  name: 'VioIndex',
}
</script>

<i18n lang="yaml">
de:
  linkExternal: https://jonas-thelemann.de
  linkRoot: /
  title: Vio Playground
en:
  linkExternal: https://jonas-thelemann.de
  linkRoot: /
  title: Vio Playground
</i18n>
