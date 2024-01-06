import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defu } from 'defu'

import {
  SITE_URL,
  SITE_NAME,
  TIMEZONE_COOKIE_NAME,
  VIO_NUXT_BASE_CONFIG,
} from './utils/constants'

const currentDir = dirname(fileURLToPath(import.meta.url))

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig(
  defu(
    {
      alias: {
        dayjs: 'dayjs',
        sweetalert2: 'sweetalert2',
      }, // TODO: remove (https://github.com/nuxt/nuxt/issues/19426)
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
        enabled:
          process.env.NODE_ENV === 'development' &&
          !process.env.NUXT_PUBLIC_VIO_IS_TESTING,
        timeline: {
          enabled: true,
        },
      },
      modules: [
        '@dargmuesli/nuxt-cookie-control',
        '@nuxt/devtools',
        '@nuxt/image',
        '@nuxtjs/color-mode',
        '@nuxtjs/html-validator',
        '@nuxtjs/i18n',
        '@nuxtjs/tailwindcss',
        '@nuxtseo/module',
        '@pinia/nuxt',
        // nuxt-security: remove invalid `'none'`s and duplicates
        (_options, nuxt) => {
          const nuxtConfigSecurity = nuxt.options.security

          if (
            typeof nuxtConfigSecurity.headers !== 'boolean' &&
            nuxtConfigSecurity.headers.contentSecurityPolicy &&
            typeof nuxtConfigSecurity.headers.contentSecurityPolicy !==
              'boolean' &&
            typeof nuxtConfigSecurity.headers.contentSecurityPolicy !== 'string'
          ) {
            for (const [key, value] of Object.entries(
              nuxtConfigSecurity.headers.contentSecurityPolicy,
            )) {
              if (!Array.isArray(value)) continue

              const valueFiltered = value.filter((x) => x !== "'none'")

              if (valueFiltered.length) {
                ;(
                  nuxtConfigSecurity.headers.contentSecurityPolicy as Record<
                    string,
                    any
                  >
                )[key] = [...new Set(valueFiltered)]
              }
            }
          }
        },
        'nuxt-security',
      ],
      nitro: {
        compressPublicAssets: true,
        experimental: {
          openAPI: process.env.NODE_ENV === 'development',
        },
      },
      runtimeConfig: {
        public: {
          i18n: {
            baseUrl: SITE_URL,
          },
          vio: {
            googleAnalyticsId: '',
            isInProduction: process.env.NODE_ENV === 'production',
            isTesting: false,
          },
        },
      },
      typescript: {
        shim: false,
        strict: true,
        tsConfig: {
          compilerOptions: {
            esModuleInterop: true,
            // moduleResolution: 'bundler',
            // noErrorTruncation: true,
          },
        },
      },

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
              id: 'ga',
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
      htmlValidator: {
        // failOnError: true, // TODO: enable once headers match requirements (https://github.com/unjs/unhead/issues/199#issuecomment-1815728703)
        logLevel: 'warning',
      },
      i18n: {
        detectBrowserLanguage: false,
      },
      linkChecker: {
        failOnError: true,
      },
      ogImage: {
        defaults: {
          extension: 'png', // TODO: remove once og-image requires jpg opt-in
        },
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
                    'script-src': ['https://static.cloudflareinsights.com'], // TODO: replace with `script-src-elem` once Webkit supports it (https://caniuse.com/mdn-http_headers_content-security-policy_script-src-elem)
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
              'script-src': ['https://*.googletagmanager.com'], // TODO: replace with `script-src-elem` once Webkit supports it (https://caniuse.com/mdn-http_headers_content-security-policy_script-src-elem)
            },
            {
              // vio
              'connect-src': ["'self'"], // `${SITE_URL}/api/healthcheck`
              'manifest-src': [`${SITE_URL}/site.webmanifest`],
              'script-src': [
                'https://polyfill.io/v3/polyfill.min.js', // ESLint plugin compat
              ], // TODO: replace with `script-src-elem` once Webkit supports it (https://caniuse.com/mdn-http_headers_content-security-policy_script-src-elem)
            },
            {
              // @nuxt/devtools
              ...(process.env.NODE_ENV === 'development'
                ? {
                    'frame-src': [
                      'http://localhost:3000/__nuxt_devtools__/client/',
                    ],
                  }
                : {}),
            },
            {
              // nuxt-i18n
              ...(process.env.NODE_ENV === 'development'
                ? {}
                : {
                    'script-src': ["'self'"], // 'http://localhost:3000/_nuxt/i18n.config.*.js' // TOD: add with subresource integrity?
                  }),
            },
            {
              // nuxt-link-checker
              ...(process.env.NODE_ENV === 'development'
                ? {
                    'connect-src': ["'self'"], // 'http://localhost:3000/api/__link_checker__/inspect'
                  }
                : {}),
            },
            {
              // nuxt-og-image
              ...(process.env.NODE_ENV === 'development'
                ? {
                    'font-src': ['https://fonts.gstatic.com/s/inter/'],
                    'frame-ancestors': ["'self'"],
                    'frame-src': ["'self'"],
                    'script-src': ['https://cdn.tailwindcss.com/'], // TODO: replace with `script-src-elem` once Webkit supports it (https://caniuse.com/mdn-http_headers_content-security-policy_script-src-elem)
                    'style-src': [
                      // TODO: replace with `style-src-elem` once Webkit supports it
                      'https://cdn.jsdelivr.net/npm/gardevoir https://fonts.googleapis.com/css2',
                    ],
                  }
                : {}),
            },
            {
              // nuxt-simple-sitemap
              'script-src': [`${SITE_URL}/__sitemap__/style.xsl`], // TODO: replace with `script-src-elem` once Webkit supports it (https://caniuse.com/mdn-http_headers_content-security-policy_script-src-elem)
            },
            {
              // nuxt
              'connect-src': [
                ...(process.env.NODE_ENV === 'development'
                  ? [
                      'http://localhost:3000/_nuxt/', // hot reload
                      'https://localhost:3000/_nuxt/', // hot reload
                      'ws://localhost:3000/_nuxt/', // hot reload
                      'wss://localhost:3000/_nuxt/', // hot reload
                    ]
                  : ["'self'"]), // build metadata and payloads
              ],
              'img-src': [
                "'self'", // TODO: replace with `"'nonce-{{nonce}}'",`
                'data:', // external link icon
              ],
              'script-src': ["'nonce-{{nonce}}'"], // TODO: replace with `script-src-elem` once Webkit supports it (https://caniuse.com/mdn-http_headers_content-security-policy_script-src-elem)
              'style-src': [
                // TODO: replace with `style-src-elem` once Webkit supports it
                "'self'", // TODO: replace with `"'nonce-{{nonce}}'",` (https://github.com/vitejs/vite/pull/11864)
                "'unsafe-inline'", // TODO: replace with `"'nonce-{{nonce}}'",` (https://github.com/vitejs/vite/pull/11864)
              ],
            },
            {
              // nitro
              'connect-src': ["'self'"] /* swagger
              'http://localhost:3000/_nitro/openapi.json',
              'http://localhost:3000/_nitro/swagger', */,
              'script-src': [
                'https://cdn.jsdelivr.net/npm/', // swagger // TODO: increase precision (https://github.com/unjs/nitro/issues/1757)
              ], // TODO: replace with `script-src-elem` once Webkit supports it (https://caniuse.com/mdn-http_headers_content-security-policy_script-src-elem)
              'style-src': [
                'https://cdn.jsdelivr.net/npm/', // swagger // TODO: increase precision (https://github.com/unjs/nitro/issues/1757)
              ],
            },
            {
              // base
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
              // TODO: evaluate header (https://github.com/maevsi/maevsi/issues/830) // https://stackoverflow.com/questions/62081028/this-document-requires-trustedscripturl-assignment
              // 'require-trusted-types-for': ["'script'"], // csp-evaluator
              sandbox: false as const,
              'script-src': false as const,
              'script-src-attr': false as const, // TODO: enable once Webkit supports it (https://caniuse.com/mdn-http_headers_content-security-policy_script-src-attr)
              'script-src-elem': false as const, // TODO: enable once Webkit supports it (https://caniuse.com/mdn-http_headers_content-security-policy_script-src-elem)
              'style-src': false as const,
              'style-src-attr': false as const, // TODO: enable once Webkit supports it (https://caniuse.com/mdn-http_headers_content-security-policy_style-src-attr)
              'style-src-elem': false as const, // TODO: enable once Webkit supports it (https://caniuse.com/mdn-http_headers_content-security-policy_style-src-elem)
              'upgrade-insecure-requests': false, // TODO: set to `process.env.NODE_ENV === 'production'` or `true` when tests run on https
              'worker-src': false as const,
            },
          ),
          crossOriginEmbedderPolicy: false, // https://stackoverflow.com/questions/71904052/getting-notsameoriginafterdefaultedtosameoriginbycoep-error-with-helmet
          strictTransportSecurity:
            process.env.NODE_ENV === 'production'
              ? {
                  maxAge: 31536000,
                  includeSubdomains: true,
                  preload: true,
                }
              : false,
          xXSSProtection: '1; mode=block', // TODO: set back to `0` once CSP does not use `unsafe-*` anymore (https://github.com/maevsi/maevsi/issues/1047)
        },
      },
      seo: {
        splash: false,
      },
      site: {
        debug: process.env.NODE_ENV === 'development',
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
        // modules
        security: {
          rateLimiter: false, // TODO: enable when nuxt-link-checker bundles requests (https://github.com/harlan-zw/nuxt-link-checker/issues/21)
        },
      },
    },
    VIO_NUXT_BASE_CONFIG({
      defaultLocale: 'en',
      siteName: SITE_NAME,
      stagingHost: 'localhost:3000',
    }),
  ),
)
