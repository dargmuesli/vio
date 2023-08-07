export const append = (path: string, pathToAppend: string) =>
  path + (path.endsWith('/') ? '' : '/') + pathToAppend
