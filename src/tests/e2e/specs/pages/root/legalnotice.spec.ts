import { test, expect } from '@playwright/test'

import { COOKIE_CONTROL_DEFAULT, PAGE_READY } from '../../../utils/constants'

test.beforeEach(async ({ context }) => {
  await context.addCookies([
    {
      name: 'ncc_c',
      value: COOKIE_CONTROL_DEFAULT,
      domain: 'localhost',
      path: '/',
    },
  ])
})

test.describe('page', () => {
  test('status code', async ({ request }) => {
    const resp = await request.get('/legal-notice')
    expect(resp.status()).toBe(200)
  })
})

test.describe('visual regression', () => {
  test('consistent appearance', async ({ page }) => {
    await page.goto('/legal-notice')
    await PAGE_READY({ page })
    await expect(page).toHaveScreenshot({
      fullPage: true,
    })
  })
})
