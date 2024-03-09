import { expect, type Page } from '@playwright/test'
import { joinURL, withoutTrailingSlash } from 'ufo'

import { SITE_URL } from '../../../utils/constants'

export const testMetadata = async ({
  page,
  path,
  title,
}: {
  page: Page
  path: string
  title: string
}) => {
  await page.goto(path)

  expect(await page.title()).toStrictEqual(title)

  const meta = [
    {
      tag: 'html',
      attributes: [
        { key: 'dir', value: 'ltr' },
        { key: 'lang', value: 'en' },
      ],
    },
    // {
    //   tag: 'link',
    //   attributes: [
    //     {
    //       key: 'data-testid',
    //       value: 'polyfill-preload',
    //     },
    //     { key: 'rel', value: 'preload' },
    //     {
    //       key: 'href',
    //       value:
    //         'https://polyfill.io/v3/polyfill.min.js?features=Promise&flags=gated',
    //     },
    //     {
    //       key: 'crossorigin',
    //       value: 'anonymous',
    //     },
    //     {
    //       key: 'as',
    //       value: 'script',
    //     },
    //   ],
    // },
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
          value: 'viewport',
        },
        { key: 'content', value: 'width=device-width, initial-scale=1' },
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
          value: joinURL(SITE_URL, '/__og-image__/image', path, '/og.png'),
        },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'property',
          value: 'og:image:type',
        },
        {
          key: 'content',
          value: 'image/png',
        },
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
          value: 'twitter:image',
        },
        {
          key: 'content',
          value: joinURL(SITE_URL, '/__og-image__/image', path, '/og.png'),
        },
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
          value: joinURL(SITE_URL, '/__og-image__/image', path, '/og.png'),
        },
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
          key: 'property',
          value: 'og:image:height',
        },
        { key: 'content', value: '600' },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'name',
          value: 'twitter:image:height',
        },
        { key: 'content', value: '600' },
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
          key: 'name',
          value: 'twitter:image:alt',
        },
        { key: 'content', value: 'Social Preview Image for a Vio webpage.' },
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
      tag: 'link',
      attributes: [
        {
          key: 'rel',
          value: 'canonical',
        },
        {
          key: 'href',
          value: `${SITE_URL}${path}`,
        },
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
      tag: 'link',
      attributes: [
        {
          key: 'href',
          value: `${SITE_URL}${path}`,
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
          value: withoutTrailingSlash(`${SITE_URL}/de${path}`),
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
          value: `${SITE_URL}${path}`,
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
      tag: 'meta',
      attributes: [
        {
          key: 'property',
          value: 'og:url',
        },
        {
          key: 'content',
          value: `${SITE_URL}${path}`,
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
          key: 'name',
          value: 'theme-color',
        },
        { key: 'content', value: '#202020' },
      ],
    },
    {
      tag: 'link',
      attributes: [
        {
          key: 'href',
          value: '/site.webmanifest?v=bOXMwoKlJr',
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
          key: 'property',
          value: 'og:description',
        },
        { key: 'content', value: "Vio is @dargmuesli's Nuxt layer." },
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
          key: 'property',
          value: 'og:title',
        },
        { key: 'content', value: title },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'name',
          value: 'twitter:title',
        },
        { key: 'content', value: title },
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
          key: 'name',
          value: 'twitter:site',
        },
        { key: 'content', value: '@dargmuesli' },
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
    `schema-org-graph-${process.env.VIO_SERVER || 'dev'}.json`,
  )

  // if (process.env.VIO_SERVER === 'static') {
  //   expect(
  //     await page
  //       .locator('meta[http-equiv="Content-Security-Policy"]')
  //       .innerText(),
  //   ).toMatchSnapshot(`content-security-policy.txt`)
  // }
}
