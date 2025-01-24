import { createContext, ReactNode, useCallback, useState } from "react";
import { AppContextData } from "./types";

const AppContext = createContext<AppContextData>({} as AppContextData);

export const AppProvider = ({ children }: { children?: ReactNode }) => {

    const [functionSearch, setFunctionSearch] = useState<() => void>(() => { });

    useCallback(() => { setFunctionSearch(functionSearch) }, [functionSearch]);

    return (
        <AppContext.Provider value={{ functionSearch, setFunctionSearch }}>
            {children}
        </AppContext.Provider>
    );

}

export default AppContext;