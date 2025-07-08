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
    id: string;
    name: string;
    activo: boolean;
    created_at: Date;
}

export interface DataUsers {
    id: string;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    active: boolean;
    is_two_factor: boolean;
    code_two_factor: null;
    expires_at_code_two_factor: null;
    created_at_code_two_factor: null;
    google_secret_key_2fa: null;
}
