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
    const resp = await request.get('/does-not-exit')
    expect(resp.status()).toBe(404)
  })
})

test.describe('internationalization', () => {
  const textEnglish = '404 - Not Found'
  const textGerman = '404 - Nicht gefunden'

  test('English translations', async ({ page }) => {
    await page.goto('/does-not-exit')
    await expect(page.getByText(textEnglish)).toBeVisible()
  })

  test('German translations', async ({ page }) => {
    await page.goto('/de/does-not-exit')
    await expect(page.getByText(textGerman)).toBeVisible()
  })
})

test.describe('visual regression', () => {
  test('consistent appearance', async ({ page }) => {
    await page.goto('/does-not-exit')
    await PAGE_READY({
      page,
      options: {
        isLoading: false,
      },
    })
    await expect(page).toHaveScreenshot(
      'visual-regression-consistent-appearance-system.png',
      {
        fullPage: true,
      },
    )
  })

  // TODO: enable (https://github.com/harlan-zw/nuxt-og-image/issues/81)
  // test('generates the open graph image', async ({ page }) => {
  //   await page.goto('/does-not-exist/__og_image__/og.png')
  //   await expect(page).toHaveScreenshot({ fullPage: true })

  //   await page.goto('/de/does-not-exist/__og_image__/og.png')
  //   await expect(page).toHaveScreenshot({ fullPage: true })
  // })
})
