import { ReactNode } from "react";
import { LoginPayload } from "../AuthProvider/types";

export interface ApiContextData {
    RequestLogin(payload: LoginPayload) : Promise<ApiToken>;
    RequestUserAuthenticated() : Promise<ApiUser>;
    RequestProductAllHome(params: string) : Promise<ApiProduct[]>;
}

export interface ApiContextChildrens {
    children?: ReactNode;
}

export enum EndPoint {
    AUTH_LOGIN = "/auth/login",
    AUTH_USER_AUTHENTICATE = "/auth/user/authenticated",
    PRODUCT_HOME = "/product/all/home",
    PRODUCT = "/product",
    USER = "/auth/user"
} 

export interface ApiToken {
    token? : string;
    expired? : number;
}

export interface ApiUser {
    id?: number
    nome?: string;
    email?: string;
    token?: string;
    rules?: [{id:number,nome:string}];
}

export interface ApiCategory {
    id?: number,
    nome?: string;
}

export interface ApiProduct {
    id: number,
    nome: string,
    descricao: string,
    identifier: string,
    preco: number;
    category: ApiCategory,
    foto:string
}
