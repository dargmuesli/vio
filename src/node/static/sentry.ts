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
  environment,
  host,
  isInProduction,
  isTesting,
  projectId,
  projectPublicKey,
  release,
}: {
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
  // keeps the v10 defaults, which v11 widened to collect personal data like cookies, bodies and ips
  dataCollection: {
    cookies: false,
    databaseQueryData: false,
    frameContextLines: 7,
    genAI: { inputs: false, outputs: false },
    graphQL: { document: false, variables: false },
    httpBodies: [],
    httpHeaders: {
      request: { deny: ['forwarded', '-ip', 'remote-', 'via', '-user'] },
      response: { deny: ['forwarded', '-ip', 'remote-', 'via', '-user'] },
    },
    queues: false,
    urlQueryParams: { deny: ['forwarded', '-ip', 'remote-', 'via', '-user'] },
    userInfo: false, // data set through Sentry's user setter is sent regardless
  },
  enabled: isInProduction && !isTesting,
  environment,
  release,
  tracesSampleRate: 1.0,
})
