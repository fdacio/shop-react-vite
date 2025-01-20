import { createContext } from "react";
import { ApiContextChildrens, ApiContextData, ApiProduct, ApiToken, ApiUser, EndPoint } from "./types";
import { LoginPayload } from "../AuthProvider/types";
import axiosInstance from './axios';

const ApiContext = createContext<ApiContextData>({} as ApiContextData);

export const ApiProvider = ({ children }: ApiContextChildrens) => {

    async function RequestLogin(payload: LoginPayload){
        const response = await axiosInstance.post(EndPoint.AUTH_LOGIN, payload);
        const apiToken : ApiToken = response.data;
        return apiToken;
    }

    async function RequestUserAuthenticated() {
        const response = await axiosInstance.post(EndPoint.AUTH_USER_AUTHENTICATE);
        const apiUser : ApiUser = response.data;
        return apiUser;
    }

    async function RequestProductAllHome(params: string) {
        const response = await axiosInstance.get(EndPoint.PRODUCT_HOME + params);
        const products : ApiProduct[] = response.data.content;
        return products
    }

    const contextData = { 
        RequestLogin, 
        RequestUserAuthenticated, 
        RequestProductAllHome 
    }

    return (
        <ApiContext.Provider value={contextData}>
            {children}
        </ApiContext.Provider>
    );
};

export default ApiContext;