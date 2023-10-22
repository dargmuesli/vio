import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defu } from 'defu'

import {
  SITE_URL,
  I18N_MODULE_CONFIG,
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
        clipboard: 'clipboard',
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
        '@pinia/nuxt',
        // nuxt-security: remove invalid `'none'`s
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
                )[key] = valueFiltered
              }
            }
          }
        },
        'nuxt-security',
        '@nuxtseo/module',
      ],
      nitro: {
        compressPublicAssets: true,
      },
      runtimeConfig: {
        public: {
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
        failOnError: true,
        logLevel: 'warning',
      },
      i18n: {
        baseUrl: SITE_URL,
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
                    'connect-src': [`${SITE_URL}/cdn-cgi/rum`],
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
              'script-src-elem': [
                'https://polyfill.io/v3/polyfill.min.js', // ESLint plugin compat
              ],
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
              // nuxt-link-checker
              ...(process.env.NODE_ENV === 'development'
                ? {
                    'connect-src': [
                      'http://localhost:3000/api/__link_checker__/inspect',
                    ],
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
                    'script-src-elem': ['https://cdn.tailwindcss.com/'],
                    'style-src': [
                      // TODO: replace with `style-src-elem` once Webkit supports it
                      'https://cdn.jsdelivr.net/npm/gardevoir https://fonts.googleapis.com/css2',
                    ],
                  }
                : {}),
            },
            {
              // nuxt-simple-sitemap
              'script-src-elem': [`${SITE_URL}/__sitemap__/style.xsl`],
            },
            {
              // nuxt
              'connect-src': [
                ...(process.env.NODE_ENV === 'development'
                  ? [
                      'http://localhost:3000/_nuxt/', // Nuxt development
                      'https://localhost:3000/_nuxt/', // Nuxt development
                      'ws://localhost:3000/_nuxt/', // Nuxt development
                      'wss://localhost:3000/_nuxt/', // Nuxt development
                    ]
                  : ["'self'"]), // Nuxt build metadata and payloads
              ],
              'img-src': [
                "'self'", // TODO: replace with `"'nonce-{{nonce}}'",`
                'data:', // external link icon
              ],
              'script-src-elem': ["'nonce-{{nonce}}'"],
              'style-src': [
                // TODO: replace with `style-src-elem` once Webkit supports it
                "'self'", // TODO: replace with `"'nonce-{{nonce}}'",` (https://github.com/vitejs/vite/pull/11864)
                "'unsafe-inline'", // TODO: replace with `"'nonce-{{nonce}}'",` (https://github.com/vitejs/vite/pull/11864)
              ],
            },
            {
              // base
              'base-uri': ["'none'"], // does not fallback to `default-src`
              'child-src': [],
              'connect-src': [],
              'default-src': ["'none'"],
              'font-src': [],
              'form-action': ["'none'"], // does not fallback to `default-src`
              'frame-ancestors': ["'none'"], // does not fallback to `default-src`
              'frame-src': [],
              'img-src': [],
              'media-src': [],
              'navigate-to': [],
              'object-src': [],
              'prefetch-src': [],
              'report-to': [],
              'report-uri': [],
              // TODO: evaluate header (https://github.com/maevsi/maevsi/issues/830) // https://stackoverflow.com/questions/62081028/this-document-requires-trustedscripturl-assignment
              // 'require-trusted-types-for': ["'script'"], // csp-evaluator
              sandbox: [],
              'script-src': [],
              'script-src-attr': [],
              'script-src-elem': [],
              'style-src': [],
              'style-src-attr': [],
              'style-src-elem': [],
              'upgrade-insecure-requests': false, // TODO: set to `process.env.NODE_ENV === 'production'` or `true` when tests run on https
              'worker-src': [],
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
        nonce: {
          enabled: true,
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
        exclude: I18N_MODULE_CONFIG.locales.map(
          (locale) =>
            `/${locale.code !== 'en' ? `${locale.code}/` : ''}api/pages/**`,
        ),
      },
      tailwindcss: {
        cssPath: join(currentDir, './assets/css/tailwind.css'),
      },
    },
    VIO_NUXT_BASE_CONFIG({
      defaultLocale: 'en',
      siteName: SITE_NAME,
      stagingHost: 'localhost:3000',
    }),
  ),
)
