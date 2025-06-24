// src/settings.services.ts
import httpClient from "@/services/httpClient";
import type { GetListLogsParams, GetListLogsResponse } from "./settings.interfaces";

const getListLogs = async (params: GetListLogsParams) => {
    const resp = await httpClient.get<GetListLogsResponse>('/api/v1/log', { params })
    return resp.data
}

export default {
    getListLogs
}