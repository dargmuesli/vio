import { expect } from '@playwright/test'

import { vioTest } from '#tests/e2e/fixtures/vioTest'
import { testPageLoad, testVisualRegression } from '#tests/e2e/utils/tests'

const PAGE_PATH = '/does-not-exist'

// testOgImage(
// {
//   en: `a_Social+Preview+Image+for+a+Vio+webpage.,c_Nuxt.takumi,description_Vio+is+%40dargmuesli's+Nuxt+layer.,title_404+-+Not+Found,q_e30,p_Ii9kb2VzLW5vdC1leGl0Ig.png`,
//   de: `a_Social+Preview+Image+f%C3%BCr+eine+Vio+Webseite.,c_Nuxt.takumi,description_Vio+ist+%40dargmueslis+Nuxt+layer.,title_404+-+Nicht+gefunden,q_e30,p_Ii9kZS9kb2VzLW5vdC1leGl0Ig.png`,
// }
// )
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

    await page.goto(
      `/_og/d/a_Social+Preview+Image+for+a+Vio+webpage.,c_Nuxt.takumi,description_~VmlvIGlzIEBkYXJnbXVlc2xpJ3MgTnV4dCBsYXllci4,title_404+-+Not+Found,p_Ii9sZWdhbC1ub3RpY2VlIg,s_agnPBpX-UgzSzeo6.png`,
    )
    await expect(page).toHaveScreenshot()

    await page.goto(
      `/_og/d/a_~U29jaWFsIFByZXZpZXcgSW1hZ2UgZsO8ciBlaW5lIFZpbyBXZWJzZWl0ZS4,c_Nuxt.takumi,description_~VmlvIGlzdCBAZGFyZ211ZXNsaXMgTnV4dCBsYXllci4,title_404+-+Nicht+gefunden,p_Ii9kZS9sZWdhbC1ub3RpY2VlIg,s_3dOTe14EV6Nh-jc0.png`,
    )
    await expect(page).toHaveScreenshot()
  })
})
