import { test, expect } from '@playwright/test'

import { SITE_URL } from '#tests/e2e/utils/constants'
import {
  COOKIE_CONTROL_CONSENT_COOKIE_DEFAULT,
  PAGE_READY,
} from '../../../utils/constants'

test.beforeEach(async ({ context }) => {
  await context.addCookies([
    {
      name: 'ncc_c',
      value: COOKIE_CONTROL_CONSENT_COOKIE_DEFAULT,
      url: SITE_URL,
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

  test('generates the open graph image', async ({ page }) => {
    if (process.env.VIO_SERVER === 'static') return

    await page.goto(
      `/_og/d/a_Social+Preview+Image+for+a+Vio+webpage.,c_Nuxt.satori,description_Vio+is+%40dargmuesli's+Nuxt+layer.,title_404+-+Not+Found,q_e30,p_Ii9kb2VzLW5vdC1leGl0Ig.png`,
    )
    await expect(page).toHaveScreenshot({ fullPage: true })

    await page.goto(
      `/_og/d/a_Social+Preview+Image+f%C3%BCr+eine+Vio+Webseite.,c_Nuxt.satori,description_Vio+ist+%40dargmueslis+Nuxt+layer.,title_404+-+Nicht+gefunden,q_e30,p_Ii9kZS9kb2VzLW5vdC1leGl0Ig.png`,
    )
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
