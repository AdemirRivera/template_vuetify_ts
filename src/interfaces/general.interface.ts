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
    nombreUri: string;
    created_at: null;
    updated_at: null;
    childs: Route[];
}