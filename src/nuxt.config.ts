import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defu } from 'defu'

import {
  SITE_URL,
  SITE_NAME,
  TIMEZONE_COOKIE_NAME,
  GTAG_COOKIE_ID,
  VIO_NUXT_BASE_CONFIG,
} from './utils/constants'

const currentDir = dirname(fileURLToPath(import.meta.url))

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig(
  defu(
    {
      app: {
        head: {
          htmlAttrs: {
            lang: 'en', // fallback data to prevent invalid html at generation
          },
          titleTemplate: '%s', // fully set in `composables/useAppLayout.ts`
        },
        pageTransition: {
          name: 'layout',
        },
      },
      devtools: {
        timeline: {
          enabled: true,
        },
      },
      modules: [
        '@dargmuesli/nuxt-cookie-control',
        '@nuxt/devtools',
        '@nuxt/eslint',
        '@nuxt/image',
        '@nuxtjs/color-mode',
        '@nuxtjs/html-validator',
        '@nuxtjs/i18n',
        '@nuxtjs/seo',
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        'nuxt-gtag',
        (_options, nuxt) => {
          if (nuxt.options._generate) {
            nuxt.options.features.inlineStyles = false
          }
        },
        // nuxt-security: remove invalid `'none'`s and duplicates
        (_options, nuxt) => {
          const nuxtConfigSecurityHeaders = nuxt.options.security.headers

          if (
            typeof nuxtConfigSecurityHeaders !== 'boolean' &&
            nuxtConfigSecurityHeaders.contentSecurityPolicy
          ) {
            const csp = nuxtConfigSecurityHeaders.contentSecurityPolicy

            for (const [key, value] of Object.entries(csp)) {
              if (!Array.isArray(value)) continue

              const valueFiltered = value.filter((x) => x !== "'none'")

              if (valueFiltered.length) {
                ;(csp as Record<string, unknown>)[key] = [
                  ...new Set(valueFiltered),
                ]
              }
            }
          }
        },
        'nuxt-security',
      ],
      nitro: {
        compressPublicAssets: true,
      },
      runtimeConfig: {
        public: {
          vio: {
            isTesting: false,
          },
        },
      },
      // typescript: {
      //   tsConfig: {
      //     compilerOptions: {
      //       noErrorTruncation: true,
      //     },
      //   },
      // },

      // modules
      colorMode: {
        classSuffix: '',
      },
      cookieControl: {
        cookies: {
          necessary: [
            {
              description: {
                de: 'Dieser Cookie von uns speichert die Einstellungen, die in diesem Dialog getroffen werden.',
                en: 'This cookie of ours stores the settings made in this dialog.',
              },
              id: 'c',
              name: {
                de: 'Cookie-Präferenzen',
                en: 'Cookie Preferences',
              },
              targetCookieIds: ['ncc_c', 'ncc_e'],
            },
            {
              description: {
                de: 'Dieser Cookie von uns speichert die Zeitzone, in der sich das Gerät zu befinden scheint.',
                en: 'This cookie of ours saves the timezone in which the device appears to be located.',
              },
              id: 't',
              name: {
                de: 'Zeitzone',
                en: 'Timezone',
              },
              targetCookieIds: [TIMEZONE_COOKIE_NAME],
            },
          ],
          optional: [
            {
              description: {
                de: 'Die Cookies vom Drittanbieter Google ermöglichen die Analyse von Nutzerverhalten. Diese Analyse hilft uns unsere Dienste zu verbessern, indem wir verstehen, wie diese Webseite genutzt wird.',
                en: 'The third-party cookies by Google enable the analysis of user behavior. This analysis helps us to improve our services by understanding how this website is used.',
              },
              id: GTAG_COOKIE_ID,
              links: {
                'https://policies.google.com/privacy': 'Google Privacy Policy',
                'https://policies.google.com/terms': 'Google Terms of Service',
              },
              name: 'Analytics',
              targetCookieIds: ['_ga', '_ga_K4R41W62BR'],
            },
          ],
        },
        locales: ['en', 'de'],
      },
      gtag: {
        config: {
          cookie_flags: 'samesite=strict',
        },
        enabled: false,
        initCommands: [
          [
            'consent',
            'default',
            {
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              ad_storage: 'denied',
              analytics_storage: 'denied',
              wait_for_update: 500,
            },
          ],
        ],
      },
      htmlValidator: {
        // failOnError: true, // TODO: enable once headers match requirements (https://github.com/unjs/unhead/issues/199#issuecomment-1815728703)
        logLevel: 'warning',
      },
      i18n: {
        defaultLocale: 'en', // Must be set for the default prefix_except_default prefix strategy.
        detectBrowserLanguage: false,
      },
      linkChecker: {
        failOnError: true,
      },
      robots: {
        credits: false,
      },
      security: {
        headers: {
          contentSecurityPolicy: defu(
            {
              // Cloudflare
              ...(process.env.NODE_ENV === 'production'
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
              ...(process.env.NODE_ENV === 'development'
                ? {
                    'connect-src': [`${SITE_URL}/api/__link_checker__/inspect`],
                  }
                : {}),
            },
            {
              // nuxt-og-image
              ...(process.env.NODE_ENV === 'development'
                ? {
                    'connect-src': [`${SITE_URL}/__og-image__/`],
                  }
                : {}),
            },
            {
              // nuxt-schema-org
              ...(process.env.NODE_ENV === 'development'
                ? {
                    'connect-src': [`${SITE_URL}/__schema-org__/debug.json`],
                  }
                : {}),
            },
            {
              // nuxt-simple-robots
              ...(process.env.NODE_ENV === 'development'
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
              ...(process.env.NODE_ENV === 'development'
                ? {
                    'connect-src': [`${SITE_URL}/__sitemap__/debug.json`],
                  }
                : {}),
            },
            {
              // nuxt-site-config
              ...(process.env.NODE_ENV === 'development'
                ? {
                    'connect-src': [`${SITE_URL}/__site-config__/debug.json`],
                  }
                : {}),
            },
            {
              // nuxt
              'connect-src': [
                `${SITE_URL}/_nuxt/builds/meta/`,
                `${SITE_URL}/_payload.json`,
                ...(process.env.NODE_ENV === 'development'
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
              'script-src-elem': [
                "'nonce-{{nonce}}'",
                `${SITE_URL}/_nuxt/`, // bundle
                "'unsafe-inline'", // nuxt-color-mode (https://github.com/nuxt-modules/color-mode/issues/266), runtimeConfig (static)
              ],
              'style-src-elem': ["'nonce-{{nonce}}'", "'self'"],
            },
            {
              'base-uri': ["'none'"], // does not fallback to `default-src`
              'child-src': false as const,
              'connect-src': false as const,
              'default-src': ["'none'"],
              'font-src': false as const,
              'form-action': ["'none'"], // does not fallback to `default-src`
              'frame-ancestors': ["'none'"], // does not fallback to `default-src`
              'frame-src': false as const,
              'img-src': false as const,
              'media-src': false as const,
              'navigate-to': false as const,
              'object-src': false as const,
              'prefetch-src': false as const,
              'report-to': undefined,
              'report-uri': false as const,
              // 'require-trusted-types-for': ["'script'"], // csp-evaluator // TODO: wait for trusted type support in vue (https://github.com/vuejs/core/pull/10844)
              sandbox: false as const,
              'script-src': false as const,
              'script-src-attr': false as const,
              'script-src-elem': false as const,
              'style-src': false as const,
              'style-src-attr': false as const,
              'style-src-elem': false as const,
              'upgrade-insecure-requests': false, // TODO: set to `process.env.NODE_ENV === 'production'` or `true` when tests run on https
              'worker-src': false as const,
            },
          ),
          xXSSProtection: '1; mode=block', // TODO: set back to `0` once CSP does not use `unsafe-*` anymore (https://github.com/maevsi/maevsi/issues/1047)
        },
        ssg: {
          hashStyles: true,
        },
      },
      seo: {
        splash: false,
      },
      site: {
        id: 'vio',
        url: SITE_URL,
      },
      sitemap: {
        credits: false,
      },
      tailwindcss: {
        cssPath: join(currentDir, './assets/css/tailwind.css'),
      },

      // environments
      $development: {
        devtools: {
          enabled: !process.env.NUXT_PUBLIC_VIO_IS_TESTING,
        },
        nitro: {
          experimental: {
            openAPI: true,
          },
        },
        runtimeConfig: {
          public: {
            vio: {
              isInProduction: false,
            },
          },
        },

        // modules
        security: {
          headers: {
            crossOriginEmbedderPolicy: 'unsafe-none',
            strictTransportSecurity: false, // prevent endless reload in Chrome
          },
        },
        site: {
          debug: true,
        },
      },
      $production: {
        runtimeConfig: {
          public: {
            i18n: {
              baseUrl: SITE_URL,
            },
            vio: {
              isInProduction: true,
            },
          },
        },

        // modules
        gtag: {
          config: {
            cookie_flags: 'samesite=strict;secure',
          },
        },
        security: {
          headers: {
            strictTransportSecurity: {
              maxAge: 31536000,
              preload: true,
            },
          },
        },
      },
    },
    VIO_NUXT_BASE_CONFIG({
      siteName: SITE_NAME,
      stagingHost: 'localhost:3000',
    }),
  ),
)
