export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('site-config:init', async ({ event, siteConfig }) => {
    const t = await useTranslation(event)

    siteConfig.push({
      description: t('globalSeoSiteDescription'),
    })
  })
})
