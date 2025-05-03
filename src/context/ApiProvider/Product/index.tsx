import axiosInstance from "../axios";
import { ApiPageable, EndPoint } from "../types";
import { ApiProduct, ApiProductContextData } from "./types";

async function RequestProductAllHome(params?: string) {
    try {
        const _p = (params != undefined) ? params : "";
        const response = await axiosInstance.get(EndPoint.PRODUCT_HOME + _p);
        const products: ApiProduct[] = response.data.content;
        return products;
    } catch (err) {
        throw err;
    }
}

async function RequestProductPhoto(id: number) {
    return (await axiosInstance.get(EndPoint.PRODUCT_PHOTO.replace('__id__', id.toString()), { responseType: 'blob' })).data;
}

//produtos para o crud
async function RequestProductAll(params?: string ) {
    const response = await axiosInstance.get(EndPoint.PRODUCT + '/pageable' + (params ? params : ""));
    const data: ApiPageable<ApiProduct> = response.data;
    return data;
}

export const apiProductContextData: ApiProductContextData = {
    RequestProductAll,
    RequestProductAllHome,
    RequestProductPhoto
}


