import { Dispatch, SetStateAction } from "react";

export interface AppContextData {
    message: string;
    setMessage: Dispatch<SetStateAction<string>>;
}
