export type StrapiResult<T> = {
  data: CollectionItem<T>[]
  meta: {
    pagination: {
      total: number
    }
  }
}

export type CollectionItem<T> = {
  documentId: string
  id: number
} & T
