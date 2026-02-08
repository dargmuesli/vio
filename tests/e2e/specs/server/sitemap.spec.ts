import { expect } from '@playwright/test'

import { vioTest } from '#tests/e2e/fixtures/vioTest'
import { SITE_URL } from '#tests/e2e/utils/constants'

const path = '/sitemap_index.xml'

vioTest.describe('page load', () => {
  vioTest('loads the page successfully', async ({ request }) => {
    const resp = await request.get(path)
    expect(resp.status()).toBe(200)
  })
})

vioTest.describe('sitemap', () => {
  const languages = ['en', 'de']

  vioTest('index', async ({ request }) => {
    const resp = await request.get(path)
    const text = await resp.text()

    for (const language of languages) {
      expect(text).toContain(`${SITE_URL}/__sitemap__/${language}.xml`)
    }
  })

  vioTest('content', async ({ request }) => {
    for (const language of languages) {
      const resp = await request.get(`/__sitemap__/${language}.xml`)
      const text = (await resp.text())
        .replaceAll(/\n.+<\/lastmod>/g, '')
        .replaceAll(SITE_URL, 'https://example.com')

      if (process.env.VIO_SERVER === 'static') {
        expect(text)
          .toContain(`<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/__sitemap__/style.xsl"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`)
        expect(text).toContain(`<url>
        <loc>https://example.com${language === 'en' ? '/' : `/${language}`}</loc>
        <xhtml:link rel="alternate" href="https://example.com/" hreflang="x-default" />
        <xhtml:link rel="alternate" href="https://example.com/" hreflang="en" />
        <xhtml:link rel="alternate" href="https://example.com/de" hreflang="de" />
    </url>`)
        expect(text).toContain(
          `<loc>https://example.com${language === 'en' ? '' : `/${language}`}/legal-notice</loc>`,
        )
        expect(text).toContain(
          '<xhtml:link rel="alternate" href="https://example.com/legal-notice" hreflang="x-default" />',
        )
        expect(text).toContain(
          '<xhtml:link rel="alternate" href="https://example.com/legal-notice" hreflang="en" />',
        )
        expect(text).toContain(
          '<xhtml:link rel="alternate" href="https://example.com/de/legal-notice" hreflang="de" />',
        )
        expect(text).toContain(
          `<loc>https://example.com${language === 'en' ? '' : `/${language}`}/privacy-policy</loc>`,
        )
        expect(text).toContain(
          '<xhtml:link rel="alternate" href="https://example.com/privacy-policy" hreflang="x-default" />',
        )
        expect(text).toContain(
          '<xhtml:link rel="alternate" href="https://example.com/privacy-policy" hreflang="en" />',
        )
        expect(text).toContain(
          '<xhtml:link rel="alternate" href="https://example.com/de/privacy-policy" hreflang="de" />',
        )
      } else {
        expect(text).toMatchSnapshot(`sitemap-content-${language}.txt`)
      }
    }
  })
})
