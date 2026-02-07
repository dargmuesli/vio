import { expect } from '@playwright/test'

import { vioTest } from '#tests/e2e/fixtures/vioTest'
import { PAGE_READY, TIMEOUT } from '#tests/e2e/utils/constants'
import {
  testA11y,
  testMetadata,
  testOgImage,
  testPageLoad,
  testVisualRegression,
} from '#tests/e2e/utils/tests'

const PAGE_PATH = '/'

testA11y(PAGE_PATH)
testOgImage(PAGE_PATH)
testPageLoad(PAGE_PATH)
testVisualRegression(PAGE_PATH)

vioTest.describe('page', () => {
  vioTest('metadata', async ({ page }) => {
    await testMetadata({ page, path: '/', title: 'Vio Playground' })
  })
})

vioTest.describe('internationalization', () => {
  const textEnglish = 'Please check your input 🙈'
  const textGerman = 'Bitte überprüfe deine Eingaben 🙈'

  vioTest('English translations', async ({ page }) => {
    await page.goto(PAGE_PATH)
    await expect(page.getByText(textEnglish)).toBeVisible()
  })

  vioTest('German translations', async ({ page }) => {
    await page.goto('/de')
    await expect(page.getByText(textGerman)).toBeVisible()
  })
})

vioTest.describe('visual regression', () => {
  // vioTest('consistent appearance', async ({ page }) => {
  //   await page.goto(PAGE_PATH)
  //   await PAGE_READY({ page })
  //   await expect(page).toHaveScreenshot(
  //     'visual-regression-consistent-appearance-system.png',
  //     {
  //       fullPage: true,
  //     },
  //   )

  //   await page.emulateMedia({ colorScheme: 'light' })
  //   await expect(page).toHaveScreenshot(
  //     'visual-regression-consistent-appearance-light.png',
  //     {
  //       fullPage: true,
  //     },
  //   )

  //   await page.emulateMedia({ colorScheme: 'dark' })
  //   await expect(page).toHaveScreenshot(
  //     'visual-regression-consistent-appearance-dark.png',
  //     {
  //       fullPage: true,
  //     },
  //   )
  // })

  vioTest('displays the cookie banner', async ({ page }) => {
    await page.goto(PAGE_PATH)
    await PAGE_READY({ page, options: { cookieControl: false } })
    await expect(page).toHaveScreenshot({ timeout: TIMEOUT })
  })
})
