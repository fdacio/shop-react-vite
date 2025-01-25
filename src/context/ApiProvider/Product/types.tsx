import { ApiPageable } from "../types";

export interface ApiProductContextData {
    RequestProductAll(): Promise<ApiPageable<ApiProduct>>;
    RequestProductAllHome(params?: string): Promise<ApiProduct[]>;
    RequestProductPhoto(id: number): any;

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