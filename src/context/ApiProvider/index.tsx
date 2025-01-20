import { createContext } from "react";
import { ApiContextChildrens, ApiContextData, ApiProduct, ApiSignUp, ApiToken, ApiUser, EndPoint } from "./types";
import { ApiLogin } from "../AuthProvider/types";
import axiosInstance from './axios';

const ApiContext = createContext<ApiContextData>({} as ApiContextData);

export const ApiProvider = ({ children }: ApiContextChildrens) => {

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

    async function RequestProductAllHome(params: string) {
        const response = await axiosInstance.get(EndPoint.PRODUCT_HOME + params);
        const products: ApiProduct[] = response.data.content;
        return products
    }

    async function RequestSignUp(payload: ApiSignUp) {
        const response = await axiosInstance.post(EndPoint.CUSTOMER_SIGUP, payload);
        const signup: ApiSignUp = response.data;
        return signup
    }

    const contextData = {
        RequestLogin,
        RequestUserAuthenticated,
        RequestProductAllHome,
        RequestSignUp
    }

    return (
        <ApiContext.Provider value={contextData}>
            {children}
        </ApiContext.Provider>
    );
};

export default ApiContext;