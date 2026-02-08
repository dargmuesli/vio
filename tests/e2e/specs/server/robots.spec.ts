import { expect } from '@playwright/test'
import { escapeRegExp } from 'lodash-es'

import { vioTest } from '#tests/e2e/fixtures/vioTest'
import { SITE_URL } from '#tests/e2e/utils/constants'

const path = '/robots.txt'

vioTest.describe('page load', () => {
  vioTest('loads the page successfully', async ({ request }) => {
    const resp = await request.get(path)
    expect(resp.status()).toBe(200)
  })
})

vioTest.describe('robots.txt', () => {
  vioTest('content', async ({ request }) => {
    const resp = await request.get(path)
    expect(
      (await resp.text()).replace(
        new RegExp(escapeRegExp(SITE_URL), 'g'),
        'https://example.com',
      ),
    ).toMatchSnapshot(
      `robots-txt-content-${
        process.env.NODE_ENV === 'production' ? 'production' : 'development'
      }.txt`,
    )
  })
})
