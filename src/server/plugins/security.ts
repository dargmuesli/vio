import { defu } from 'defu'
import type { NuxtOptions } from 'nuxt/schema'

// remove invalid `'none'`s and duplicates
const cleanupCsp = (
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
  if (import.meta.dev) {
    nitroApp.hooks.hook('render:html', (html, { event }) => {
      html.head.push(
        `<meta property="csp-nonce" nonce="${event.context.security.nonce}">`,
      )
    })
  }

  nitroApp.hooks.hook('nuxt-security:routeRules', async (routeRules) => {
    const runtimeConfig = useRuntimeConfig()
    const SITE_URL = runtimeConfig.public.site.url

    routeRules['/**'] = cleanupCsp(
      defu(
        {
          headers: {
            contentSecurityPolicy: defu(
              {
                // Cloudflare
                ...(!import.meta.dev
                  ? {
                      'connect-src': ['https://cloudflareinsights.com'],
                      'script-src-elem': [
                        'https://static.cloudflareinsights.com',
                      ],
                    }
                  : {}),
              },
              {
                // Google Analytics 4 (https://developers.google.com/tag-platform/tag-manager/web/csp)
                'connect-src': [
                  'https://*.analytics.google.com',
                  'https://*.google-analytics.com',
                  'https://*.googletagmanager.com',
                ],
                'img-src': [
                  'https://*.google-analytics.com',
                  'https://*.googletagmanager.com',
                ],
                'script-src-elem': ['https://*.googletagmanager.com'],
              },
              {
                // vio
                'manifest-src': [`${SITE_URL}/site.webmanifest`],
                // 'script-src-elem': [
                //   'https://polyfill.io/v3/polyfill.min.js', // ESLint plugin compat
                // ],
              },
              {
                // nuxt-link-checker
                ...(import.meta.dev
                  ? {
                      'connect-src': [
                        `${SITE_URL}/api/__link_checker__/inspect`,
                      ],
                    }
                  : {}),
              },
              {
                // nuxt-og-image
                ...(import.meta.dev
                  ? {
                      'connect-src': [`${SITE_URL}/__og-image__/`],
                    }
                  : {}),
              },
              {
                // nuxt-schema-org
                ...(import.meta.dev
                  ? {
                      'connect-src': [`${SITE_URL}/__schema-org__/debug.json`],
                    }
                  : {}),
              },
              {
                // nuxt-simple-robots
                ...(import.meta.dev
                  ? {
                      'connect-src': [
                        `${SITE_URL}/__robots__/debug.json`,
                        `${SITE_URL}/__robots__/debug-path.json`,
                      ],
                    }
                  : {}),
              },
              {
                // nuxt-simple-sitemap
                ...(import.meta.dev
                  ? {
                      'connect-src': [`${SITE_URL}/__sitemap__/debug.json`],
                    }
                  : {}),
                'script-src-elem': [`${SITE_URL}/__sitemap__/style.xsl`],
              },
              {
                // nuxt-site-config
                ...(import.meta.dev
                  ? {
                      'connect-src': [`${SITE_URL}/__site-config__/debug.json`],
                    }
                  : {}),
              },
              {
                // nuxt
                'connect-src': [
                  `${SITE_URL}/_nuxt/builds/meta/`,
                  ...(import.meta.dev
                    ? [
                        'http://localhost:3000/_nuxt/', // hot reload
                        'https://localhost:3000/_nuxt/', // hot reload
                        'ws://localhost:3000/_nuxt/', // hot reload
                        'wss://localhost:3000/_nuxt/', // hot reload
                      ] // TODO: generalize for different ports
                    : []),
                ],
                'img-src': [
                  "'self'", // e.g. favicon
                  'data:', // external link icon
                ],
                'script-src-elem': ["'nonce-{{nonce}}'"],
                'style-src-elem': ["'nonce-{{nonce}}'"],
              },
            ),
          },
        },
        routeRules['/**'],
      ),
    )
  })
})
