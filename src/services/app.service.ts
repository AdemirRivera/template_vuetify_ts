import httpClient from "@/services/httpClient";
import type { User, Route } from "@/interfaces/general.interface";

interface LogoutResp { message: string }

const logout = async () => {
    return await httpClient.post<LogoutResp>('/api/v1/auth/logout')
}

const verify = async () => {
    return await httpClient.get<User>('/api/v1/auth/verify-user')
}

const getAuthorizedPaths = async () => {
    return await httpClient.get<Route[]>('/api/v1/auth/get-rutas')
}

export default {
    logout,
    verify,
    getAuthorizedPaths
}