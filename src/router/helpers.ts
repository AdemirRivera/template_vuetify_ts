import { useAppStore } from "@/stores/app";
import { type RouteLocationNormalized } from "vue-router";
import type { Route } from "@/interfaces/general.interface";

const pathToRegex = (path: string): RegExp =>
    new RegExp(`^${path.replace(/:\w+/g, "(\\d+)")}$`);

const comparePaths = (uri: string, path: string): boolean => {
    const regex = pathToRegex(uri);
    return regex.test(path);
};

const searchPath = (storePaths: Route[], route: RouteLocationNormalized): boolean => {
    return storePaths.some((item: Route) => {
        if (item.childs) {
            if (item.childs?.length > 0)
                return searchPath(item.childs, route);
        }
        return comparePaths(item.uri.toLowerCase(), route.path.toLowerCase());
    })
}

export default async (route: RouteLocationNormalized): Promise<boolean> => {
    const Store = useAppStore()

    if (!route.name) return false
    if (Store.pathRoutes.length === 0) await Store.fetchRoutes()
    if (!Store.userInfo?.nombre) await Store.fetchUserInfo()

    return searchPath(Store.pathRoutes, route)
}