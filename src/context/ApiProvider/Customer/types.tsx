import { ApiCategory } from "../Product/types";



export interface ApiCustomer {
    nome: string;
    cpf: string;
    endereco: string;
    email: string;
    telefone: string;
    interesses?: ApiCategory[];
}
