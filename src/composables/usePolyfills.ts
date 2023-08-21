export const usePolyfills = () => {
  const polyfills =
    'https://polyfill.io/v3/polyfill.min.js?features=Promise&flags=gated'

  useServerHead({
    link: [
      {
        rel: 'preload',
        href: polyfills,
        crossorigin: 'anonymous',
        as: 'script',
        'data-testid': 'polyfill-preload',
      },
    ],
    script: [
      {
        src: polyfills,
        crossorigin: 'anonymous',
        'data-testid': 'polyfill-script',
      },
    ],
  })
}