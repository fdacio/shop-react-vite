import { Dispatch, SetStateAction } from "react";
import { ApiAuthContextData } from "./Auth/types";
import { ApiProduct, ApiProductContextData } from "./Product/types";

export interface ApiContextData {
    products: ApiProduct[];
    setProducts: Dispatch<SetStateAction<ApiProduct[]>>
    ApiProductContextData : ApiProductContextData;
    ApiAuthContextData : ApiAuthContextData;
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

