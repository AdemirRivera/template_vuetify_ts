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

export default {
    getListPermissions,
    postNewPermission
};
