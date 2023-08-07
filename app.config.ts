import { useServerSeoMeta } from '@unhead/vue'

export default defineAppConfig({
  vio: {
    legalNotice: undefined,
    privacyPolicy: undefined,
    seoMeta: {
      twitterSite: '@dargmuesli',
    },
    server: {
      middleware: {
        headers: {
          csp: {
            default: {
              'Cross-Origin-Opener-Policy': 'same-origin',
              // 'Cross-Origin-Embedder-Policy', 'require-corp') // https://stackoverflow.com/questions/71904052/getting-notsameoriginafterdefaultedtosameoriginbycoep-error-with-helmet
              'Cross-Origin-Resource-Policy': 'same-origin',
              // 'Expect-CT', 'max-age=0') // deprecated (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expect-CT)
              NEL: '\'{"report_to":"default","max_age":31536000,"include_subdomains":true}\'',
              'Origin-Agent-Cluster': '?1',
              'Permissions-Policy': '',
              'Referrer-Policy': 'no-referrer',
              'Report-To':
                '\'{"group":"default":"max_age":31536000:"endpoints":[{"url":"https://dargmuesli.report-uri.com/a/d/g"}]:"include_subdomains":true}\'',
              'X-Content-Type-Options': 'nosniff',
              'X-DNS-Prefetch-Control': 'off',
              'X-Download-Options': 'noopen',
              'X-Frame-Options': 'SAMEORIGIN',
              'X-Permitted-Cross-Domain-Policies': 'none',
              'X-XSS-Protection': '1; mode=block', // TODO: set back to `0` once CSP does not use `unsafe-*` anymore (https://github.com/maevsi/maevsi/issues/1047)
            },
            production: {
              'Strict-Transport-Security':
                'max-age=31536000; includeSubDomains; preload',
            },
          },
        },
      },
    },
    themeColor: '#202020',
  },
})

declare module 'nuxt/schema' {
  interface AppConfig {
    vio: {
      legalNotice?: {
        contact: {
          email: string
        }
        responsibility: {
          address: {
            city: string
            name: string
            street: string
          }
        }
        tmg: {
          address: {
            city: string
            name: string
            street: string
          }
        }
      }
      privacyPolicy?: {
        hostingCdn?: {
          external: {
            address: {
              city: string
              name: string
              street: string
            }
          }
        }
        mandatoryInfo?: {
          responsible: {
            address: {
              city: string
              email: string
              name: string
              street: string
            }
          }
        }
      }
      seoMeta?: Parameters<typeof useServerSeoMeta>[0]
      server: {
        middleware: {
          headers: {
            csp: {
              default: Record<string, string>
              production: Record<string, string>
            }
          }
        }
      }
      themeColor?: string
    }
  }
}
