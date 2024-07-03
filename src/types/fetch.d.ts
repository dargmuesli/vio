export interface StrapiResult<T> {
  data: CollectionItem<T>[]
  meta: {
    pagination: {
      total: number
    }
  }
}

export interface CollectionItem<T> {
  id: number
  attributes: T
}
