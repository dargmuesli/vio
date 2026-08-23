export type Service = {
  hasSubdomain: boolean
  port: number
}

export const SERVICES = {
  strapi: { hasSubdomain: true, port: 1337 },
} as const satisfies Record<string, Service>

// The open string branch accepts services registered by extending projects through VIO_NUXT_BASE_CONFIG's `services` option, while still keeping autocomplete for the built-in names.
export type ServiceName = keyof typeof SERVICES | (string & {})
