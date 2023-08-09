export const getCspAsString = (csp = {} as Record<string, Array<string>>) =>
  Object.keys(csp).reduce((p, c) => (p += `${c} ${csp[c].join(' ')};`), '')
