import {
  testOgImage,
  testPageLoad,
  testVisualRegression,
} from '#tests/e2e/utils/tests'

const PAGE_PATH = '/privacy-policy'

testPageLoad(PAGE_PATH)
testOgImage({
  dynamic: {
    de: 'a_Social+Preview+Image+für+eine+Vio+Webseite.,c_Nuxt.satori,description_Vio+ist+@dargmueslis+Nuxt+layer.,title_Datenschutzerklärung,p_Ii9kZS9wcml2YWN5LXBvbGljeSI.png',
    en: `a_Social+Preview+Image+for+a+Vio+webpage.,c_Nuxt.satori,description_Vio+is+@dargmuesli's+Nuxt+layer.,title_Privacy+Policy,p_Ii9wcml2YWN5LXBvbGljeSI.png`,
  },
  static: {
    de: 'a_~U29jaWFsIFByZXZpZXcgSW1hZ2UgZsO8ciBlaW5lIFZpbyBXZWJzZWl0ZS4,c_Nuxt.takumi,description_~VmlvIGlzdCBAZGFyZ211ZXNsaXMgTnV4dCBsYXllci4,title_~RGF0ZW5zY2h1dHplcmtsw6RydW5n,p_Ii9kZS9wcml2YWN5LXBvbGljeSI.png',
    en: `a_Social+Preview+Image+for+a+Vio+webpage.,c_Nuxt.takumi,description_~VmlvIGlzIEBkYXJnbXVlc2xpJ3MgTnV4dCBsYXllci4,title_Privacy+Policy,p_Ii9wcml2YWN5LXBvbGljeSI.png`,
  },
})
testVisualRegression(PAGE_PATH)
