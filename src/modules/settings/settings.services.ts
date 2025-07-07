// src/settings.services.ts
import httpClient from "@/services/httpClient";
import type { DataLogs, DataPermissions } from "./settings.interfaces";
import type { PaginationParams, PaginatedResponse } from "@/interfaces/general.interface";

const getListLogs = async (params: PaginationParams) => {
    const resp = await httpClient.get<PaginatedResponse<DataLogs>>('/api/v1/log', { params, disableLoader: true });
    return resp.data;
};

const getListPermissions = async (params: PaginationParams) => {
    const resp = await httpClient.get<PaginatedResponse<DataPermissions>>('/api/v1/permission', { params, disableLoader: true });
    return resp.data;
};

export default {
    getListLogs,
    getListPermissions
};
