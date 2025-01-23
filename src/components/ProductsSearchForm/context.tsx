import { createContext, ReactNode, useContext, useState } from "react";

interface ContextData {
    param: string;
    callFunction(termo: string) : string;
}

interface ContextChildrens {
    children?: ReactNode;
}

const SearchProductsContext = createContext<ContextData>({} as ContextData);

const SearchProductsProvider = ({ children }: ContextChildrens) => {

    const [param, setParam] = useState<string>("");

    function callFunction(termo: string) {
        setParam(termo);
        console.log("PARAM: " + param);
        return param;
    }

    return (
        <SearchProductsContext.Provider value={{param, callFunction}}>
            {children}
        </SearchProductsContext.Provider>
    );

    
}
export default SearchProductsProvider;

export const useSearchProducts = () => {
    const context = useContext(SearchProductsContext);
    return context;
}
