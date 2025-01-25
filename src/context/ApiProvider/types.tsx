import { Dispatch, SetStateAction } from "react";
import { ApiLogin } from "../AuthProvider/types";

export interface ApiContextData {
    RequestLogin(payload: ApiLogin): Promise<ApiToken>;
    RequestUserAuthenticated(): Promise<ApiUser>;
    RequestProductAll(): Promise<ApiPageable<ApiProduct>>;
    RequestProductAllHome(params?: string): Promise<ApiProduct[]>;
    RequestSignUp(payload: ApiSignUp): Promise<ApiSignUp>
    RequestProductPhoto(id: number): any;
    products: ApiProduct[];
    setProducts: Dispatch<SetStateAction<ApiProduct[]>>

}
export enum EndPoint {
    AUTH_LOGIN = "/auth/login",
    AUTH_USER_AUTHENTICATE = "/auth/user/authenticated",
    CUSTOMER_SIGUP = "/customer/user",
    USER = "/auth/user",
    PRODUCT_HOME = "/product/all/home",
    PRODUCT = "/product",
    PRODUCT_PHOTO = "/product/__id__/photo",

}
interface ApiPageableData1 {
    "pageNumber": number,
    "pageSize": number,
    "sort": {
        "empty": boolean,
        "sorted": boolean,
        "unsorted": boolean
    },
    "offset": number,
    "paged": boolean,
    "unpaged": boolean
}

interface ApiPageableData2 {
    "totalPages": number,
    "totalElements": number,
    "last": boolean,
    "size": number,
    "number": number,
    "sort": {
        "empty": boolean,
        "sorted": boolean,
        "unsorted": boolean
    },
    "numberOfElements": number,
    "first": boolean,
    "empty": boolean

}

export interface ApiPageable<T> {
    content: Array<T>,
    pageable: ApiPageableData1,
    data1:ApiPageableData1,
    data2:ApiPageableData2,
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
    foto: string
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


