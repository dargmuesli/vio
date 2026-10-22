import * as Sentry from '@sentry/nuxt'
import { nodeProfilingIntegration } from '@sentry/profiling-node'

import {
  getSharedSentryConfig,
  IS_IN_PRODUCTION,
  NUXT_PUBLIC_SENTRY_ENVIRONMENT,
  NUXT_PUBLIC_SENTRY_HOST,
  NUXT_PUBLIC_SENTRY_LOGS_ENABLE,
  NUXT_PUBLIC_SENTRY_PROFILE_SESSION_SAMPLE_RATE,
  NUXT_PUBLIC_SENTRY_PROFILING_ENABLE,
  NUXT_PUBLIC_SENTRY_PROJECT_ID,
  NUXT_PUBLIC_SENTRY_PROJECT_PUBLIC_KEY,
  NUXT_PUBLIC_SENTRY_RELEASE,
} from './node/static'

const sharedSentryConfig = getSharedSentryConfig({
  environment: NUXT_PUBLIC_SENTRY_ENVIRONMENT,
  host: NUXT_PUBLIC_SENTRY_HOST,
  isInProduction: IS_IN_PRODUCTION,
  isTesting: !!process.env.NUXT_PUBLIC_VIO_IS_TESTING,
  projectId: NUXT_PUBLIC_SENTRY_PROJECT_ID,
  projectPublicKey: NUXT_PUBLIC_SENTRY_PROJECT_PUBLIC_KEY,
  release: NUXT_PUBLIC_SENTRY_RELEASE,
})

if (sharedSentryConfig.dsn) {
  Sentry.init({
    ...sharedSentryConfig,
    integrations: [
      ...(NUXT_PUBLIC_SENTRY_LOGS_ENABLE
        ? [Sentry.consoleLoggingIntegration()]
        : []),
      // v11 moved node profiling into the standalone `@sentry/profiling-node` package
      ...(NUXT_PUBLIC_SENTRY_PROFILING_ENABLE
        ? [nodeProfilingIntegration()]
        : []),
    ],
    profileLifecycle: 'trace',
    profileSessionSampleRate: NUXT_PUBLIC_SENTRY_PROFILING_ENABLE
      ? NUXT_PUBLIC_SENTRY_PROFILE_SESSION_SAMPLE_RATE
      : 0,
  })
} else {
  console.warn(
    'Sentry configuration is incomplete, skipping Sentry initialization.',
  )
}
