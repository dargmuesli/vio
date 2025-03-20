export default defineAppConfig({
  vio: {
    pages: undefined,
    themeColor: undefined,
  },
})

export type AppConfig = {
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
        headers: Record<string, string>
      }
    }
    themeColor?: string
  }
}
