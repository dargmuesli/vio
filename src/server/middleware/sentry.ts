export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig(event)
  const sentryConfig = runtimeConfig.public.sentry

  if (
    !sentryConfig.features.securityHeaders ||
    !sentryConfig.host ||
    !sentryConfig.project.id ||
    !sentryConfig.project.publicKey
  ) {
    return
  }

  const securityEndpointParams = [
    `sentry_key=${sentryConfig.project.publicKey}`,
    sentryConfig.environment &&
      `sentry_environment=${sentryConfig.environment}`,
    sentryConfig.release && `sentry_release=${sentryConfig.release}`,
  ]
    .filter(Boolean)
    .join('&')

  appendHeader(
    event,
    'NEL',
    '\'{"report_to":"sentry","max_age":31536000,"include_subdomains":true}\'',
  )
  appendHeader(
    event,
    'Report-To',
    `'{"group":"sentry","max_age":31536000,"endpoints":[{"url":"https://${sentryConfig.host}/api/${sentryConfig.project.id}/security/?${securityEndpointParams}"}],"include_subdomains":true}'`,
  )
})
