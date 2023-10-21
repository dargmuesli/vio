import { test, expect } from '@playwright/test'
import { escapeRegExp } from 'lodash-es'

import { SITE_URL } from '../../../../utils/constants'

const path = '/robots.txt'

test.describe('page load', () => {
  test('loads the page successfully', async ({ request }) => {
    const resp = await request.get(path)
    expect(resp.status()).toBe(200)
  })
})

test.describe('robots.txt', () => {
  test('content', async ({ request }) => {
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
