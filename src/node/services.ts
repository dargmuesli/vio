export const SERVICES = {
  strapi: { hasSubdomain: true, port: 1337 },
} as const satisfies Record<string, { hasSubdomain: boolean; port: number }>

export type ServiceName = keyof typeof SERVICES
