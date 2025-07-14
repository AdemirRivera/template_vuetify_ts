// src/settings.services.ts
import httpClient from "@/services/httpClient";
import type { PaginationParams, PaginatedResponse } from "@/interfaces/general.interface";
import type { DataPermissions } from "../interfaces/permissions.interfaces";

const getListPermissions = async (params: PaginationParams) => {
    const resp = await httpClient.get<PaginatedResponse<DataPermissions>>('/api/v1/permission', { params, disableLoader: true });
    return resp.data;
};

export default {
    getListPermissions,
};
