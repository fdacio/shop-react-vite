import { createContext, ReactNode, useEffect, useState } from "react";
import { apiAuthContextData } from "./Auth";
import { apiProductContextData } from "./Product";
import { ApiContextData, EndPoint } from "./types";
import { ApiProduct } from "./Product/types";
import axiosInstance from "./axios";

const ApiContext = createContext<ApiContextData>({} as ApiContextData);

export const ApiProvider = ({ children }: { children?: ReactNode }) => {

    const [products, setProducts] = useState<ApiProduct[]>([]);

    useEffect(() => {
        const loadProducts = async () => {
            const response = await axiosInstance.get(EndPoint.PRODUCT_HOME);
            const _products: ApiProduct[] = response.data.content;
            setProducts(_products);
        }

        loadProducts();

    }, []);

    const contextData: ApiContextData = {
        ApiProductContextData: apiProductContextData,
        ApiAuthContextData: apiAuthContextData,
        products,
        setProducts,
    }


    return (
        <ApiContext.Provider value={contextData}>
            {children}
        </ApiContext.Provider>
    );
};

export default ApiContext;
