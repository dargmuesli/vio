export default defineAppConfig({
  privacyPolicy: {
    hostingCdn: {
      external: {
        address: {
          city: '12345 City, Country',
          name: 'Company Name',
          street: 'Street 0',
        },
      },
    },
    mandatoryInfo: {
      responsible: {
        address: {
          city: '12345 City, Country',
          email: "E-Mail: contact{'@'}doma.in",
          name: 'Firstname Lastname',
          street: 'Street 0',
        },
      },
    },
  },
  siteName: 'Playground',
})
