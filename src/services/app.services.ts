import httpClient from "@/services/httpClient";

const logout = async () => {
    return await httpClient.post('/api/v1/logout')
}

const verify = async () => {
    return await httpClient.get('/api/v1/verify-user')
}

const getAuthorizedPaths = async () => {
    return await httpClient.get('/api/v1/get-rutas')
}

export default {
    logout,
    verify,
    getAuthorizedPaths
}