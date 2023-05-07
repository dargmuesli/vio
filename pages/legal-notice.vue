<template>
  <VioLegalNotice>
    <template #responsibilityAddress>
      <i18n-t keypath="responsibilityAddress">
        <template #br>
          <br />
        </template>
        <template #city>
          {{ appConfig.privacyPolicy.hostingCdn.external.address.city }}
        </template>
        <template #name>
          {{ appConfig.privacyPolicy.hostingCdn.external.address.name }}
        </template>
        <template #street>
          {{ appConfig.privacyPolicy.hostingCdn.external.address.street }}
        </template>
      </i18n-t>
    </template>
    <template #tmgAddress>
      <i18n-t keypath="tmgAddress">
        <template #br>
          <br />
        </template>
        <template #city>
          {{ appConfig.privacyPolicy.hostingCdn.external.address.city }}
        </template>
        <template #name>
          {{ appConfig.privacyPolicy.hostingCdn.external.address.name }}
        </template>
        <template #street>
          {{ appConfig.privacyPolicy.hostingCdn.external.address.street }}
        </template>
      </i18n-t>
    </template>
  </VioLegalNotice>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()

// TODO: use i18n-t without useI18n (https://github.com/nuxt-modules/i18n/issues/1731)
const x = useI18n() // eslint-disable-line @typescript-eslint/no-unused-vars
</script>

<i18n lang="yaml">
de:
  tmgAddress: '{name}{br}{street}{br}{city}'
  responsibilityAddress: '{name}{br}{street}{br}{city}'
en:
  tmgAddress: '{name}{br}{street}{br}{city}'
  responsibilityAddress: '{name}{br}{street}{br}{city}'
</i18n>
