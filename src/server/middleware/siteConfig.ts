export default defineEventHandler((event) => {
  updateSiteConfig(event, {
    description: 'test',
  })
})
