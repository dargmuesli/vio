import { test, expect } from '@playwright/test'
import { escapeRegExp } from 'lodash-es'

import { SITE_URL } from '#tests/e2e/utils/constants'

const path = '/sitemap_index.xml'

test.describe('page load', () => {
  test('loads the page successfully', async ({ request }) => {
    const resp = await request.get(path)
    expect(resp.status()).toBe(200)
  })
})

test.describe('sitemap', () => {
  const languages = ['en', 'de']

  test('index', async ({ request }) => {
    const resp = await request.get(path)
    const text = await resp.text()

    for (const language of languages) {
      expect(text).toContain(`${SITE_URL}/__sitemap__/${language}.xml`)
    }
  })

  test('content', async ({ request }) => {
    for (const language of languages) {
      const resp = await request.get(`/__sitemap__/${language}.xml`)
      const text = await resp.text()

      expect(
        text
          .replace(/\n.+<\/lastmod>/g, '')
          .replace(
            new RegExp(escapeRegExp(SITE_URL), 'g'),
            'https://example.com',
          ),
      ).toMatchSnapshot(`sitemap-content-${language}.txt`)
    }
  })
})
