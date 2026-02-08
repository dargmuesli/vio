import { expect } from '@playwright/test'

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
      (await resp.text()).replaceAll(SITE_URL, 'https://example.com'),
    ).toMatchSnapshot(
      `robots-txt-content-${
        process.env.VIO_SERVER === 'dev' ? 'development' : 'production'
      }.txt`,
    )
  })
})
