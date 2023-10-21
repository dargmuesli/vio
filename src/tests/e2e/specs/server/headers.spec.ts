import { test, expect } from '@playwright/test'

test.describe('headers middleware', () => {
  test('sets the correct security headers', async ({ request }) => {
    const headers = (await request.get('/')).headers()

    // expect(JSON.stringify(headers)).toMatchSnapshot()
    expect(headers['access-control-allow-origin']).toStrictEqual('*')
    expect(
      headers['content-security-policy'].replace(
        /nonce-[A-Za-z0-9]+/g,
        'nonce',
      ),
    ).toStrictEqual(
      process.env.NODE_ENV === 'production'
        ? "base-uri 'none'" +
            "; form-action 'none'" +
            "; frame-ancestors 'none'" +
            "; img-src https://*.google-analytics.com https://*.googletagmanager.com 'self' data:" +
            "; style-src 'self' 'unsafe-inline'" +
            // '; upgrade-insecure-requests' + // TODO: enable when tests run on https
            '; connect-src https://*.analytics.google.com https://*.google-analytics.com https://*.googletagmanager.com' +
            "; default-src 'none'" +
            "; script-src-elem https://*.googletagmanager.com https://polyfill.io/v3/polyfill.min.js http://localhost:3000/__sitemap__/style.xsl 'nonce'" +
            '; manifest-src http://localhost:3000/site.webmanifest'
        : "base-uri 'none'" +
            "; form-action 'none'" +
            "; frame-ancestors 'none'" +
            "; img-src https://*.google-analytics.com https://*.googletagmanager.com 'self' data:" +
            "; style-src 'self' 'unsafe-inline'" +
            '; connect-src https://*.analytics.google.com https://*.google-analytics.com https://*.googletagmanager.com http://localhost:3000/api/__link_checker__/inspect http://localhost:3000/_nuxt/ https://localhost:3000/_nuxt/ ws://localhost:3000/_nuxt/ wss://localhost:3000/_nuxt/' +
            "; default-src 'none'" +
            '; frame-src http://localhost:3000/__nuxt_devtools__/client/' +
            "; script-src-elem https://*.googletagmanager.com https://polyfill.io/v3/polyfill.min.js http://localhost:3000/__sitemap__/style.xsl 'nonce'" +
            '; manifest-src http://localhost:3000/site.webmanifest',
    )
    expect('cross-origin-embedder-policy' in headers).toBeFalsy() // https://stackoverflow.com/questions/71904052/getting-notsameoriginafterdefaultedtosameoriginbycoep-error-with-helmet
    expect(headers['cross-origin-opener-policy']).toStrictEqual('same-origin')
    expect(headers['cross-origin-resource-policy']).toStrictEqual('same-origin')
    expect('expect-ct' in headers).toBeFalsy() // deprecated (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expect-CT)
    expect(headers.nel).toStrictEqual(
      '\'{"report_to":"default","max_age":31536000,"include_subdomains":true}\'',
    )
    expect(headers['origin-agent-cluster']).toStrictEqual('?1')
    expect(headers['permissions-policy']).toStrictEqual(
      'camera=(), display-capture=(), fullscreen=(), geolocation=(), microphone=()',
    )
    expect(headers['referrer-policy']).toStrictEqual('no-referrer')
    expect(headers['report-to']).toStrictEqual(
      '\'{"group":"default":"max_age":31536000:"endpoints":[{"url":"https://dargmuesli.report-uri.com/a/d/g"}]:"include_subdomains":true}\'',
    )

    if (process.env.NODE_ENV === 'production') {
      expect(headers['strict-transport-security']).toStrictEqual(
        'max-age=31536000; includeSubDomains; preload',
      )
    } else {
      expect('strict-transport-security' in headers).toBeFalsy()
    }

    expect(headers['x-content-type-options']).toStrictEqual('nosniff')
    expect(headers['x-dns-prefetch-control']).toStrictEqual('off')
    expect(headers['x-download-options']).toStrictEqual('noopen')
    expect(headers['x-frame-options']).toStrictEqual('SAMEORIGIN')
    expect(headers['x-permitted-cross-domain-policies']).toStrictEqual('none')
    expect(headers['x-xss-protection']).toStrictEqual('1; mode=block')

    if (process.env.NODE_ENV === 'production') {
      expect('x-robots-tag' in headers).toBeFalsy()
    } else {
      expect(headers['x-robots-tag']).toStrictEqual('noindex, nofollow')
    }

    expect(headers['content-type']).toStrictEqual('text/html;charset=utf-8')
    expect('x-powered-by' in headers).toBeFalsy()
    expect(headers.connection).toStrictEqual('close')
  })
})
