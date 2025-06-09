export interface User {
    id: number;
    es_empresa: number;
    email: string;
    email_verified_at: null;
    is_active: number;
    created_at: Date;
    updated_at: Date;
    roles: Role[];
    perfil: Perfil;
}

export interface Perfil {
    id: number;
    primer_nombre: string;
    segundo_nombre: string;
    tercer_nombre: null;
    primer_apellido: string;
    segundo_apellido: string;
    tercer_apellido: null;
    direccion: string;
    numero_contacto: string;
    url_archivo_poder: string;
    created_at: Date;
    updated_at: Date;
}

export interface Role {
    id: number;
    estado: number;
    nombre: string;
    created_at: Date;
    updated_at: Date;
}

export interface Route {
    id: number;
    nombre: string;
    mostrar: boolean;
    uri: string;
    orden: number;
    ruta_padre_id: null;
    nombreUri: Date;
    updated_at: Date;
    childs?: Route[];
}