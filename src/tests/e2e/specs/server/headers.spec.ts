import { test, expect } from '@playwright/test'

test.describe('headers middleware', () => {
  test('sets the correct security headers', async ({ request }) => {
    if (process.env.VIO_SERVER === 'static') return // TODO: use single snapshot and all servers

    const headers = (await request.get('/')).headers()

    expect(headers.connection).toStrictEqual('close')
    expect(headers['access-control-allow-origin']).toStrictEqual('*')
    expect(
      headers['content-security-policy'].replace(/nonce-[^']+/g, 'nonce'),
    ).toMatchSnapshot(
      `csp-${
        process.env.NODE_ENV === 'production' ? 'production' : 'development'
      }.txt`,
    )
    expect(headers['content-type']).toStrictEqual('text/html;charset=utf-8')
    expect(headers['cross-origin-embedder-policy']).toStrictEqual(
      process.env.NODE_ENV === 'production' ? 'require-corp' : 'unsafe-none',
    ) // https://stackoverflow.com/questions/71904052/getting-notsameoriginafterdefaultedtosameoriginbycoep-error-with-helmet
    expect(headers['cross-origin-opener-policy']).toStrictEqual('same-origin')
    expect(headers['cross-origin-resource-policy']).toStrictEqual('same-origin')
    expect('expect-ct' in headers).toBeFalsy() // deprecated (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expect-CT)
    expect(headers.nel).toStrictEqual(
      '\'{"report_to":"csp-endpoint","max_age":31536000,"include_subdomains":true}\'',
    )
    expect(headers['origin-agent-cluster']).toStrictEqual('?1')
    expect(headers['permissions-policy']).toStrictEqual(
      'camera=(), display-capture=(), fullscreen=(), geolocation=(), microphone=()',
    )
    expect(headers['referrer-policy']).toStrictEqual('no-referrer')
    expect(headers['report-to']).toStrictEqual(
      '{"group":"csp-endpoint","max_age":10886400,"endpoints":[{"url":"https://o4507259039973376.ingest.sentry.io/api/4507260561653840/security/?sentry_key=1e53178c1dba9b39147de4a21853a3e3"}],"include_subdomains":true}}',
    )

    if (process.env.NODE_ENV === 'production') {
      expect(headers['strict-transport-security']).toStrictEqual(
        'max-age=31536000; includeSubDomains; preload;',
      )
    } else {
      expect('strict-transport-security' in headers).toBeFalsy()
    }

    expect(headers['x-content-type-options']).toStrictEqual('nosniff')
    expect(headers['x-dns-prefetch-control']).toStrictEqual('off')
    expect(headers['x-download-options']).toStrictEqual('noopen')
    expect(headers['x-frame-options']).toStrictEqual('SAMEORIGIN')
    expect(headers['x-permitted-cross-domain-policies']).toStrictEqual('none')
    expect('x-powered-by' in headers).toBeFalsy()
    expect(headers['x-xss-protection']).toStrictEqual('1; mode=block')
  })
})
