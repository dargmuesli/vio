import { consola } from 'consola'

/**
 * Verifies a Turnstile token from the request body
 * @throws {Error} If token is missing or verification fails
 */
export const assertTurnstileValid = async ({ token }: { token?: string }) => {
  if (!token) {
    throw createError({
      status: 422,
      statusText: 'Turnstile token not provided.',
    })
  }

  const result = await verifyTurnstileToken(token)

  if (!result.success) {
    throw createError({
      status: 403,
      statusText: `Turnstile verification unsuccessful: ${result['error-codes'].join(', ')}`,
    })
  }

  consola.debug('Turnstile verification succeeded')
}
