import { type Page, test, expect } from '@playwright/test'

const createDefaultPage = (page: Page) => {
  return {
    page,
    goto: async (
      url: string,
      options?: {
        cookieControl?: boolean
        isLoading?: boolean
      },
    ) => {
      await page.goto(url)

      // if (!options || options.cookieControl !== false) {
      //   await expect(
      //     page.getByRole('button', { name: 'Cookie control' }),
      //   ).toBeVisible()
      // }

      if (!options || options.isLoading !== false) {
        await expect(page.getByTestId('is-loading')).toHaveAttribute(
          'data-is-loading',
          'false',
        )
      }
    },
  }
}

export const vioTest = test.extend<{
  defaultPage: ReturnType<typeof createDefaultPage>
  _autoSnapshotSuffix: unknown
}>({
  defaultPage: async ({ page, context }, use) => {
    await context.addCookies([
      {
        domain: 'localhost',
        name: 'vio_is-testing',
        path: '/',
        value: 'true',
      },
      {
        domain: 'localhost',
        name: 'vio_tz',
        path: '/',
        value: 'Europe/Berlin',
      },
      {
        domain: 'localhost',
        name: 'ncc_c',
        path: '/',
        value: 'ctga',
      },
    ])

    const defaultPage = createDefaultPage(page)

    await use(defaultPage)

    // After use a cleanup function could be run for data that has been created for the test
    // await cleanup()
  },
})
