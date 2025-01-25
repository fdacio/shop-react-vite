import { createContext, ReactNode, useEffect, useState } from "react";
import { ApiLogin } from "../AuthProvider/types";
import axiosInstance from './axios';
import { ApiContextData, ApiPageable, ApiProduct, ApiSignUp, ApiToken, ApiUser, EndPoint } from "./types";

const ApiContext = createContext<ApiContextData>({} as ApiContextData);

export const ApiProvider = ({ children }: { children?: ReactNode }) => {

    const [products, setProducts] = useState<ApiProduct[]>([]);

    async function RequestLogin(payload: ApiLogin) {
        const response = await axiosInstance.post(EndPoint.AUTH_LOGIN, payload);
        const apiToken: ApiToken = response.data;
        return apiToken;
    }

    async function RequestUserAuthenticated() {
        const response = await axiosInstance.post(EndPoint.AUTH_USER_AUTHENTICATE);
        const apiUser: ApiUser = response.data;
        return apiUser;
    }

    //registrar um customer e um user
    async function RequestSignUp(payload: ApiSignUp) {
        const response = await axiosInstance.post(EndPoint.CUSTOMER_SIGUP, payload);
        const signup: ApiSignUp = response.data;
        return signup
    }

    async function RequestProductAllHome(params?: string) {
        const _p = (params != undefined) ? params : "";
        const response = await axiosInstance.get(EndPoint.PRODUCT_HOME + _p);
        const products: ApiProduct[] = response.data.content;
        return products;
    }

    async function RequestProductPhoto(id: number) {
        return (await axiosInstance.get(EndPoint.PRODUCT_PHOTO.replace('__id__', id.toString()), { responseType: 'blob' })).data;
    }

    async function RequestProductAll()  {
        const response = await axiosInstance.get(EndPoint.PRODUCT + '/pageable');
        const data: ApiPageable<ApiProduct> = response.data;
        return data;
    }

    const contextData = {
        RequestLogin,
        RequestUserAuthenticated,
        RequestProductAll,
        RequestProductAllHome,
        RequestSignUp,
        RequestProductPhoto, 
        products,
        setProducts
    }

    useEffect(() => {
        const loadProducts = async () => { 
            const response = await axiosInstance.get(EndPoint.PRODUCT_HOME);
            const _products: ApiProduct[] = response.data.content;
            setProducts(_products);
        }

        loadProducts();

    }, []);

    return (
        <ApiContext.Provider value={contextData}>
            {children}
        </ApiContext.Provider>
    );
};

export default ApiContext;