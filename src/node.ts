export const IS_IN_PRODUCTION = process.env.NODE_ENV === 'production'
export const IS_IN_STACK = !!process.env.NUXT_PUBLIC_SITE_URL
