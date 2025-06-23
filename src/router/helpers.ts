import { useAppStore } from "@/stores/app";
import { type RouteLocationNormalized } from "vue-router";
import type { Route } from "@/interfaces/general.interface";
import { jwtDecode } from 'jwt-decode';
import type { Router } from "vue-router";


export interface Token {
    iss: string;
    iat: number;
    exp: number;
    nbf: number;
    jti: string;
    sub: string;
    prv: string;
}

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

const canNext = async (route: RouteLocationNormalized): Promise<boolean> => {
    const Store = useAppStore()

    if (!route.name) return false
    if (Store.pathRoutes.length === 0) await Store.fetchRoutes()
    if (!Store.userInfo?.nombre) await Store.fetchUserInfo()

    return searchPath(Store.pathRoutes, route)
}

export function setupRouterGuards(router: Router) {
    router.beforeEach(async (to, from) => {
        if (to.meta?.title) {
            document.title = to.meta.title as string
        }

        if (to.meta?.requiresAuth === false) {
            return true
        }

        const token = localStorage.getItem('token')
        const refresh_token = localStorage.getItem('refresh_token')

        if (!token) {
            return { name: 'login' }
        }

        const decoded: Token = jwtDecode(token)
        const now: number = useDayJs().unix()

        if (now > decoded.exp && !refresh_token) {
            return { name: 'login' }
        }

        const authorized = await canNext(to)
        if (authorized) {
            return true
        } else {
            // return { name: 'forbidden' }
            return true
        }
    })
}