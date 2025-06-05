import { useAppStore } from '../stores/app'

const Store = useAppStore()

import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    AxiosError,
} from "axios";

// --- 1. Tipos específicos para la respuesta de refresh ---
interface RefreshResponse {
    token: string;
    refresh_token: string;
}

// --- 2. Constantes de Endpoints y Mensajes ---
const API_BASE_URL = import.meta.env.VITE_VUE_APP_API_URL || "http://127.0.0.1:8000/";
const REFRESH_ENDPOINT = "/api/v1/refresh";

const ERROR_MESSAGES = {
    noConexion: "No se pudo establecer conexión con el servidor",
    sesionActualizada: "La sesión ha sido actualizada",
    noAutorizado: "No autorizado",
    recursoNoEncontrado: "Recurso no encontrado",
    datosInvalidos: "Datos inválidos",
    demasiadasSolicitudes: "Demasiadas solicitudes",
    errorProcesar: "Su solicitud no ha podido ser procesada, vuelva a intentar. Si el error persiste, intente más tarde.",
};

// --- 3. Funciones utilitarias para acceder a localStorage ---
function getLocalStorageItem(key: string): string | null {
    if (typeof window !== "undefined" && window.localStorage) {
        return window.localStorage.getItem(key);
    }
    return null;
}

function setLocalStorageItem(key: string, value: string): void {
    if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, value);
    }
}

function removeLocalStorageItem(key: string): void {
    if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem(key);
    }
}

