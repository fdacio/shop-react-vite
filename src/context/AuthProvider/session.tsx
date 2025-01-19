import { UserApi } from "./types";

const keySession = 'shop-user';

export function setSession(user: UserApi | null) {
    localStorage.setItem(keySession, JSON.stringify(user));
}

export function getSession() {
    const json = localStorage.getItem(keySession);
    if (!json) {
        return null;
    }
    const user = JSON.parse(json);
    return user ?? null;
}
