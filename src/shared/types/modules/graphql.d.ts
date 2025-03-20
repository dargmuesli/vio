declare module '*.graphql' {
  import type { DocumentNode } from 'graphql'

  const content: DocumentNode
  export default content
}
