import { ApiUser } from "../ApiProvider/Auth/types";

const tokenSession = 'shop-token';
const tokenRefreshSession = 'shop-token-refresh';
const userSession = 'shop-user';

export function setUserSession(user: ApiUser | null) {
    localStorage.setItem(userSession, JSON.stringify(user));
}
export function getUserSession() {
    const json = localStorage.getItem(userSession);
    if (!json) {
        return null;
    }
    const user = JSON.parse(json);
    return user ?? null;
}
export function setTokenSession(token: string) {
    localStorage.setItem(tokenSession, token);
}
export function getTokenSession() { 
    const token = localStorage.getItem(tokenSession);
    return token ?? null;
}
export function setTokenRefreshSession(token: string) {
    localStorage.setItem(tokenRefreshSession, token);
}
export function getTokenRefreshSession() { 
    const refreshToken = localStorage.getItem(tokenSession);
    return refreshToken ?? null;
}
export function clearSession() {
    localStorage.removeItem(tokenSession);
    localStorage.removeItem(userSession);
}
