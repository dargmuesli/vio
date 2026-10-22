import {
  testOgImage,
  testPageLoad,
  testVisualRegression,
} from '#tests/e2e/utils/tests'

const PAGE_PATH = '/legal-notice'

testPageLoad(PAGE_PATH)
testOgImage({
  de: `/de${PAGE_PATH}`,
  en: PAGE_PATH,
})
testVisualRegression(PAGE_PATH)
