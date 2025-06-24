// src/settings.services.ts
import httpClient from "@/services/httpClient";
import type { PaginationParams, GetListLogsResponse, GetListPermissionsResponse } from "./settings.interfaces";

const getListLogs = async (params: PaginationParams) => {
    const resp = await httpClient.get<GetListLogsResponse>('/api/v1/log', { params, disableLoader: true })
    return resp.data
}

const getListPermissions = async (params: PaginationParams) => {
    const resp = await httpClient.get<GetListPermissionsResponse>('/api/v1/permission', { params, disableLoader: true })
    return resp.data
}

export default {
    getListLogs,
    getListPermissions
}