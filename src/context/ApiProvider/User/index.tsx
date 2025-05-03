
import axiosInstance from "../axios";
import { ApiPageable, EndPoint } from "../types";
import { ApiUserContextData, ApiUserCrud } from "./types";

//produtos para o crud
async function RequestUserAll(params?: string ) {
    const response = await axiosInstance.get(EndPoint.USER + "/pageable" + (params ? params : ""));
    const data: ApiPageable<ApiUserCrud> = response.data;
    return data;
}

export const apiUserContextData: ApiUserContextData = {
    RequestUserAll
}

