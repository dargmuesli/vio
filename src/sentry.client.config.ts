import * as Sentry from '@sentry/nuxt'

import { getTracePropagationTargets } from './node/networking'

const runtimeConfig = useRuntimeConfig()
const sharedSentryConfig = useSharedSentryConfig()

if (sharedSentryConfig.dsn) {
  const features = runtimeConfig.public.sentry.features

  Sentry.init({
    ...sharedSentryConfig,
    integrations: [
      ...(features.profiling ? [Sentry.browserProfilingIntegration()] : []),
      ...(features.consoleCapture ? [Sentry.captureConsoleIntegration()] : []),
      ...(runtimeConfig.public.sentry.logs.enable
        ? [Sentry.consoleLoggingIntegration()]
        : []),
      Sentry.httpClientIntegration(),
      ...(features.graphqlClient
        ? [Sentry.graphqlClientIntegration({ endpoints: [/\/graphql$/] })]
        : []),
      ...(features.pinia ? [Sentry.piniaIntegration(usePinia())] : []),
      ...(features.replay
        ? [
            // replays are personal data, so everything is masked by default (GDPR)
            Sentry.replayIntegration({
              maskAllInputs: true,
              maskAllText: true,
            }),
          ]
        : []),
      Sentry.zodErrorsIntegration(),
    ],
    // v11 replaced `profilesSampleRate` with `profileSessionSampleRate` (defaulting to `0`) and
    // `profileLifecycle` (defaulting to `'manual'`); both are required to keep the v10 behavior
    profileLifecycle: 'trace',
    profileSessionSampleRate: features.profiling
      ? runtimeConfig.public.sentry.profiles.sampleRate
      : 0,
    replaysOnErrorSampleRate: features.replay
      ? runtimeConfig.public.sentry.replays.onError.sampleRate
      : undefined,
    replaysSessionSampleRate: features.replay
      ? runtimeConfig.public.sentry.replays.session.sampleRate
      : undefined,
    tracePropagationTargets: getTracePropagationTargets({
      baseUrl: runtimeConfig.public.i18n.baseUrl,
      services: runtimeConfig.public.vio.services,
    }),
  })
} else {
  console.warn(
    'Sentry configuration is incomplete, skipping Sentry initialization.',
  )
}
