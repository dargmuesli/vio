import { expect } from '@playwright/test'

import { vioTest } from '#tests/e2e/fixtures/vioTest'
import {
  testOgImage,
  testPageLoad,
  testVisualRegression,
} from '#tests/e2e/utils/tests'

const PAGE_PATH = '/does-not-exist'

testPageLoad(PAGE_PATH, 404)
// the static server serves a single prerendered 404 page, so the open graph image of the German variant would not match the snapshot of the dynamic servers
if (process.env.VIO_SERVER !== 'static') {
  testOgImage({
    de: `/de${PAGE_PATH}`,
    en: PAGE_PATH,
  })
}
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
