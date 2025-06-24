export interface DataTableServerOptions {
  page: number
  itemsPerPage: number
  sortBy: SortItem[]
  groupBy: GroupItem[]
  search?: string
}

export interface SortItem {
  key: string
  order?: 'asc' | 'desc' | null
}

export interface GroupItem {
  key: string
  order?: 'asc' | 'desc' | null
}
