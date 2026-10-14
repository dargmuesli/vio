import * as Sentry from '@sentry/nuxt'

const runtimeConfig = useRuntimeConfig()
const sharedSentryConfig = useSharedSentryConfig()

if (sharedSentryConfig.dsn) {
  const features = runtimeConfig.public.sentry.features

  Sentry.init({
    ...sharedSentryConfig,
    dataCollection: {
      ...sharedSentryConfig.dataCollection,
      httpHeaders: false, // v10 attached no headers to `httpClientIntegration` events
    },
    integrations: [
      ...(features.profiling ? [Sentry.browserProfilingIntegration()] : []),
      ...(features.consoleCapture ? [Sentry.captureConsoleIntegration()] : []),
      ...(features.consoleCapture && runtimeConfig.public.sentry.logs.enable
        ? [Sentry.consoleLoggingIntegration()]
        : []),
      Sentry.httpClientIntegration(),
      ...(features.pinia ? [Sentry.piniaIntegration(usePinia())] : []),
      ...(features.replay ? [Sentry.replayIntegration()] : []),
      Sentry.zodErrorsIntegration(),
    ],
    profileLifecycle: 'trace',
    profileSessionSampleRate: features.profiling
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
