import * as Sentry from '@sentry/nuxt'

const runtimeConfig = useRuntimeConfig()
const sharedSentryConfig = useSharedSentryConfig()

if (sharedSentryConfig.dsn) {
  const features = runtimeConfig.public.sentry.features

  Sentry.init({
    ...sharedSentryConfig,
    integrations: [
      ...(features.profiling ? [Sentry.browserProfilingIntegration()] : []),
      ...(features.consoleCapture
        ? [
            Sentry.captureConsoleIntegration(),
            Sentry.consoleLoggingIntegration(),
          ]
        : []),
      Sentry.httpClientIntegration(),
      ...(features.pinia ? [Sentry.piniaIntegration(usePinia())] : []),
      ...(features.replay ? [Sentry.replayIntegration()] : []),
      Sentry.zodErrorsIntegration(),
    ],
    profilesSampleRate: features.profiling
      ? runtimeConfig.public.sentry.profiles.sampleRate
      : undefined,
    replaysOnErrorSampleRate: features.replay
      ? runtimeConfig.public.sentry.replays.onError.sampleRate
      : undefined,
    replaysSessionSampleRate: features.replay
      ? runtimeConfig.public.sentry.replays.session.sampleRate
      : undefined,
  })
} else {
  console.warn(
    'Sentry configuration is incomplete, skipping Sentry initialization.',
  )
}
