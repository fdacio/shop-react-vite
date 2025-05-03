import { createContext, ReactNode, useEffect, useState } from "react";
import { useAppShop } from "../AppProvider/useAppShop";
import { apiAuthContextData } from "./Auth";
import { apiCustomerContextData } from "./Customer";
import { apiProductContextData } from "./Product";
import { apiUserContextData } from "./User";
import { ApiProduct } from "./Product/types";
import axiosInstance from "./axios";
import { ApiContextData, EndPoint } from "./types";

const ApiContext = createContext<ApiContextData>({} as ApiContextData);

export const ApiProvider = ({ children }: { children?: ReactNode }) => {

    const app = useAppShop();
    const [productsHome, setProductsHome] = useState<ApiProduct[]>([]);


    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await axiosInstance.get(EndPoint.PRODUCT_HOME + "?sort=nome,asc");
                const products: ApiProduct[] = response.data.content;
                setProductsHome(products);
            } catch (err: any) {
                app.setMessage(err.message);
            }
        }

        loadProducts();

    }, []);

    const contextData: ApiContextData = {
        ApiProduct: apiProductContextData,
        ApiAuth: apiAuthContextData,
        ApiCustomer: apiCustomerContextData,
        ApiUserCrud: apiUserContextData,
        productsHome: productsHome,
        setProductsHome: setProductsHome,
    }


    return (
        <ApiContext.Provider value={contextData}>
            {children}
        </ApiContext.Provider>
    );
};

export default ApiContext;
