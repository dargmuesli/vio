import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/test'

import { COOKIE_CONTROL_DEFAULT, PAGE_READY } from '../../../utils/constants'
import { testMetadata } from '../../../utils/tests'

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

test.describe('accessibility', () => {
  test('violations', async ({ page }) => {
    await page.goto('/')
    await PAGE_READY({ page })
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    expect(
      accessibilityScanResults.violations
        .map(
          (x) =>
            `${x.id}\n${x.nodes.map(
              (y) => `${y.failureSummary}\n(${y.html}\n(${y.target})`,
            )}`,
        )
        .join('\n'),
    ).toEqual('')
    // expect(accessibilityScanResults.violations.length).toEqual(0)
  })
})

test.describe('page', () => {
  test('status code', async ({ request }) => {
    const resp = await request.get('/')
    expect(resp.status()).toBe(200)
  })
  test('metadata', async ({ page }) => {
    await testMetadata({ page, path: '/', title: 'Vio Playground' })
  })
})

test.describe('internationalization', () => {
  const textEnglish = 'Please check your input 🙈'
  const textGerman = 'Bitte überprüfe deine Eingaben 🙈'

  test('English translations', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText(textEnglish)).toBeVisible()
  })

  test('German translations', async ({ page }) => {
    await page.goto('/de')
    await expect(page.getByText(textGerman)).toBeVisible()
  })
})

test.describe('visual regression', () => {
  test('consistent appearance', async ({ page }) => {
    await page.goto('/')
    await PAGE_READY({ page })
    await expect(page).toHaveScreenshot(
      'visual-regression-consistent-appearance-system.png',
      {
        fullPage: true,
      },
    )

    await page.emulateMedia({ colorScheme: 'light' })
    await expect(page).toHaveScreenshot(
      'visual-regression-consistent-appearance-light.png',
      {
        fullPage: true,
      },
    )

    await page.emulateMedia({ colorScheme: 'dark' })
    await expect(page).toHaveScreenshot(
      'visual-regression-consistent-appearance-dark.png',
      {
        fullPage: true,
      },
    )
  })

  test('consistent appearance with cookie banner', async ({
    context,
    page,
  }) => {
    // TODO: only remove the cookie control cookie (https://github.com/microsoft/playwright/issues/10143)
    await context.clearCookies()

    await page.goto('/')
    await PAGE_READY({ page, options: { cookieControl: false } })
    await expect(page).toHaveScreenshot(
      'visual-regression-consistent-appearance-with-cookie-banner.png',
      {
        fullPage: true,
      },
    )
  })

  test('generates the open graph image', async ({ page }) => {
    await page.goto('/__og-image__/image/og.jpg')
    await expect(page).toHaveScreenshot({ fullPage: true })

    await page.goto('/__og-image__/image/de/og.jpg')
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
