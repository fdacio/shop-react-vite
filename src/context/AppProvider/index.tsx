import { createContext, ReactNode, useState } from "react";
import { AppContextData } from "./types";

const AppContext = createContext<AppContextData>({} as AppContextData);

export const AppProvider = ({ children }: { children?: ReactNode }) => {

    const [message, setMessage] = useState<string>("");

 
    return (
        <AppContext.Provider value={{ message, setMessage }}>
            {message}
            {children}
        </AppContext.Provider>
    );

}

export default AppContext;