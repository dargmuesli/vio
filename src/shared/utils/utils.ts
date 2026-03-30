export const arrayRemoveNulls = <T>(array?: T[]) =>
  array?.flatMap((x: T) => (x ? [x] : [])) || []
