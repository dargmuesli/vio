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
    const resp = await request.get('/privacy-policy')
    expect(resp.status()).toBe(200)
  })
})

test.describe('visual regression', () => {
  test('consistent appearance', async ({ page }) => {
    await page.goto('/privacy-policy')
    await PAGE_READY({ page })
    await expect(page).toHaveScreenshot({
      fullPage: true,
      timeout: 10000,
    })
  })

  test('generates the open graph image', async ({ page }) => {
    await page.goto(
      `/_og/${process.env.VIO_SERVER === 'static' ? 's' : 'd'}/a_Social+Preview+Image+for+a+Vio+webpage.,c_Nuxt.satori,description_Vio+is+@dargmuesli's+Nuxt+layer.,title_Privacy+Policy,p_Ii9wcml2YWN5LXBvbGljeSI.png`,
    )
    await expect(page).toHaveScreenshot({ fullPage: true })

    await page.goto(
      `/_og/${process.env.VIO_SERVER === 'static' ? 's' : 'd'}/a_Social+Preview+Image+für+eine+Vio+Webseite.,c_Nuxt.satori,description_Vio+ist+@dargmueslis+Nuxt+layer.,title_Datenschutzerklärung,p_Ii9kZS9wcml2YWN5LXBvbGljeSI.png`,
    )
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
