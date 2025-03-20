const address = {
  city: '12345 City, Country',
  email: 'contact@doma.in',
  name: 'Company Name',
  street: 'Street 0',
}

export default defineAppConfig({
  vio: {
    pages: {
      legalNotice: {
        contact: {
          email: address.email,
        },
        responsibility: {
          address,
        },
        tmg: {
          address,
        },
      },
      privacyPolicy: {
        hostingCdn: {
          external: {
            address,
          },
        },
        mandatoryInfo: {
          responsible: {
            address,
          },
        },
      },
    },
    server: {
      middleware: {
        headers: {
          NEL: '\'{"report_to":"csp-endpoint","max_age":31536000,"include_subdomains":true}\'',
          'Report-To':
            '{"group":"csp-endpoint","max_age":10886400,"endpoints":[{"url":"https://o4507259039973376.ingest.de.sentry.io/api/4507260561653840/security/?sentry_key=1e53178c1dba9b39147de4a21853a3e3"}],"include_subdomains":true}}',
        },
      },
    },
    themeColor: '#202020',
  },
})
