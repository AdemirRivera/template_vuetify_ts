export interface DataTableServerOptions {
  page: number
  itemsPerPage: number
  sortBy: SortItem[]
  groupBy: GroupItem[]
  search?: string
}

export interface DataTableColumn {
  readonly key?: string | 'data-table-group' | 'data-table-select' | 'data-table-expand';
  readonly value?: string;
  readonly title?: string;
  readonly fixed?: boolean;
  readonly align?: 'start' | 'end' | 'center';
  readonly width?: string | number;
  readonly minWidth?: string | number;
  readonly maxWidth?: string | number;
  readonly nowrap?: boolean;
  readonly sortable?: boolean;
  readonly children?: readonly any[];
}


export interface SortItem {
  key: string | null
  order: 'asc' | 'desc' | null
}

export interface GroupItem {
  key: string | null
  order?: 'asc' | 'desc' | null
}
