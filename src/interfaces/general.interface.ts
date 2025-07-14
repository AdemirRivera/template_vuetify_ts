export interface User {
    name: string;
    roles: string;
    permissions: string[];
}

export interface Route {
    id: number;
    nombre: string;
    uri: string;
    icono: string;
    mostrar: number;
    orden: number | null;
    ruta_padre_id: number | null;
    nombre_uri: string;
    created_at: null;
    updated_at: null;
    childs: Route[];
}

// Estructura de paginación estándar
export interface Pagination {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

// Parámetros estándar para solicitar paginación
export interface PaginationParams {
    page: number;
    per_page: number;
    search?: string | null;
}

// Respuesta genérica paginada
export interface PaginatedResponse<T> {
    data: T[];
    pagination: Pagination;
}