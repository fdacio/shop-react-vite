
import axios from 'axios';
import { ApiUser } from './types';
import { getSession } from '../AuthProvider/session';

const axiosInstance = axios.create({
    baseURL: 'http://138.197.210.74:8880', //Pegar .env
});


axiosInstance.interceptors.request.use(
    
    (config) => {

        const apiUser: ApiUser = getSession();
        
        if (apiUser) {
            const token = apiUser.token;
            config.headers['Authorization'] = 'Bearer ' + token
        }

        config.headers['Content-Type'] = 'application/json';
        return config;

    },

    (error) => {
        Promise.reject(error)
    }
)

export default axiosInstance;