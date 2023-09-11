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
  test('violations', async ({ page }) => {
    await page.goto('/')
    await PAGE_READY({ page })
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    // expect(
    //   accessibilityScanResults.violations
    //     .map(
    //       (x) =>
    //         `${x.id}\n${x.nodes.map(
    //           (y) => `${y.failureSummary}\n(${y.html})`,
    //         )}`,
    //     )
    //     .join('\n'),
    // ).toEqual('')
    expect(accessibilityScanResults.violations.length).toEqual(0)
  })
})

test.describe('page', () => {
  test('status code', async ({ request }) => {
    const resp = await request.get('/')
    expect(resp.status()).toBe(200)
  })

  test('metadata', async ({ page }) => {
    await page.goto('/')

    expect(await page.title()).toStrictEqual('Title · Vio Playground')

    const host =
      process.env.NODE_ENV === 'production'
        ? 'http://localhost:3001'
        : 'http://localhost:3000'
    const meta = [
      {
        tag: 'html',
        attributes: [{ key: 'lang', value: 'en' }],
      },
      {
        tag: 'link',
        attributes: [
          {
            key: 'data-testid',
            value: 'polyfill-preload',
          },
          { key: 'rel', value: 'preload' },
          {
            key: 'href',
            value:
              'https://polyfill.io/v3/polyfill.min.js?features=Promise&flags=gated',
          },
          {
            key: 'crossorigin',
            value: 'anonymous',
          },
          {
            key: 'as',
            value: 'script',
          },
        ],
      },
      {
        tag: 'link',
        attributes: [
          {
            key: 'rel',
            value: 'canonical',
          },
          {
            key: 'href',
            value: `${host}/`,
          },
        ],
      },
      {
        tag: 'link',
        attributes: [
          {
            key: 'rel',
            value: 'icon',
          },
          {
            key: 'href',
            value: '/favicon.ico',
          },
          {
            key: 'sizes',
            value: 'any',
          },
        ],
      },
      {
        tag: 'link',
        attributes: [
          {
            key: 'rel',
            value: 'icon',
          },
          {
            key: 'href',
            value: '/apple-touch-icon.png',
          },
          {
            key: 'type',
            value: 'image/png',
          },
          {
            key: 'sizes',
            value: '180x180',
          },
        ],
      },
      {
        tag: 'link',
        attributes: [
          {
            key: 'rel',
            value: 'icon',
          },
          {
            key: 'href',
            value: '/favicon-16x16.png',
          },
          {
            key: 'type',
            value: 'image/png',
          },
          {
            key: 'sizes',
            value: '16x16',
          },
        ],
      },
      {
        tag: 'link',
        attributes: [
          {
            key: 'rel',
            value: 'icon',
          },
          {
            key: 'href',
            value: '/favicon-32x32.png',
          },
          {
            key: 'type',
            value: 'image/png',
          },
          {
            key: 'sizes',
            value: '32x32',
          },
        ],
      },
      {
        tag: 'link',
        attributes: [
          {
            key: 'rel',
            value: 'apple-touch-icon',
          },
          {
            key: 'href',
            value: '/apple-touch-icon.png',
          },
          {
            key: 'type',
            value: 'image/png',
          },
          {
            key: 'sizes',
            value: '180x180',
          },
        ],
      },
      {
        tag: 'link',
        attributes: [
          {
            key: 'href',
            value: `${host}/`,
          },
          {
            key: 'hreflang',
            value: 'en',
          },
          {
            key: 'rel',
            value: 'alternate',
          },
        ],
      },
      {
        tag: 'link',
        attributes: [
          {
            key: 'href',
            value: `${host}/de`,
          },
          {
            key: 'hreflang',
            value: 'de',
          },
          {
            key: 'rel',
            value: 'alternate',
          },
        ],
      },
      {
        tag: 'link',
        attributes: [
          {
            key: 'href',
            value: `${host}/`,
          },
          {
            key: 'hreflang',
            value: 'x-default',
          },
          {
            key: 'rel',
            value: 'alternate',
          },
        ],
      },
      {
        tag: 'link',
        attributes: [
          {
            key: 'href',
            value: '/assets/static/favicon/site.webmanifest?v=bOXMwoKlJr',
          },
          {
            key: 'rel',
            value: 'manifest',
          },
        ],
      },
      {
        tag: 'link',
        attributes: [
          {
            key: 'color',
            value: '#202020',
          },
          {
            key: 'href',
            value: '/assets/static/favicon/safari-pinned-tab.svg?v=bOXMwoKlJr',
          },
          {
            key: 'rel',
            value: 'mask-icon',
          },
        ],
      },
      {
        tag: 'link',
        attributes: [
          {
            key: 'href',
            value: '/favicon.ico?v=bOXMwoKlJr',
          },
          {
            key: 'rel',
            value: 'shortcut icon',
          },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'charset',
            value: 'utf-8',
          },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'name',
            value: 'description',
          },
          { key: 'content', value: "Vio is @dargmuesli's Nuxt layer." },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'name',
            value: 'msapplication-Config',
          },
          {
            key: 'content',
            value: '/assets/static/favicon/browserconfig.xml?v=bOXMwoKlJr',
          },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'name',
            value: 'msapplication-TileColor',
          },
          { key: 'content', value: '#202020' },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'property',
            value: 'og:image:alt',
          },
          { key: 'content', value: 'Social Preview Image for a Vio webpage.' },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'property',
            value: 'og:image:height',
          },
          { key: 'content', value: '630' },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'property',
            value: 'og:image:width',
          },
          { key: 'content', value: '1200' },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'property',
            value: 'og:image',
          },
          {
            key: 'content',
            value: `${host}/__og_image__/og.png`,
          },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'property',
            value: 'og:locale',
          },
          { key: 'content', value: 'en' },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'property',
            value: 'og:locale:alternate',
          },
          { key: 'content', value: 'de' },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'property',
            value: 'og:site_name',
          },
          { key: 'content', value: 'Vio Playground' },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'property',
            value: 'og:title',
          },
          { key: 'content', value: 'Title · Vio Playground' },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'property',
            value: 'og:type',
          },
          { key: 'content', value: 'website' },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'property',
            value: 'og:url',
          },
          {
            key: 'content',
            value: `${host}/`,
          },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'name',
            value: 'theme-color',
          },
          { key: 'content', value: '#202020' },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'name',
            value: 'twitter:card',
          },
          { key: 'content', value: 'summary_large_image' },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'name',
            value: 'twitter:description',
          },
          { key: 'content', value: "Vio is @dargmuesli's Nuxt layer." },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'name',
            value: 'twitter:image:alt',
          },
          { key: 'content', value: 'Social Preview Image for a Vio webpage.' },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'name',
            value: 'twitter:image:height',
          },
          { key: 'content', value: '630' },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'name',
            value: 'twitter:image:width',
          },
          { key: 'content', value: '1200' },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'name',
            value: 'twitter:image:src',
          },
          {
            key: 'content',
            value: `${host}/__og_image__/og.png`,
          },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'name',
            value: 'twitter:site',
          },
          { key: 'content', value: '@dargmuesli' },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'name',
            value: 'twitter:title',
          },
          { key: 'content', value: 'Title' },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'name',
            value: 'robots',
          },
          {
            key: 'content',
            value:
              process.env.NODE_ENV === 'production'
                ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
                : 'noindex, nofollow',
          },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            key: 'name',
            value: 'viewport',
          },
          { key: 'content', value: 'width=device-width, initial-scale=1' },
        ],
      },
      {
        tag: 'script',
        attributes: [
          {
            key: 'id',
            value: 'schema-org-graph',
          },
          { key: 'type', value: 'application/ld+json' },
        ],
      },
    ]

    for (const object of meta) {
      await expect(
        page.locator(
          object.tag +
            object.attributes
              ?.map((attribute) => `[${attribute.key}="${attribute.value}"]`)
              .join(''),
        ),
      ).toBeAttached()
    }

    expect(await page.locator('#schema-org-graph').innerText()).toMatchSnapshot(
      `schema-org-graph-${
        process.env.NODE_ENV === 'production' ? 'production' : 'development'
      }.json`,
    )
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
    await page.goto('/__og_image__/og.png')
    await expect(page).toHaveScreenshot({ fullPage: true })

    await page.goto('/de/__og_image__/og.png')
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
