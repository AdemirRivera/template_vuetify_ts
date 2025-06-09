import httpClient from "@/services/httpClient";
import type { LoginParams, LoginResponse } from "./auth.interfaces";

const login = async (params: LoginParams): Promise<LoginResponse> => {
    const resp = await httpClient.post<LoginResponse>('/api/v1/login', params)
    return resp.data
}

export default {
    login
}