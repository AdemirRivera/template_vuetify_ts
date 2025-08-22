// src/settings.services.ts
import httpClient from "@/services/httpClient";
import type { PaginationParams, PaginatedResponse, MessageResponse } from "@/interfaces/general.interface";
import type { DataLogs, DataRoles, DataUsers, DataRoleById } from "../interfaces/settings.interfaces";

const getListLogs = async (params: PaginationParams) => {
    const resp = await httpClient.get<PaginatedResponse<DataLogs>>('/api/v1/log', { params, disableLoader: true });
    return resp.data;
};

const getListRoles = async (params: PaginationParams) => {
    const resp = await httpClient.get<PaginatedResponse<DataRoles>>('/api/v1/role', { params, disableLoader: true });
    return resp.data;
};

const getRoleById = async (id_role: string) => {
    const resp = await httpClient.get<DataRoleById>(`/api/v1/role/${id_role}`)
    return resp.data
}

const patchRoleById = async (id_role: string) => {
    return await httpClient.patch<MessageResponse>(`api/v1/role/${id_role}/activate-desactivate`)
}

const getListUsers = async (params: PaginationParams) => {
    const resp = await httpClient.get<PaginatedResponse<DataUsers>>('/api/v1/user', { params, disableLoader: true });
    return resp.data;
};

export default {
    getListLogs,
    getListRoles,
    getListUsers,
    patchRoleById,
    getRoleById
};
