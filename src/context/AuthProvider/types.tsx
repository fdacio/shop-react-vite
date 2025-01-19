import { ReactNode } from "react";
import { ApiUser } from "../ApiProvider/types";

export interface AuthContextData {
    SignIn(data: LoginPayload): Promise<void>;
    SignOut: () => void;
    user: ApiUser | null,
    signed: boolean;
}


export interface LoginPayload {
    username: string;
    password: string;
}

export interface AuthContextChildrens {
    children?: ReactNode;
}

export interface AuthError {
    message: string;
    fields: LoginPayload;
}
