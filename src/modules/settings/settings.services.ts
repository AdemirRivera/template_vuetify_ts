// src/settings.services.ts
import httpClient from "@/services/httpClient";
import type { PaginationParams, PaginatedResponse } from "@/interfaces/general.interface";
import type { DataLogs, DataPermissions, DataRoles } from "./settings.interfaces";

const getListLogs = async (params: PaginationParams) => {
    const resp = await httpClient.get<PaginatedResponse<DataLogs>>('/api/v1/log', { params, disableLoader: true });
    return resp.data;
};

const getListPermissions = async (params: PaginationParams) => {
    const resp = await httpClient.get<PaginatedResponse<DataPermissions>>('/api/v1/permission', { params, disableLoader: true });
    return resp.data;
};

const getListRoles = async (params: PaginationParams) => {
    const resp = await httpClient.get<PaginatedResponse<DataRoles>>('/api/v1/role', { params, disableLoader: true });
    return resp.data;
};

export default {
    getListLogs,
    getListPermissions,
    getListRoles
};
