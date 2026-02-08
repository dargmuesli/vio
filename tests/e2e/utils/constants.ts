import { expect } from '@playwright/test'
import type { Page } from 'playwright-core'

export const TIMEOUT = 60000
export const PAGE_READY = async ({
  page,
  options,
}: {
  page: Page
  options?: {
    cookieControl?: boolean
    devTools?: boolean
    isLoading?: boolean
  }
}) => {
  if (!options || options.cookieControl !== false) {
    await expect(
      page.getByRole('button', { name: 'Cookie control' }),
    ).toBeVisible()
  }

  // if (
  //   process.env.VIO_SERVER === 'dev' &&
  //   (!options || options.devTools !== false)
  // ) {
  //   await expect(
  //     page.getByRole('button', { name: 'Toggle Nuxt DevTools' }),
  //   ).toBeVisible()
  // }

  if (!options || options.isLoading !== false) {
    await expect(page.getByTestId('is-loading')).toHaveAttribute(
      'data-is-loading',
      'false',
    )
  }
}
export const SITE_URL =
  process.env.NUXT_PUBLIC_I18N_BASE_URL ||
  `https://${process.env.HOST || 'app.localhost'}:${process.env.PORT || '3000'}`
