<template>
  <VioPagePrivacyPolicy
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
  />
</template>

<script setup lang="ts">
const { t } = useI18n()

// data
const title = t('title')

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  title: Datenschutzerklärung
en:
  title: Privacy Policy
</i18n>
