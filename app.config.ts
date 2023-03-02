export default defineAppConfig({
  project: {
    name: 'Vio'
  }
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    project?: {
      /** Project name */
      name?: string
    }
  }
}
