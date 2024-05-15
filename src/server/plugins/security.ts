// TODO: migrate to nuxt-security (https://github.com/Baroshem/nuxt-security/discussions/454)
export default defineNitroPlugin((nitroApp) => {
  if (import.meta.dev) {
    nitroApp.hooks.hook('render:html', (html, { event }) => {
      html.head.push(
        `<meta property="csp-nonce" nonce="${event.context.security.nonce}">`,
      )
    })
  }
})