// --- 4. Creación de la instancia de Axios con configuración inicial ---
const axiosConfig: AxiosRequestConfig = {
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${getLocalStorageItem("token") || ""}`,
    },
};

const httpClient: AxiosInstance = axios.create(axiosConfig);

// --- 5. Variables para controlar refresco de token ---
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

/**
 * Función que realiza la petición de refresco de token y devuelve una promesa
 * que se resuelve con el nuevo Access Token. Si falla, redirige al login.
 */
async function refreshAccessToken(): Promise<string> {
    const refreshToken = getLocalStorageItem("refresh_token");
    if (!refreshToken) {
        // No existe refresh_token, redirigimos al login inmediatamente
        removeLocalStorageItem("token");
        removeLocalStorageItem("refresh_token");
        useRouter().push("/login");
        return Promise.reject(new Error("No hay refresh token disponible"));
    }

    try {
        const response: AxiosResponse<RefreshResponse> = await httpClient.post(
            REFRESH_ENDPOINT,
            {
                refresh_token: refreshToken,
            }
        );

        // Guardamos los nuevos tokens
        setLocalStorageItem("token", response.data.token);
        setLocalStorageItem("refresh_token", response.data.refresh_token);

        // Actualizamos el header por defecto
        httpClient.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;

        return response.data.token;
    } catch (err) {
        // Si falla el refresco, limpiamos y redirigimos
        removeLocalStorageItem("token");
        removeLocalStorageItem("refresh_token");
        useRouter().push("/login");
        return Promise.reject(err);
    }
}

/**
 * Envuelve la lógica de refresco de token para que múltiples peticiones
 * no lancen varias llamadas simultáneas. Se encadena todo en una única promesa.
 */
function getFreshToken(): Promise<string> {
    if (isRefreshing && refreshPromise) {
        // Si ya hay un refresco en curso, devolvemos la promesa existente
        return refreshPromise;
    }

    isRefreshing = true;
    // Creamos la promesa de refresco y la almacenamos en refreshPromise
    refreshPromise = refreshAccessToken()
        .then((newToken) => {
            isRefreshing = false;
            refreshPromise = null;
            return newToken;
        })
        .catch((error) => {
            isRefreshing = false;
            refreshPromise = null;
            return Promise.reject(error);
        });

    return refreshPromise;
}

// --- 6. Interceptor de peticiones (Request) ---
httpClient.interceptors.request.use(
    (config) => {
        // Mostrar loader si no se desactiva explícitamente
        if (!config.headers?.["disableLoader"]) {
            Store.showLoader = true;
        }

        // VALIDAR FormData: si se envía un FormData, quitamos el Content-Type
        if (config.data instanceof FormData) {
            if (config.headers) {
                delete config.headers["Content-Type"];
            }
        } else {
            if (config.headers) {
                config.headers["Content-Type"] = "application/json";
            }
        }

        // Agregar el token más actual
        const token = getLocalStorageItem("token");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // En caso de error en request, ocultar loader si corresponde
        try {
            Store.showLoader = false;
        } catch (_) {
            // Silencioso si el store no existe aún
        }
        return Promise.reject(error);
    }
);

// --- 7. Interceptor de respuestas (Response) ---
httpClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // Ocultar loader
        try {
            Store.showLoader = false
        } catch (_) {
            // Silencioso
        }
        return response;
    },
    async (error: AxiosError) => {
        // Ocultar loader
        try {
            Store.showLoader = false
        } catch (_) {
            // Silencioso
        }

        // Si no hay conectividad (status 0 o sin respuesta), notificamos
        if (error.request && !error.response) {
            try {
                toast(ERROR_MESSAGES.noConexion, {
                    "theme": "colored",
                    "type": "error",
                    "hideProgressBar": true,
                    "dangerouslyHTMLString": true
                })
            } catch (_) {
                // Silencioso
            }
            return Promise.reject(error);
        }

        // Si hay respuesta del servidor, inspeccionamos el status
        const status = error.response?.status;
        const originalConfig = error.config as AxiosRequestConfig & { _retry?: boolean };

        // 7.1. Token expirado o acceso prohibido (status 403)
        if (status === 403 && !originalConfig._retry) {
            originalConfig._retry = true;

            try {
                // Esperamos a obtener el token fresco (evita múltiples llamadas)
                const newToken = await getFreshToken();

                // Notificamos al usuario
                try {
                    toast(ERROR_MESSAGES.sesionActualizada, {
                        "theme": "colored",
                        "type": "info",
                        "autoClose": 500,
                        "hideProgressBar": true,
                        "dangerouslyHTMLString": true,
                        "transition": "slide"

                    })
                } catch (_) {
                    // Silencioso
                }

                // Reintentamos la petición original con el nuevo token
                if (originalConfig.headers) {
                    originalConfig.headers.Authorization = `Bearer ${newToken}`;
                }
                return httpClient(originalConfig);
            } catch (refreshError) {
                // Si el refresco falla, la redirección ya ocurrió en getFreshToken()
                return Promise.reject(refreshError);
            }
        }

        // 7.2. Errores de API en rango 400–499 (client errors)
        if (status && status >= 400 && status < 500) {
            let userMessage = "";

            // Intentamos extraer mensaje de forma segura
            const data = error.response?.data;
            if (typeof data === "object" && data !== null && "message" in data) {
                userMessage = (data as any).message;
            } else {
                // Fallback según status
                switch (status) {
                    case 401:
                        userMessage = ERROR_MESSAGES.noAutorizado;
                        break;
                    case 404:
                        userMessage = ERROR_MESSAGES.recursoNoEncontrado;
                        break;
                    case 422:
                        userMessage = ERROR_MESSAGES.datosInvalidos;
                        break;
                    case 429:
                        userMessage = ERROR_MESSAGES.demasiadasSolicitudes;
                        break;
                    case 500:
                        userMessage = ERROR_MESSAGES.errorProcesar;
                        break;
                    default:
                        userMessage = `Error desconocido (código ${status})`;
                        break;
                }
            }

            try {
                toast(userMessage, {
                    "theme": "colored",
                    "type": "error",
                    "hideProgressBar": true,
                    "dangerouslyHTMLString": true,
                    "transition": "flip"
                })
            } catch (_) {
                // Silencioso
            }

            return Promise.reject(error);
        }

        // 7.3. Otros errores (por ejemplo, 500 en servidor)
        try {
            toast(ERROR_MESSAGES.errorProcesar, {
                "theme": "colored",
                "type": "error",
                "hideProgressBar": true,
                "dangerouslyHTMLString": true,
                "transition": "flip"
            })
        } catch (_) {
            // Silencioso
        }

        return Promise.reject(error);
    }
);

export default httpClient;