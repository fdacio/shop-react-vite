import { createContext } from "react";
import { ApiContextChildrens, ApiContextData, ApiProduct, ApiToken, ApiUser, EndPoint } from "./types";
import { LoginPayload } from "../AuthProvider/types";
import api from '../../services/api';

const ApiContext = createContext<ApiContextData>({} as ApiContextData);

export const ApiProvider = ({ children }: ApiContextChildrens) => {

    async function RequestLogin(payload: LoginPayload){
        const apiToken: ApiToken = await api.post(EndPoint.AUTH_LOGIN, payload);
        return apiToken;
    }

    async function RequestUserAuthenticated() {
        const apiUser: ApiUser = await api.post(EndPoint.AUTH_USER_AUTHENTICATE);
        return apiUser;
    }

    async function RequestProductAllHome(params: string) {
        const response = await api.get(EndPoint.PRODUCT_HOME + params);
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