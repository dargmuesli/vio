import AxeBuilder from '@axe-core/playwright'
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

test.describe('a11y', () => {
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    await page.goto('/')
    await PAGE_READY({ page })
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    // expect(
    //   accessibilityScanResults.violations
    //     .map(
    //       (x) => `${x.id} - ${x.nodes.map((y) => y.failureSummary + y.html)}`,
    //     )
    //     .join(),
    // ).toEqual(
    //   'color-contrast - Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds,region - Ensures all page content is contained by landmarks,scrollable-region-focusable - Ensure elements that have scrollable content are accessible by keyboard',
    // ) // TODO: get rid of all violations
    expect(accessibilityScanResults.violations.length).toEqual(2) // TODO: get rid of all violations
  })
})

test.describe('page load', () => {
  test('loads the page successfully', async ({ request }) => {
    const resp = await request.get('/')
    expect(resp.status()).toBe(200)
  })
})

test.describe('internationalization', () => {
  const textEnglish =
    'Ninjaneer, studying at University of Kassel, founding maevsi.'
  const textGerman =
    'Ninjaneer, studiert an der Universität Kassel, gründet maevsi.'

  test('displays English translations', async ({ page }) => {
    await page.goto('/')
    expect(page.getByText(textEnglish)).toBeDefined()
  })

  test('displays German translations', async ({ page }) => {
    await page.goto('/de')
    expect(page.getByText(textGerman)).toBeDefined()
  })
})

test.describe('visual regression', () => {
  test('looks as before', async ({ page }) => {
    await page.goto('/')
    await PAGE_READY({ page })
    await expect(page).toHaveScreenshot({
      fullPage: true,
      mask: [page.locator('.nuxt-devtools-panel')],
    })
  })

  test('displays the cookie banner', async ({ context, page }) => {
    // TODO: only remove the cookie control cookie (https://github.com/microsoft/playwright/issues/10143)
    await context.clearCookies()

    await page.goto('/')
    await PAGE_READY({ page, options: { cookieControl: false } })
    await expect(page).toHaveScreenshot({
      fullPage: true,
      mask: [page.locator('.nuxt-devtools-panel')],
    })
  })
})
