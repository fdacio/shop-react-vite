import { ApiPageable } from "../types";

export interface ApiUserContextData {
    RequestUserAll(): Promise<ApiPageable<ApiUserCrud>>;
}

export interface ApiUserCrud {
    id: number,
    nome: string,
    email: string,
}