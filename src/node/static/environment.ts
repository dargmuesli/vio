export const IS_IN_PRODUCTION = process.env.NODE_ENV === 'production'
export const IS_IN_STACK = !!process.env.NUXT_PUBLIC_I18N_BASE_URL
export const IS_IN_FRONTEND_DEVELOPMENT = !IS_IN_PRODUCTION && !IS_IN_STACK

export const SITE_URL =
  process.env.NUXT_PUBLIC_SITE_URL ||
  `https://${process.env.HOST || 'app.localhost'}:${process.env.PORT || '3000'}`
