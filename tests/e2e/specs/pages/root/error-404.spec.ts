import { expect } from '@playwright/test'

import { vioTest } from '#tests/e2e/fixtures/vioTest'
import { testPageLoad, testVisualRegression } from '#tests/e2e/utils/tests'

const PAGE_PATH = '/does-not-exist'

// testOgImage(PAGE_PATH)
testPageLoad(PAGE_PATH, 404)
testVisualRegression(PAGE_PATH, true)

vioTest.describe('internationalization', () => {
  const textEnglish = '404 - Not Found'
  const textGerman = '404 - Nicht gefunden'

  vioTest('English translations', async ({ page }) => {
    await page.goto('/does-not-exit')
    await expect(page.getByText(textEnglish)).toBeVisible()
  })

  vioTest('German translations', async ({ page }) => {
    await page.goto('/de/does-not-exit')
    await expect(page.getByText(textGerman)).toBeVisible()
  })
})

vioTest.describe('visual regression', () => {
  vioTest('generates the open graph image', async ({ page }) => {
    if (process.env.VIO_SERVER === 'static') return

    await page.goto(`/__og-image__/image/does-not-exist/og.png`)
    await expect(page).toHaveScreenshot({ fullPage: true })

    await page.goto(`/__og-image__/image/de/does-not-exist/og.png`)
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
