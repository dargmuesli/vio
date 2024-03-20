// import vueI18n from '@intlify/eslint-plugin-vue-i18n'
import prettier from 'eslint-plugin-prettier/recommended'
import eslintPluginYml from 'eslint-plugin-yml'
import globals from 'globals'
import jiti from 'jiti'

import nuxt from './.playground/.nuxt/eslint.config.mjs'

const moduleFileUrl = new URL(import.meta.url)
const JITI = jiti(moduleFileUrl.pathname)
const POLYFILLS = JITI('./utils/constants.ts').POLYFILLS

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...nuxt,
  // vueI18n.configs.recommended,
  ...eslintPluginYml.configs['flat/recommended'],
  prettier, // must be last

  // {
  //   files: ['server/**/*'],
  //   rules: {
  //     'compat/compat': 'off',
  //   },
  // },
  // {
  //   files: ['**/*'],
  //   rules: {
  //     'vue/multi-word-component-names': 'off',
  //   },
  // },
  // {
  //   files: ['components/**/*'],
  //   rules: {
  //     'vue/multi-word-component-names': 'error',
  //   },
  // },
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // '@intlify/vue-i18n/no-missing-keys': 'error',
      // '@intlify/vue-i18n/no-raw-text': 'error',
      // '@intlify/vue-i18n/no-deprecated-i18n-component': 'error', // TODO: do not specify below rules manually, but have them included in `recommended` https://github.com/intlify/eslint-plugin-vue-i18n/issues/275
      // '@intlify/vue-i18n/no-deprecated-i18n-place-attr': 'error',
      // '@intlify/vue-i18n/no-deprecated-i18n-places-prop': 'error',
      // '@intlify/vue-i18n/no-i18n-t-path-prop': 'error',
      // '@intlify/vue-i18n/valid-message-syntax': 'error',
      // '@intlify/vue-i18n/key-format-style': 'error',
      // '@intlify/vue-i18n/no-duplicate-keys-in-locale': 'error',
      // '@intlify/vue-i18n/no-dynamic-keys': 'error',
      // '@intlify/vue-i18n/no-missing-keys-in-other-locales': 'error',
      // '@intlify/vue-i18n/no-unknown-locale': 'error',
      // '@intlify/vue-i18n/no-unused-keys': 'error',
      // '@intlify/vue-i18n/prefer-sfc-lang-attr': 'error',
      // '@intlify/vue-i18n/prefer-linked-key-with-paren': 'error',
      // // '@intlify/vue-i18n/sfc-locale-attr': 'error',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
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
  // {
  //   files: [
  //     // '**/*.json',
  //     '**/*.ts',
  //     '**/*.tsx',
  //     '**/*.mts',
  //     '**/*.cts',
  //     '**/*.vue',
  //   ],
  //   plugins: {
  //     vueI18n: vueI18n.configs.recommended,
  //   },
  //   // rules: {
  //   //   '@intlify/vue-i18n/no-dynamic-keys': 'error',
  //   //   '@intlify/vue-i18n/key-format-style': [
  //   //     'error',
  //   //     'kebab-case',
  //   //     {
  //   //       allowArray: false,
  //   //       splitByDots: false,
  //   //     },
  //   //   ],
  //   //   '@intlify/vue-i18n/no-raw-text': [
  //   //     'warn',
  //   //     {
  //   //       ignorePattern: '^[+-_#:()&*$%€©]+$',
  //   //     },
  //   //   ],
  //   // },
  //   settings: {
  //     'vue-i18n': {
  //       localeDir: './locales/*.{json,json5,yaml,yml}',
  //       messageSyntaxVersion: '^9.0.0',
  //     },
  //   },
  // },
  {
    ignores: ['tests'],
  },
]
