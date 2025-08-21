// src/settings.services.ts
import httpClient from "@/services/httpClient";
import type { PaginationParams, PaginatedResponse, MessageResponse } from "@/interfaces/general.interface";
import type { DataListPermissions, DataNewPermission } from "../interfaces/permissions.interfaces";

const getListPermissions = async (params: PaginationParams) => {
    const resp = await httpClient.get<PaginatedResponse<DataListPermissions>>('/api/v1/permission', { params, disableLoader: true });
    return resp.data;
};

const postNewPermission = async (params: DataNewPermission) => {
    return await httpClient.post<MessageResponse>('api/v1/permission', params)
}

const putEditPermissionById = async ({ id_permission, params }: { id_permission: string, params: Partial<DataNewPermission> }) => {
    return await httpClient.put<MessageResponse>(`api/v1/permission/${id_permission}`, params)
}

const deletePermissionById = async (id_permission: string) => {
    return await httpClient.delete<MessageResponse>(`api/v1/permission/${id_permission}`)
}

export default {
    getListPermissions,
    postNewPermission,
    deletePermissionById,
    putEditPermissionById
};
