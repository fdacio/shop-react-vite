import { Dispatch, ReactNode, SetStateAction } from "react";

export interface AppContextData {
    functionSearch: (param: string) => void;
    setFunctionSearch: Dispatch<SetStateAction<() => void>>;
    
}
export interface AppContextChildrens {
    children?: ReactNode;
}
