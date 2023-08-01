const address = {
  city: '12345 City, Country',
  email: 'contact@doma.in',
  name: 'Company Name',
  street: 'Street 0',
}

export default defineAppConfig({
  legalNotice: {
    contact: {
      email: address.email
    },
    responsibility: {
      address
    },
    tmg: {
      address
    }
  },
  privacyPolicy: {
    hostingCdn: {
      external: {
        address
      },
    },
    mandatoryInfo: {
      responsible: {
        address
      },
    },
  },
})
