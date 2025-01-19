import { ReactNode } from "react";

export interface AuthContextData {
    SignIn(data: LoginData): Promise<void>;
    SignOut: () => void;
    user: UserApi | null,
    signed: boolean;
}

export interface UserApi {
    nome: string;
    email: string;
    token: string;
    rules: [{id:number,nome:string}];
}

export interface LoginData {
    username: string;
    password: string;
}

export interface AuthContextChildrens {
    children?: ReactNode;
}

export interface AuthError {
    message: string;
    fields: LoginData;
}
