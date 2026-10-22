import type * as Sentry from '@sentry/nuxt'

export const NUXT_PUBLIC_SENTRY_ENVIRONMENT =
  process.env.NUXT_PUBLIC_SENTRY_ENVIRONMENT
export const NUXT_PUBLIC_SENTRY_HOST = process.env.NUXT_PUBLIC_SENTRY_HOST || ''
export const NUXT_PUBLIC_SENTRY_LOGS_ENABLE =
  process.env.NUXT_PUBLIC_SENTRY_LOGS_ENABLE !== 'false'
export const NUXT_PUBLIC_SENTRY_PROFILE_SESSION_SAMPLE_RATE = Number.parseFloat(
  process.env.NUXT_PUBLIC_SENTRY_PROFILE_SESSION_SAMPLE_RATE ?? '0.1',
)
export const NUXT_PUBLIC_SENTRY_PROFILING_ENABLE =
  process.env.NUXT_PUBLIC_SENTRY_PROFILING_ENABLE !== 'false'
export const NUXT_PUBLIC_SENTRY_PROJECT_ID =
  process.env.NUXT_PUBLIC_SENTRY_PROJECT_ID || ''
export const NUXT_PUBLIC_SENTRY_PROJECT_PUBLIC_KEY =
  process.env.NUXT_PUBLIC_SENTRY_PROJECT_PUBLIC_KEY || ''
export const NUXT_PUBLIC_SENTRY_RELEASE = process.env.RELEASE_NAME

// v11's `dataCollection` collects more personal data by default than v10 did. This floor restores
// the previous, restrictive behavior for the categories v11 started to collect, without redefining
// Sentry's other defaults. Extending projects can relax or tighten any category through
// `runtimeConfig.public.sentry.dataCollection`, which is merged over this floor.
const SENTRY_DATA_COLLECTION_FLOOR: NonNullable<
  Parameters<typeof Sentry.init>[0]['dataCollection']
> = {
  cookies: false,
  databaseQueryData: false,
  genAI: {
    inputs: false,
    outputs: false,
  },
  graphQL: {
    document: false,
    variables: false,
  },
  httpBodies: [],
  userInfo: false,
}

export const getSharedSentryConfig = ({
  dataCollection,
  environment,
  host,
  isInProduction,
  isTesting,
  projectId,
  projectPublicKey,
  release,
}: {
  dataCollection?: Parameters<typeof Sentry.init>[0]['dataCollection']
  environment?: string
  host?: string
  isInProduction: boolean
  isTesting?: boolean
  projectId?: string
  projectPublicKey?: string
  release?: string
}): Parameters<typeof Sentry.init>[0] => ({
  dataCollection: {
    ...SENTRY_DATA_COLLECTION_FLOOR,
    ...dataCollection,
    genAI: {
      ...SENTRY_DATA_COLLECTION_FLOOR.genAI,
      ...dataCollection?.genAI,
    },
    graphQL: {
      ...SENTRY_DATA_COLLECTION_FLOOR.graphQL,
      ...dataCollection?.graphQL,
    },
  },
  dsn:
    projectPublicKey && host && projectId
      ? `https://${projectPublicKey}@${host}/${projectId}`
      : undefined,
  enabled: isInProduction && !isTesting,
  environment,
  release,
  tracesSampleRate: 1.0,
})
