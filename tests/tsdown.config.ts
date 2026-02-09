import { defineConfig } from 'tsdown'

export default defineConfig({
  dts: true,
  entry: ['e2e/fixtures/*.ts', 'e2e/utils/*.ts', 'playwright.config.ts'],
  external: [
    '@axe-core/playwright',
    '@playwright/test',
    'lodash-es',
    'playwright-core',
    'ufo',
  ],
  target: 'esnext',
})
