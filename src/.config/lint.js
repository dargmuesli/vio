// @ts-check

// @ts-ignore
import vueI18n from '@intlify/eslint-plugin-vue-i18n'
import eslintPluginCompat from 'eslint-plugin-compat'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginYml from 'eslint-plugin-yml'
import globals from 'globals'
import { createJiti } from 'jiti'

const jiti = createJiti(import.meta.url)
const constants = await jiti.import('../utils/constants.ts')
// @ts-ignore
const POLYFILLS = constants.POLYFILLS

const vueI18nConfiguration = vueI18n.configs['flat/recommended']
const compatConfiguration = eslintPluginCompat.configs['flat/recommended']
const ymlConfiguration = eslintPluginYml.configs['flat/recommended']
const prettierConfiguration = eslintPluginPrettierRecommended

export const VIO_ESLINT_CONFIG = [
  ...vueI18nConfiguration,
  compatConfiguration,
  ...ymlConfiguration,
  prettierConfiguration, // must be last

  {
    files: ['.config/**/*', 'server/**/*'],
    rules: {
      'compat/compat': 'off',
    },
  },
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

      'yml/quotes': ['error', { prefer: 'single' }],
    },
    settings: {
      polyfills: POLYFILLS,
      'vue-i18n': {
        localeDir: './i18n/locales/*.json',
        messageSyntaxVersion: '^9.0.0',
      },
    },
  },
  {
    ignores: ['tests'],
  },
  {
    files: ['i18n/locales/**/*'],
    rules: {
      '@intlify/vue-i18n/no-unused-keys': 'off',
    },
  }, // TODO: remove once `@intlify/eslint-plugin-vue-i18n` accounts for translation usage in composables]
]
