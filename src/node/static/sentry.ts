import type * as Sentry from '@sentry/nuxt'

export const NUXT_PUBLIC_SENTRY_ENVIRONMENT =
  process.env.NUXT_PUBLIC_SENTRY_ENVIRONMENT
export const NUXT_PUBLIC_SENTRY_HOST = process.env.NUXT_PUBLIC_SENTRY_HOST || ''
export const NUXT_PUBLIC_SENTRY_LOGS_ENABLE =
  process.env.NUXT_PUBLIC_SENTRY_LOGS_ENABLE !== 'false'
export const NUXT_PUBLIC_SENTRY_PROJECT_ID =
  process.env.NUXT_PUBLIC_SENTRY_PROJECT_ID || ''
export const NUXT_PUBLIC_SENTRY_PROJECT_PUBLIC_KEY =
  process.env.NUXT_PUBLIC_SENTRY_PROJECT_PUBLIC_KEY || ''
export const NUXT_PUBLIC_SENTRY_RELEASE = process.env.RELEASE_NAME

export const getSharedSentryConfig = ({
  enableLogs,
  environment,
  host,
  isInProduction,
  isTesting,
  projectId,
  projectPublicKey,
  release,
}: {
  enableLogs?: boolean
  environment?: string
  host?: string
  isInProduction: boolean
  isTesting?: boolean
  projectId?: string
  projectPublicKey?: string
  release?: string
}): Parameters<typeof Sentry.init>[0] => ({
  dsn:
    projectPublicKey && host && projectId
      ? `https://${projectPublicKey}@${host}/${projectId}`
      : undefined,
  enabled: isInProduction && !isTesting,
  enableLogs,
  environment,
  release,
  tracesSampleRate: 1.0,
})
