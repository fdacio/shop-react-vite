import { ReactNode } from "react";
import { ApiLogin } from "../AuthProvider/types";

export interface ApiContextData {
    RequestLogin(payload: ApiLogin) : Promise<ApiToken>;
    RequestUserAuthenticated() : Promise<ApiUser>;
    RequestProductAllHome(params: string | "") : Promise<ApiProduct[]>;
    RequestSignUp(payload: ApiSignUp) : Promise<ApiSignUp>
    
}

export interface ApiContextChildrens {
    children?: ReactNode;
}

export enum EndPoint {
    AUTH_LOGIN = "/auth/login",
    AUTH_USER_AUTHENTICATE = "/auth/user/authenticated",
    CUSTOMER_SIGUP = "/customer/user",
    USER = "/auth/user",
    PRODUCT_HOME = "/product/all/home",
    PRODUCT = "/product",
} 

export interface ApiToken {
    token? : string;
    expired? : number;
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

export interface ApiCustomer {
    nome: string;
    cpf: string;
    endereco: string;
    email: string;
    telefone: string;
    interesses?: ApiCategory[];
}


export interface ApiPassword {
    password: string;
    rePassword: string;
}

export interface ApiCustomerSignUp {
    'customer_nome': string;
    'customer_cpf': string;
    'customer_endereco': string;
    'customer_email': string;
    'customer_telefone': string;
    'password_password': string;
    'password_rePassword': string;
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

    /*
    {
    "customer": {
        "nome": "Benjamin Alvarenga Moreira",
        "cpf": "52925773400",
        "endereco": "Rua Maria de Lourdes de Andrade Barbosa, 258 - Joaão Pessoa - PB",
        "email": "benjamin.moreira@geradornv.com.br",
        "telefone": "(83) 99805-5536",
        "interesses": [
            {"id" : 1}, {"id" : 3}

        ]
    },
    "password": {
        "password": "ben123",
        "rePassword": "ben123"
    }
}
    /*/
