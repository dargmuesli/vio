import { createTransport, type Transporter } from 'nodemailer'

export default defineNitroPlugin((nitroApp) => {
  const runtimeConfig = useRuntimeConfig()

  if (!runtimeConfig.vio.email.nodemailer.transport) {
    ;(import.meta.dev ? console.warn : console.error)(
      'The SMTP configuration secret is missing!',
    )
    return
  }

  const transporter = createTransport(
    runtimeConfig.vio.email.nodemailer.transport,
  )

  nitroApp.hooks.hook('request', (event) => {
    event.context.$email = {
      nodemailer: {
        transporter,
      },
    }
  })

  nitroApp.hooks.hookOnce('close', () => {
    transporter.close()
  })
})

type EmailContext = {
  nodemailer: {
    transporter: Transporter
  }
}

declare module '@nuxt/schema' {
  interface RequestEventContext {
    $email?: EmailContext
  }
}

declare module 'h3' {
  interface H3EventContext {
    $email?: EmailContext
  }
}
