import httpClient from "@/services/httpClient";
import type { LoginParams, LoginResponse } from "./auth.interfaces";

const login = async (params: LoginParams) => {
    return await httpClient.post<LoginResponse>('/api/v1/login', params)
}

export default {
    login
}