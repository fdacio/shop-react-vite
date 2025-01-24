import { useContext } from "react"
import AppContext from "."

export const useAppShop = () => {
    const context = useContext(AppContext);
    return context;
}
