export const useStrapiFetch = (
  options?: Parameters<ReturnType<typeof useGetServiceHref>>[0],
) =>
  useServiceFetch({
    ...(options ? options : {}),
    name: options?.name || 'strapi',
    path: options?.path || '/api',
  })
