import tailwindcss from '@tailwindcss/vite'
import { defu } from 'defu'

import {
  SITE_URL,
  VIO_SITE_NAME,
  TIMEZONE_COOKIE_NAME,
  GTAG_COOKIE_ID,
  VIO_GET_CSP,
} from './shared/utils/constants'
import { VIO_NUXT_BASE_CONFIG } from './shared/utils/nuxt'

export default defineNuxtConfig(
  defu(
    {
      app: {
        head: {
          htmlAttrs: {
            lang: 'en', // fallback data to prevent invalid html at generation
          },
        },
        pageTransition: {
          name: 'layout',
        },
      },
      compatibilityDate: '2024-04-03',
      ...(process.env.NUXT_PUBLIC_SITE_URL
        ? {}
        : {
            devServer: {
              https: {
                key: './.config/certificates/ssl.key',
                cert: './.config/certificates/ssl.crt',
              },
            },
          }),
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
        '@pinia/nuxt',
        'nuxt-gtag',
        (_options, nuxt) => {
          if (nuxt.options.nitro.static) {
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
            if (nuxt.options.nitro.static) {
              nuxtConfigSecurityHeaders.contentSecurityPolicy = defu(
                VIO_GET_CSP({ siteUrl: new URL(SITE_URL) }),
                nuxtConfigSecurityHeaders.contentSecurityPolicy,
              )
            }

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
          i18n: {
            baseUrl: SITE_URL,
          },
          site: {
            url: SITE_URL,
          },
          vio: {
            isTesting: false,
          },
        },
      },
      typescript: {
        tsConfig: {
          vueCompilerOptions: {
            htmlAttributes: [], // https://github.com/johnsoncodehk/volar/issues/1970#issuecomment-1276994634
          },
          // compilerOptions: {
          //   noErrorTruncation: true,
          // },
        },
      },
      vite: {
        plugins: [tailwindcss()],
      },

      // modules
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
      eslint: {
        config: {
          typescript: true,
        },
      },
      gtag: {
        config: {
          cookie_flags: 'samesite=strict',
        },
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
        initMode: 'manual',
      },
      htmlValidator: {
        failOnError: true,
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
          contentSecurityPolicy: {
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
            'object-src': false as const,
            'prefetch-src': false as const,
            'report-to': undefined,
            'report-uri': false as const,
            // 'require-trusted-types-for': "'script'", // csp-evaluator // TODO: evaluate (https://github.com/maevsi/maevsi/issues/830)
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
          xXSSProtection: '1; mode=block', // TODO: set back to `0` once CSP does not use `unsafe-*` anymore (https://github.com/maevsi/maevsi/issues/1047)
        },
        ssg: {
          hashStyles: true,
        },
        strict: true,
      },
      site: {
        url: SITE_URL,
      },
      sitemap: {
        credits: false,
      },

      // environments
      $development: {
        devtools: {
          enabled: !process.env.NUXT_PUBLIC_VIO_IS_TESTING,
        },
        nitro: {
          experimental: {
            openAPI: false, // TODO: set to true (https://github.com/nuxt/content/issues/2839)
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
      siteName: VIO_SITE_NAME,
      stagingHost: 'localhost:3000',
    }),
  ),
)
