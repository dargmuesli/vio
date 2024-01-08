export default defineNuxtPlugin((nuxtApp) => {
  const { t } = nuxtApp.vueApp.$nuxt.$i18n

  updateSiteConfig({
    description: t('globalSeoSiteDescription'),
  })
})
