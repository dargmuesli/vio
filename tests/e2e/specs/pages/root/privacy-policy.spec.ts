import {
  testOgImage,
  testPageLoad,
  testVisualRegression,
} from '#tests/e2e/utils/tests'

const PAGE_PATH = '/privacy-policy'

testPageLoad(PAGE_PATH)
testOgImage({
  de: 'a_Social+Preview+Image+für+eine+Vio+Webseite.,c_Nuxt.satori,description_Vio+ist+@dargmueslis+Nuxt+layer.,title_Datenschutzerklärung,p_Ii9kZS9wcml2YWN5LXBvbGljeSI.png',
  en: `a_Social+Preview+Image+for+a+Vio+webpage.,c_Nuxt.satori,description_Vio+is+@dargmuesli's+Nuxt+layer.,title_Privacy+Policy,p_Ii9wcml2YWN5LXBvbGljeSI.png`,
})
testVisualRegression(PAGE_PATH)
