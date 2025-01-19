import { useContext } from "react"
import ApiContext from ".";

export const useApi = () => {
    const context = useContext(ApiContext);
    return context;
}

