// src/settings.services.ts
import httpClient from "@/services/httpClient";
import type { PaginationParams, PaginatedResponse, MessageResponse } from "@/interfaces/general.interface";
import type { DataLogs, DataRoles, DataUsers } from "../interfaces/settings.interfaces";

const getListLogs = async (params: PaginationParams) => {
    const resp = await httpClient.get<PaginatedResponse<DataLogs>>('/api/v1/log', { params, disableLoader: true });
    return resp.data;
};

const getListRoles = async (params: PaginationParams) => {
    const resp = await httpClient.get<PaginatedResponse<DataRoles>>('/api/v1/role', { params, disableLoader: true });
    return resp.data;
};

const patchRoleById = async (id_role: string) => {
    return await httpClient.patch<MessageResponse>(`api/v1/role/${id_role}/activate-desactivate`)
}

const getlistUsers = async (params: PaginationParams) => {
    const resp = await httpClient.get<PaginatedResponse<DataUsers>>('/api/v1/user', { params, disableLoader: true });
    return resp.data;
};

export default {
    getListLogs,
    getListRoles,
    getlistUsers,
    patchRoleById
};
