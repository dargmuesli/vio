import { test, expect } from '@playwright/test'

test.describe('headers middleware', () => {
  test('sets the correct CSP header', async ({ request }) => {
    const headers = (await request.get('/')).headers()

    expect(headers['access-control-allow-origin']).toStrictEqual('*')
    expect(headers['cross-origin-opener-policy']).toStrictEqual('same-origin')
    expect(headers['cross-origin-resource-policy']).toStrictEqual('same-origin')
    expect(headers.nel).toStrictEqual(
      '\'{"report_to":"default","max_age":31536000,"include_subdomains":true}\'',
    )
    expect(headers['origin-agent-cluster']).toStrictEqual('?1')
    expect(headers['permissions-policy']).toStrictEqual('')
    expect(headers['referrer-policy']).toStrictEqual('no-referrer')
    expect(headers['report-to']).toStrictEqual(
      '\'{"group":"default":"max_age":31536000:"endpoints":[{"url":"https://dargmuesli.report-uri.com/a/d/g"}]:"include_subdomains":true}\'',
    )
    expect(headers['x-content-type-options']).toStrictEqual('nosniff')
    expect(headers['x-dns-prefetch-control']).toStrictEqual('off')
    expect(headers['x-download-options']).toStrictEqual('noopen')
    expect(headers['x-frame-options']).toStrictEqual('SAMEORIGIN')
    expect(headers['x-permitted-cross-domain-policies']).toStrictEqual('none')
    expect(headers['x-xss-protection']).toStrictEqual('1; mode=block')
    expect(headers['x-robots-tag']).toStrictEqual('noindex, nofollow')
    expect(headers['content-type']).toStrictEqual('text/html;charset=utf-8')
    expect(headers['x-powered-by']).toStrictEqual('Nuxt')
    expect(headers.connection).toStrictEqual('close')
  })
})
