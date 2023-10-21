export default defineAppConfig({
  vio: {
    pages: undefined,
    server: {
      middleware: {
        headers: {
          csp: {
            default: {
              NEL: '\'{"report_to":"default","max_age":31536000,"include_subdomains":true}\'',
              'Report-To':
                '\'{"group":"default":"max_age":31536000:"endpoints":[{"url":"https://dargmuesli.report-uri.com/a/d/g"}]:"include_subdomains":true}\'',
            },
            production: {} as Record<string, string>,
          },
        },
      },
    },
    themeColor: undefined,
  },
})

declare module 'nuxt/schema' {
  interface AppConfigInput {
    vio: {
      pages?: {
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
      }
      server?: {
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
