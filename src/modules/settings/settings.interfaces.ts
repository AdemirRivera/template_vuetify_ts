export interface GetListLogsParams {
    // search:     string,
    page:       number,
    per_page:   number,
}
export interface GetListLogsResponse {
    data:       Datum[];
    pagination: Pagination;
}

export interface Datum {
    id:          string;
    description: string;
    message:     string;
    error_code:  number;
    uri:         string;
    created_at:  string;
}

export interface Pagination {
    total:        number;
    per_page:     number;
    current_page: number;
    last_page:    number;
}
