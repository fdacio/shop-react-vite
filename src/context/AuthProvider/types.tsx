import { ApiUser } from "../ApiProvider/types";

export interface AuthContextData {
    SignIn(data: ApiLogin): Promise<void>;
    SignOut: () => void;
    user: ApiUser | null,
    signed: boolean;
}


export interface ApiLogin {
    username: string;
    password: string;
}

export interface AuthError {
    message: string;
    fields: ApiLogin;
}

