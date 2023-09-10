import { POLYFILLS } from '../utils/constants'

export const usePolyfills = () => {
  const polyfillsUrl = `https://polyfill.io/v3/polyfill.min.js?features=${POLYFILLS.join(
    '%2C',
  )}&flags=gated`

  // TODO: replace with `useServerHead`
  useHead({
    link: [
      {
        rel: 'preload',
        href: polyfillsUrl,
        crossorigin: 'anonymous',
        as: 'script',
        'data-testid': 'polyfill-preload',
      },
    ],
    script: [
      {
        src: polyfillsUrl,
        crossorigin: 'anonymous',
        'data-testid': 'polyfill-script',
      },
    ],
  })
}
