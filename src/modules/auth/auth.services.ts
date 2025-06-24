// src/auth.services.ts
import httpClient from "@/services/httpClient";
import type { LoginParams, LoginResponse } from "./auth.interfaces";

const LOGIN_SLOW_THRESHOLD = 3500;

const login = async (params: LoginParams): Promise<LoginResponse> => {
    const nav = (navigator as any).connection;
    const effectiveType: string | undefined = nav?.effectiveType;
    const start = performance.now();

    const response = await httpClient.post<LoginResponse>("/api/v1/auth/login", params, { disableLoader: true }); // API

    const duration = performance.now() - start;
    const isBadNetwork =
        effectiveType !== undefined && ["2g", "slow-2g", "3g"].includes(effectiveType);
    const isSlowRequest = duration > LOGIN_SLOW_THRESHOLD;

    if (isBadNetwork || isSlowRequest) {
        let message: string = ''
        if (isSlowRequest) {
            message = 'Las peticiones al servidor están tardando más de lo esperado';
        }
        if (isBadNetwork) {
            message = 'Tu conexión a Internet es lenta o inestable';
        }

        useNotification(message, {
            theme: 'colored',
            type: 'warning',
            autoClose: 8000,
            hideProgressBar: true,
            dangerouslyHTMLString: true,
            transition: 'slide'
        })
    }

    return response.data;
};

export default {
    login,
};
