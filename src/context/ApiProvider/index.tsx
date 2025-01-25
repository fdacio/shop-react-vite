import { createContext, ReactNode, useEffect, useState } from "react";
import { apiAuthContextData } from "./Auth";
import { apiProductContextData } from "./Product";
import { ApiContextData, EndPoint } from "./types";
import { ApiProduct } from "./Product/types";
import axiosInstance from "./axios";

const ApiContext = createContext<ApiContextData>({} as ApiContextData);

export const ApiProvider = ({ children }: { children?: ReactNode }) => {

    const [productsHome, setProductsHome] = useState<ApiProduct[]>([]);

    useEffect(() => {
        const loadProducts = async () => {
            const response = await axiosInstance.get(EndPoint.PRODUCT_HOME);
            const _products: ApiProduct[] = response.data.content;
            setProductsHome(_products);
        }

        loadProducts();

    }, []);

    const contextData: ApiContextData = {
        ApiProduct: apiProductContextData,
        ApiAuth: apiAuthContextData,
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
