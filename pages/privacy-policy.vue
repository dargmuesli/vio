<template>
  <VioPrivacyPolicy
    :is-enabled="{
      summary: {
        generalNotes: true,
        dataCollection: {
          liability: true,
          method: true,
          use: true,
          rights: true,
        },
        dataCollectionTools: true,
      },
      hostingCdn: {
        external: {
          processingContract: true,
        },
      },
      mandatoryInfo: {
        privacy: true,
        responsible: true,
        storageDuration: true,
        dataSharingUsa: true,
        consentRevocation: true,
        consentRevocationSpecial: true,
        complaint: true,
        portability: true,
        sslTls: true,
        dataChange: true,
        processingRestriction: true,
        opposition: true,
      },
      dataAcquisition: {
        cookies: true,
        log: true,
        contactForm: true,
        contactExternal: true,
        comments: {
          ip: true,
          subscribe: true,
          storageDuration: true,
          legalBasis: true,
        },
      },
      newsletter: {
        data: true,
      },
      pluginsTools: {
        youTube: true,
        googleWebFonts: true,
        fontAwesome: true,
        googleMaps: true,
        googleReCaptcha: true,
      },
    }"
  >
    <template #hostingCdnExternalAddress>
      <i18n-t keypath="hostingCdnExternalAddress">
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
    <template #mandatoryInfoResponsibleAddress>
      <i18n-t keypath="mandatoryInfoResponsibleAddress">
        <template #br>
          <br />
        </template>
        <template #city>
          {{ appConfig.privacyPolicy.mandatoryInfo.responsible.address.city }}
        </template>
        <template #email>
          {{ appConfig.privacyPolicy.mandatoryInfo.responsible.address.email }}
        </template>
        <template #name>
          {{ appConfig.privacyPolicy.mandatoryInfo.responsible.address.name }}
        </template>
        <template #street>
          {{ appConfig.privacyPolicy.mandatoryInfo.responsible.address.street }}
        </template>
      </i18n-t>
    </template>
  </VioPrivacyPolicy>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()

// TODO: use i18n-t without useI18n (https://github.com/nuxt-modules/i18n/issues/1731)
const x = useI18n() // eslint-disable-line @typescript-eslint/no-unused-vars
</script>

<i18n lang="yaml">
de:
  hostingCdnExternalAddress: '{name}{br}{street}{br}{city}'
  mandatoryInfoResponsibleAddress: '{name}{br}{street}{br}{city}{br}{br}{email}'
en:
  hostingCdnExternalAddress: '{name}{br}{street}{br}{city}'
  mandatoryInfoResponsibleAddress: '{name}{br}{street}{br}{city}{br}{br}{email}'
</i18n>
