import type { Transporter } from 'nodemailer'

// in `shared/` because typed `$fetch` also type-checks server handlers in the app context
declare module '@nuxt/schema' {
  interface RequestEventContext {
    $email?: {
      nodemailer: {
        transporter: Transporter
      }
    }
    $timeZone?: string
  }
}
