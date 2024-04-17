// // TODO: add compat plugin when it supports flat config (https://github.com/amilajack/eslint-plugin-compat/issues/603)
// import { FlatCompat } from '@eslint/eslintrc'
import vueI18n from '@intlify/eslint-plugin-vue-i18n'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginYml from 'eslint-plugin-yml'
import globals from 'globals'
import jiti from 'jiti'

const moduleFileUrl = new URL(import.meta.url)
// const compat = new FlatCompat({
//   baseDirectory: moduleFileUrl.pathname,
// })
const JITI = jiti(moduleFileUrl.pathname)
const POLYFILLS = JITI('../utils/constants.ts').POLYFILLS

export const VIO_ESLINT_CONFIG = [
  ...vueI18n.configs['flat/recommended'],
  // ...compat.extends('plugin:compat/recommended'),
  ...eslintPluginYml.configs['flat/recommended'],
  prettierRecommended, // must be last

  // {
  //   files: ['server/**/*'],
  //   rules: {
  //     'compat/compat': 'off',
  //   },
  // },
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      '@intlify/vue-i18n/no-missing-keys': 'error',
      '@intlify/vue-i18n/no-raw-text': 'error',
      '@intlify/vue-i18n/no-deprecated-i18n-component': 'error', // TODO: do not specify below rules manually, but have them included in `recommended` https://github.com/intlify/eslint-plugin-vue-i18n/issues/275
      '@intlify/vue-i18n/no-deprecated-i18n-place-attr': 'error',
      '@intlify/vue-i18n/no-deprecated-i18n-places-prop': 'error',
      '@intlify/vue-i18n/no-i18n-t-path-prop': 'error',
      '@intlify/vue-i18n/valid-message-syntax': 'error',
      '@intlify/vue-i18n/key-format-style': 'error',
      '@intlify/vue-i18n/no-duplicate-keys-in-locale': 'error',
      '@intlify/vue-i18n/no-dynamic-keys': 'error',
      '@intlify/vue-i18n/no-missing-keys-in-other-locales': 'error',
      '@intlify/vue-i18n/no-unknown-locale': 'error',
      '@intlify/vue-i18n/no-unused-keys': 'error',
      '@intlify/vue-i18n/prefer-sfc-lang-attr': 'error',
      '@intlify/vue-i18n/prefer-linked-key-with-paren': 'error',
      // '@intlify/vue-i18n/sfc-locale-attr': 'error',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'vue/multi-word-component-names': 'off', // TODO: remove (https://github.com/nuxt/eslint/issues/261)
      'yml/quotes': ['error', { prefer: 'single' }],
    },
    settings: {
      polyfills: POLYFILLS,
      'vue-i18n': {
        localeDir: './locales/*.json',
        messageSyntaxVersion: '^9.0.0',
      },
    },
  },
  {
    ignores: ['tests'],
  },
  {
    files: ['locales/**/*'],
    rules: {
      '@intlify/vue-i18n/no-unused-keys': 'off',
    },
  }, // TODO: remove once `@intlify/eslint-plugin-vue-i18n` accounts for translation usage in composables]
]
