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

      expect(text).toMatchSnapshot(
        `sitemap-content-${process.env.VIO_SERVER}-${language}.txt`,
      )
    }
  })
})
