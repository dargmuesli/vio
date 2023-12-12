import { test, expect } from '@playwright/test'

import { COOKIE_CONTROL_DEFAULT, PAGE_READY } from '../../../utils/constants'
import { testMetadata } from '../../../utils/tests'

const PAGE_PATH = '/legal-notice'

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
    const resp = await request.get(PAGE_PATH)
    expect(resp.status()).toBe(200)
  })

  test('metadata', async ({ page }) => {
    await testMetadata({
      page,
      path: PAGE_PATH,
      title: 'Legal notice · Vio Playground',
    })
  })
})

test.describe('visual regression', () => {
  test('consistent appearance', async ({ page }) => {
    await page.goto(PAGE_PATH)
    await PAGE_READY({ page })
    await expect(page).toHaveScreenshot({
      fullPage: true,
    })
  })

  test('generates the open graph image', async ({ page }) => {
    await page.goto('/__og-image__/image/legal-notice/og.png')
    await expect(page).toHaveScreenshot({ fullPage: true })

    await page.goto('/__og-image__/image/de/legal-notice/og.png')
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
