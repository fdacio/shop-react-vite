import { ApiCategory } from "../Product/types";
import { ApiPageable } from "../types";

export interface ApiCustomerContextData {
    RequestCustomerAll(): Promise<ApiPageable<ApiCustomer>>;
}
export interface ApiCustomer {
    id: number;
    nome: string;
    cpf: string;
    endereco: string;
    email: string;
    telefone: string;
    interesses?: ApiCategory[];
}
