import { RouteLocationRaw } from '#vue-router'

export const append = (path: string, pathToAppend?: RouteLocationRaw) =>
  path + (path.endsWith('/') ? '' : '/') + (pathToAppend ?? '')
