export interface User {
    nombre:   string;
    rol:      string;
    permisos: string[];
    temp_pwd: boolean;
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