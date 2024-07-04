import { defu } from 'defu'
import type { NuxtOptions } from 'nuxt/schema'
import { GET_CSP } from '../../utils/constants'

// remove invalid `'none'`s and duplicates
export const cleanupCsp = (
  nuxtSecurityConfiguration: Partial<NuxtOptions['security']>,
) => {
  if (
    nuxtSecurityConfiguration.headers &&
    typeof nuxtSecurityConfiguration.headers !== 'boolean' &&
    nuxtSecurityConfiguration.headers.contentSecurityPolicy
  ) {
    const csp = nuxtSecurityConfiguration.headers.contentSecurityPolicy

    for (const [key, value] of Object.entries(csp)) {
      if (!Array.isArray(value)) continue

      const valueFiltered = value.filter((x) => x !== "'none'")

      if (valueFiltered.length) {
        ;(csp as Record<string, unknown>)[key] = [...new Set(valueFiltered)]
      }
    }
  }

  return nuxtSecurityConfiguration
}

export default defineNitroPlugin((nitroApp) => {
  // TODO: migrate to nuxt-security (https://github.com/Baroshem/nuxt-security/discussions/454)
  if (import.meta.dev) {
    nitroApp.hooks.hook('render:html', (html, { event }) => {
      if (!event.context.security?.nonce) return

      html.head.push(
        `<meta property="csp-nonce" nonce="${event.context.security.nonce}">`,
      )
    })
  }

  nitroApp.hooks.hook('nuxt-security:routeRules', async (routeRules) => {
    const runtimeConfig = useRuntimeConfig()
    const siteUrl = runtimeConfig.public.site.url

    routeRules['/**'] = cleanupCsp(
      defu(
        {
          headers: {
            contentSecurityPolicy: GET_CSP(siteUrl),
          },
        },
        routeRules['/**'],
      ),
    )
  })
})
