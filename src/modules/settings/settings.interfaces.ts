export interface Pagination {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

export interface PaginationParams {
    // search:     string,
    page: number,
    per_page: number,
}

export interface GetListLogsResponse {
    data: DataLogs[];
    pagination: Pagination;
}

export interface DataLogs {
    id: string;
    description: string;
    message: string;
    error_code: number;
    uri: string;
    created_at: string;
}

export interface GetListPermissionsResponse {
    data: DataPermissions[];
    pagination: Pagination;
}

export interface DataPermissions {
    description: string,
    id: string,
    name: string,
    tag: string
}

