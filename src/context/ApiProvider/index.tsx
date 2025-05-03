import { createContext, ReactNode, useEffect, useState } from "react";
import { apiAuthContextData } from "./Auth";
import { apiProductContextData } from "./Product";
import { ApiContextData, EndPoint } from "./types";
import { ApiProduct } from "./Product/types";
import axiosInstance from "./axios";
import { useAppShop } from "../AppProvider/useAppShop";
import { apiCustomerContextData } from "./Customer";

const ApiContext = createContext<ApiContextData>({} as ApiContextData);

export const ApiProvider = ({ children }: { children?: ReactNode }) => {

    const app = useAppShop();
    const [productsHome, setProductsHome] = useState<ApiProduct[]>([]);


    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await axiosInstance.get(EndPoint.PRODUCT_HOME);
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
