import { Dispatch, ReactNode, SetStateAction } from "react";

export interface AppContextData {
    functionSearch: () => void;
    setFunctionSearch: Dispatch<SetStateAction<() => void>>;
    
}
export interface AppContextChildrens {
    children?: ReactNode;
}
