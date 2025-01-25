import { ApiLogin } from "../../AuthProvider/types";
import { ApiCustomer } from "../Customer/types";

export interface ApiAuthContextData {
    RequestLogin(payload: ApiLogin): Promise<ApiToken>;
    RequestUserAuthenticated(): Promise<ApiUser>;
    RequestSignUp(payload: ApiSignUp): Promise<ApiSignUp>
}


export interface ApiToken {
    token?: string;
    expired?: number;
}

export interface ApiRule {
    id?: number,
    nome?: string;
}
export interface ApiUser {
    id?: number;
    nome?: string;
    email?: string;
    token?: string;
    rules?: ApiRule[];
}

export interface ApiPassword {
    password: string;
    rePassword: string;
}

export interface ApiCustomerSignUp {
    'customer.nome': string;
    'customer.cpf': string;
    'customer.endereco': string;
    'customer.email': string;
    'customer.telefone': string;
    'password.password': string;
    'password.rePassword': string;
}

export interface ApiSignUp {
    customer: ApiCustomer;
    password: ApiPassword;
}

export interface SignUpError {
    message: string;
    fields: {
        customer: ApiCustomer,
        password: ApiPassword
    };
}
