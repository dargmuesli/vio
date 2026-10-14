import * as Sentry from '@sentry/nuxt'

import {
  getSharedSentryConfig,
  IS_IN_PRODUCTION,
  NUXT_PUBLIC_SENTRY_ENVIRONMENT,
  NUXT_PUBLIC_SENTRY_HOST,
  NUXT_PUBLIC_SENTRY_LOGS_ENABLE,
  NUXT_PUBLIC_SENTRY_PROJECT_ID,
  NUXT_PUBLIC_SENTRY_PROJECT_PUBLIC_KEY,
  NUXT_PUBLIC_SENTRY_RELEASE,
} from './node/static'

const sharedSentryConfig = getSharedSentryConfig({
  enableLogs: NUXT_PUBLIC_SENTRY_LOGS_ENABLE,
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
    integrations: NUXT_PUBLIC_SENTRY_LOGS_ENABLE
      ? [Sentry.consoleLoggingIntegration()]
      : [],
  })
} else {
  console.warn(
    'Sentry configuration is incomplete, skipping Sentry initialization.',
  )
}
