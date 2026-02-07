import { test, expect } from '@playwright/test'

import { SITE_URL } from '#tests/e2e/utils/constants'
import {
  COOKIE_CONTROL_CONSENT_COOKIE_DEFAULT,
  PAGE_READY,
} from '../../../utils/constants'
import { testMetadata } from '../../../utils/tests'

const PAGE_PATH = '/legal-notice'

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
    await page.goto(
      `/_og/${process.env.VIO_SERVER === 'static' ? 's' : 'd'}/a_Social+Preview+Image+for+a+Vio+webpage.,c_Nuxt.satori,description_Vio+is+@dargmuesli's+Nuxt+layer.,title_Legal+notice,p_Ii9sZWdhbC1ub3RpY2Ui.png`,
    )
    await expect(page).toHaveScreenshot({ fullPage: true })

    await page.goto(
      `/_og/${process.env.VIO_SERVER === 'static' ? 's' : 'd'}/a_Social+Preview+Image+für+eine+Vio+Webseite.,c_Nuxt.satori,description_Vio+ist+@dargmueslis+Nuxt+layer.,title_Impressum,p_Ii9kZS9sZWdhbC1ub3RpY2Ui.png`,
    )
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
