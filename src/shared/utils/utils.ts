import type { RouteLocationRaw } from '#vue-router'

export const append = (path: string, pathToAppend?: RouteLocationRaw) =>
  path + (path.endsWith('/') ? '' : '/') + (pathToAppend ?? '')

export const arrayRemoveNulls = <T>(array?: Array<T>) =>
  array?.flatMap((x: T) => (x ? [x] : [])) || []
