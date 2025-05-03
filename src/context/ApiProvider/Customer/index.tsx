import axiosInstance from "../axios";
import { ApiPageable, EndPoint } from "../types";
import { ApiCustomer, ApiCustomerContextData } from "./types";

//produtos para o crud
async function RequestCustomerAll(params?: string ) {
    const response = await axiosInstance.get(EndPoint.CUSTOMER + '/pageable' + (params ? params : ""));
    const data: ApiPageable<ApiCustomer> = response.data;
    return data;
}

export const apiCustomerContextData: ApiCustomerContextData = {
    RequestCustomerAll
}

