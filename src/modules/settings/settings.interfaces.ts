export interface DataLogs {
    id: string;
    description: string;
    message: string;
    error_code: number;
    uri: string;
    created_at: string;
}

export interface DataPermissions {
    description: string,
    id: string,
    name: string,
    tag: string
}

export interface DataRoles {
    id: string,
    name: string,
    activo: string,
    created_at: string,
    permissions: string
}
