// in `shared/` so that both the app's and the server's `useAppConfig` are typed
declare module '@nuxt/schema' {
  interface CustomAppConfig {
    vio: {
      seo?: {
        ogImage?: {
          defaultComponent: string // TODO: keyof OgImageComponents
        }
      }
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
          headers: Record<string, string>
        }
      }
      themeColor?: string
    }
  }
}

export {}
