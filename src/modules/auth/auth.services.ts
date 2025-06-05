import httpClient from "@/services/httpClient";

const login = async (params = {}) => {
    return await httpClient.post('/api/v1/login', params)
}

export default {
    login
}