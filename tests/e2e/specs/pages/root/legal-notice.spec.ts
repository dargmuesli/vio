import {
  testOgImage,
  testPageLoad,
  testVisualRegression,
} from '#tests/e2e/utils/tests'

const PAGE_PATH = '/legal-notice'

testPageLoad(PAGE_PATH)
testOgImage({
  de: 'a_Social+Preview+Image+für+eine+Vio+Webseite.,c_Nuxt.satori,description_Vio+ist+@dargmueslis+Nuxt+layer.,title_Impressum,p_Ii9kZS9sZWdhbC1ub3RpY2Ui.png',
  en: `a_Social+Preview+Image+for+a+Vio+webpage.,c_Nuxt.satori,description_Vio+is+@dargmuesli's+Nuxt+layer.,title_Legal+notice,p_Ii9sZWdhbC1ub3RpY2Ui.png`,
})
testVisualRegression(PAGE_PATH)
