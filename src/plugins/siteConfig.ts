export default defineNuxtPlugin({
  enforce: 'pre',
  setup(_nuxtApp) {
    const { t } = _nuxtApp.vueApp.$nuxt.$i18n

    updateSiteConfig({
      description: t('globalSeoSiteDescription'),
    })
  },
})
