import { ApiLogin } from "../../AuthProvider/types";
import axiosInstance from "../axios";
import { EndPoint } from "../types";
import { ApiAuthContextData, ApiSignUp, ApiToken, ApiUser } from "./types";

async function RequestLogin(payload: ApiLogin) {
    const response = await axiosInstance.post(EndPoint.AUTH_LOGIN, payload);
    const apiToken: ApiToken = response.data;
    return apiToken;
}

async function RequestUserAuthenticated() {
    const response = await axiosInstance.post(EndPoint.AUTH_USER_AUTHENTICATE);
    const apiUser: ApiUser = response.data;
    return apiUser;
}

//registrar um customer e um user
async function RequestSignUp(payload: ApiSignUp) {
    const response = await axiosInstance.post(EndPoint.CUSTOMER_SIGUP, payload);
    const signup: ApiSignUp = response.data;
    return signup
}

export const apiAuthContextData: ApiAuthContextData = {
    RequestLogin,
    RequestUserAuthenticated,
    RequestSignUp,
}





